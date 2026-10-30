<script setup lang="ts">
import { computed, reactive } from 'vue'

interface Question {
  q: string
  options: string[]
  answer: number
  explain?: string
}

const props = defineProps<{ id: string; title?: string }>()

// Every quiz lives in docs/.vitepress/quizzes/<id>.json
const files = import.meta.glob<Question[]>('../../quizzes/*.json', {
  eager: true,
  import: 'default',
})

const questions = computed<Question[]>(() => {
  const key = Object.keys(files).find((k) => k.endsWith(`/${props.id}.json`))
  return key ? files[key] : []
})

const letters = 'ABCDEF'
const picked = reactive<Record<number, number>>({})

const attempted = computed(() => Object.keys(picked).length)
const score = computed(() =>
  questions.value.reduce((sum, q, i) => sum + (picked[i] === q.answer ? 1 : 0), 0),
)
const finished = computed(
  () => questions.value.length > 0 && attempted.value === questions.value.length,
)
const percent = computed(() =>
  questions.value.length ? Math.round((score.value / questions.value.length) * 100) : 0,
)
const verdict = computed(() => {
  if (percent.value >= 80) return 'Bahut badhiya! Ye topic ready hai.'
  if (percent.value >= 50) return 'Achha hai. Jo galat hue, unka topic ek baar dobara padho.'
  return 'Koi baat nahi. Page dobara padho, phir quiz try karo.'
})

function choose(qi: number, oi: number) {
  if (picked[qi] === undefined) picked[qi] = oi
}

function optionState(qi: number, oi: number): string {
  const chosen = picked[qi]
  if (chosen === undefined) return ''
  if (oi === questions.value[qi].answer) return 'is-correct'
  if (oi === chosen) return 'is-wrong'
  return 'is-dim'
}

function reset() {
  for (const k of Object.keys(picked)) delete picked[Number(k)]
}
</script>

<template>
  <section class="quiz" :aria-label="title || 'Quiz'">
    <header class="quiz-head">
      <span class="quiz-title">{{ title || 'Quick Quiz' }}</span>
      <span class="quiz-score">Score: {{ score }} / {{ questions.length }}</span>
    </header>

    <p v-if="!questions.length" class="quiz-missing">Quiz "{{ id }}" nahi mila.</p>

    <ol class="quiz-list">
      <li v-for="(item, qi) in questions" :key="qi" class="quiz-item">
        <p class="quiz-question">{{ item.q }}</p>
        <div class="quiz-options">
          <button
            v-for="(opt, oi) in item.options"
            :key="oi"
            type="button"
            class="quiz-option"
            :class="optionState(qi, oi)"
            :disabled="picked[qi] !== undefined"
            @click="choose(qi, oi)"
          >
            <span class="quiz-letter">{{ letters[oi] }}</span>
            <span>{{ opt }}</span>
          </button>
        </div>
        <p
          v-if="picked[qi] !== undefined"
          class="quiz-feedback"
          :class="picked[qi] === item.answer ? 'ok' : 'bad'"
          aria-live="polite"
        >
          <strong v-if="picked[qi] === item.answer">Sahi jawab!</strong>
          <strong v-else>Galat. Sahi jawab: {{ letters[item.answer] }}.</strong>
          <span v-if="item.explain">{{ item.explain }}</span>
        </p>
      </li>
    </ol>

    <footer class="quiz-foot">
      <p v-if="finished" class="quiz-result">
        Aapka score: {{ score }} / {{ questions.length }} ({{ percent }}%). {{ verdict }}
      </p>
      <p v-else class="quiz-progress">{{ attempted }} / {{ questions.length }} attempted</p>
      <button type="button" class="quiz-reset" :disabled="!attempted" @click="reset">
        Dobara try karo
      </button>
    </footer>
  </section>
</template>
