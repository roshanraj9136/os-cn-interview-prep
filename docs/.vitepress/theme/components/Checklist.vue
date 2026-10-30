<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<{ id: string; items: string[] }>()

// Progress is saved in this browser only (localStorage), nothing is sent anywhere.
const storageKey = `oscn-checklist:${props.id}`
const checked = ref<boolean[]>(props.items.map(() => false))
const done = computed(() => checked.value.filter(Boolean).length)

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
    if (Array.isArray(saved)) checked.value = props.items.map((_, i) => saved[i] === true)
  } catch {
    // ignore broken or blocked storage
  }
})

watch(
  checked,
  (value) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value))
    } catch {
      // storage may be disabled; the checklist still works for this visit
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="checklist">
    <div class="checklist-head">
      <span>{{ done }} / {{ items.length }} done</span>
      <progress :value="done" :max="items.length" />
    </div>
    <label
      v-for="(item, i) in items"
      :key="i"
      class="checklist-item"
      :class="{ done: checked[i] }"
    >
      <input v-model="checked[i]" type="checkbox" />
      <span>{{ item }}</span>
    </label>
  </div>
</template>
