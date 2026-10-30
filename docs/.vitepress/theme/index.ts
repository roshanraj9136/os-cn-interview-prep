import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Quiz from './components/Quiz.vue'
import Checklist from './components/Checklist.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
    app.component('Checklist', Checklist)
  },
} satisfies Theme
