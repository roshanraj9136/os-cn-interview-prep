// Quick content checks that catch the usual VitePress/Vue breakages before a full build.
// Usage: npm run check            (check everything)
//        npm run check -- docs/os/basics.md docs/.vitepress/quizzes/os-basics.json
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const docs = join(root, 'docs')
const quizDir = join(docs, '.vitepress', 'quizzes')

const problems = []
const report = (file, line, msg) => problems.push(`${relative(root, file)}:${line}  ${msg}`)

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.vitepress' || name === 'public' || name === 'node_modules') continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (name.endsWith('.md')) out.push(p)
  }
  return out
}

const allPages = walk(docs)
const quizFiles = existsSync(quizDir)
  ? readdirSync(quizDir).filter((f) => f.endsWith('.json')).map((f) => join(quizDir, f))
  : []

const only = process.argv.slice(2).map((a) => resolve(root, a))
const pages = only.length ? allPages.filter((p) => only.includes(p)) : allPages
const quizzes = only.length ? quizFiles.filter((p) => only.includes(p)) : quizFiles

const allowedTags = new Set([
  'Quiz', 'Checklist', 'Badge',
  'a', 'b', 'blockquote', 'br', 'code', 'del', 'details', 'div', 'em', 'hr', 'i', 'img',
  'kbd', 'li', 'mark', 'ol', 'p', 'pre', 's', 'small', 'span', 'strong', 'sub', 'summary',
  'sup', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'u', 'ul',
])

function routeExists(link, fromFile) {
  let target = link.split('#')[0].split('?')[0]
  if (!target) return true // same-page anchor
  if (!target.startsWith('/')) {
    target = '/' + relative(docs, resolve(dirname(fromFile), target)).replace(/\\/g, '/')
  }
  target = target.replace(/\.(md|html)$/, '')
  const base = join(docs, ...target.split('/').filter(Boolean))
  if (target.endsWith('/')) return existsSync(join(base, 'index.md'))
  return existsSync(base + '.md') || existsSync(join(base, 'index.md'))
}

const referencedQuizzes = new Set()

for (const file of allPages) {
  const text = readFileSync(file, 'utf8')
  for (const m of text.matchAll(/<Quiz\b[^>]*\bid="([^"]+)"/g)) referencedQuizzes.add(m[1])
}

for (const file of pages) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  let i = 0
  let isHome = false
  if (lines[0] === '---') {
    i = 1
    while (i < lines.length && lines[i] !== '---') {
      if (/^layout:\s*home/.test(lines[i])) isHome = true
      i++
    }
    i++
  }

  let fence = null
  let h1 = 0
  const stack = []

  for (; i < lines.length; i++) {
    const raw = lines[i]
    const n = i + 1
    const fenceMatch = raw.match(/^\s*(`{3,}|~{3,})/)
    if (fence) {
      if (fenceMatch && fenceMatch[1][0] === fence[0] && fenceMatch[1].length >= fence.length) fence = null
      continue
    }
    if (fenceMatch) {
      fence = fenceMatch[1]
      continue
    }

    const line = raw.replace(/``[^`]*``|`[^`]*`/g, '``')

    if (/^#\s/.test(line)) h1++

    if (line.includes('{{') || line.includes('}}')) {
      report(file, n, 'Vue interpolation {{ }} outside code. Put it inside backticks.')
    }

    for (const m of line.matchAll(/<\/?([A-Za-z][A-Za-z0-9-]*)(?:\s[^<>]*)?\/?>/g)) {
      if (!allowedTags.has(m[1])) {
        report(file, n, `Tag <${m[1]}> will break the Vue build. Wrap it in backticks.`)
      }
    }

    const open = line.match(/^\s*(:{3,})\s*([A-Za-z-]+)/)
    const close = line.match(/^\s*(:{3,})\s*$/)
    if (open) stack.push({ colons: open[1].length, line: n })
    else if (close) {
      const top = stack.pop()
      if (!top) report(file, n, 'Extra ":::" with no open container.')
      else if (top.colons !== close[1].length) {
        report(file, n, `Container opened with ${top.colons} colons at line ${top.line} is closed with ${close[1].length}.`)
      }
    }

    for (const m of line.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const link = m[1]
      if (/^(https?:|mailto:|#)/.test(link)) continue
      if (!routeExists(link, file)) report(file, n, `Dead internal link: ${link}`)
    }

    for (const m of line.matchAll(/<Quiz\b[^>]*\bid="([^"]+)"/g)) {
      if (!existsSync(join(quizDir, `${m[1]}.json`))) {
        report(file, n, `Quiz id "${m[1]}" has no file docs/.vitepress/quizzes/${m[1]}.json`)
      }
    }
  }

  if (fence) report(file, lines.length, 'Code fence never closed.')
  for (const s of stack) report(file, s.line, 'Container ":::" opened here is never closed.')
  if (!isHome && h1 !== 1) report(file, 1, `Expected exactly one "# " heading, found ${h1}.`)
}

let questionCount = 0
for (const file of quizzes) {
  let data
  try {
    data = JSON.parse(readFileSync(file, 'utf8'))
  } catch (e) {
    report(file, 1, `Invalid JSON: ${e.message}`)
    continue
  }
  if (!Array.isArray(data) || data.length === 0) {
    report(file, 1, 'Quiz must be a non-empty JSON array.')
    continue
  }
  data.forEach((q, idx) => {
    const where = `question ${idx + 1}`
    if (typeof q.q !== 'string' || !q.q.trim()) report(file, 1, `${where}: "q" must be a non-empty string.`)
    if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 6) {
      report(file, 1, `${where}: "options" must be an array of 2-6 strings.`)
    } else {
      if (q.options.some((o) => typeof o !== 'string' || !o.trim())) report(file, 1, `${where}: empty option.`)
      if (new Set(q.options).size !== q.options.length) report(file, 1, `${where}: duplicate options.`)
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
        report(file, 1, `${where}: "answer" must be a 0-based index into options.`)
      }
    }
    if (typeof q.explain !== 'string' || !q.explain.trim()) report(file, 1, `${where}: "explain" is missing.`)
    const extra = Object.keys(q).filter((k) => !['q', 'options', 'answer', 'explain'].includes(k))
    if (extra.length) report(file, 1, `${where}: unknown keys ${extra.join(', ')}`)
  })
  questionCount += data.length
  const id = file.split(/[\\/]/).pop().replace(/\.json$/, '')
  if (!only.length && !referencedQuizzes.has(id)) report(file, 1, `Quiz "${id}" is not used by any page.`)
}

if (problems.length) {
  console.log(problems.join('\n'))
  console.log(`\n${problems.length} problem(s) found in ${pages.length} page(s) and ${quizzes.length} quiz file(s).`)
  process.exit(1)
}
console.log(`OK: ${pages.length} page(s) and ${quizzes.length} quiz file(s) (${questionCount} questions) passed.`)
