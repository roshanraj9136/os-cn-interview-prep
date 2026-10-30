# OS + CN Interview Prep (Hinglish)

**Live site: https://os-cn-interview-prep.vercel.app**

Operating System aur Computer Networks ki interview preparation, simple Hinglish mein, 12-15 LPA wali placements ke liye.

- 18 topic pages (9 OS + 9 CN), har page par simple explanation, diagrams, comparison tables, "Interview mein aise bolo" English answers, follow-up questions aur ek quiz
- OS aur CN dono ke Top 60 interview questions
- 140 MCQs (har topic par 5, aur dono subjects ka 25-question mock test)
- 7 din ka study plan (progress browser mein save hota hai)
- 2025-26 placement data se 12-15 LPA companies, sources ke saath
- Last-day revision cheat sheet

Built with [VitePress](https://vitepress.dev).

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run check     # content checks: Vue-breaking syntax, dead links, quiz JSON
npm run build     # static site in docs/.vitepress/dist
npm run preview   # serve the built site
```

## Structure

```text
docs/
  index.md, start-here.md, study-plan.md, companies.md, revision.md
  os/   topic pages, top-questions.md, quiz.md
  cn/   topic pages, top-questions.md, quiz.md
  .vitepress/
    config.mts            nav, sidebar, local search
    quizzes/<id>.json     quiz data
    theme/components/     Quiz.vue, Checklist.vue
scripts/check-content.mjs
```

## Adding a quiz

Create `docs/.vitepress/quizzes/<id>.json`:

```json
[
  {
    "q": "Question text",
    "options": ["A", "B", "C", "D"],
    "answer": 1,
    "explain": "Sahi answer kyun sahi hai"
  }
]
```

`answer` is the 0-based index of the correct option. Then put `<Quiz id="<id>" title="..." />` on any page and run `npm run check`.

## Deploy

Vercel builds it with `npm run build` and serves `docs/.vitepress/dist` (see `vercel.json`).
