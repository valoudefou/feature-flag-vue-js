<!-- components/InteractionLogger.vue -->
<template>
  <!-- Button to toggle visibility -->
  <button
    @click="toggleVisibility"
    class="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-green-600 transition-colors z-50"
  >
    {{ isVisible.value ? 'Hide Log' : 'Show Log' }}
  </button>

  <!-- Conditional rendering of the log -->
  <div v-if="isVisible.value" class="p-4 sticky top-0 bg-black text-green-400 z-50 shadow-md border-l-4 border-green-500">
    <h2 class="text-xl font-semibold mb-3 text-green-300">Interaction Log</h2>
    <ul class="max-h-52 overflow-auto text-sm font-mono space-y-2">
      <li v-for="(log, index) in logs" :key="index" class="flex flex-col">
        <div class="flex items-center space-x-2 text-xs text-green-500">
          <span>[{{ log.timestamp }}]</span>
          <span class="font-medium text-green-300">{{ log.type }}</span>
        </div>
        <div class="text-green-400 mt-1">
          {{
            typeof log.detail === 'object'
              ? JSON.stringify(log.detail)
              : log.detail
          }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

// Shared reactive logs array
const logs = reactive([])
const isVisible = reactive({ value: true })  // reactive state for visibility

// Toggle visibility for both button and key press
const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const logEvent = (type, detail) => {
  logs.unshift({
    type,
    detail,
    timestamp: new Date().toLocaleTimeString(),
  })
  // Optional: console log or send to backend
  console.log(`[Interaction] ${type}:`, detail)
}

const trackDOMInteractions = () => {
  const onFocus = (e) => {
    logEvent('focus', e.target.name || e.target.id || e.target.tagName)
  }

  const onInput = (e) => {
    logEvent('input', {
      field: e.target.name || e.target.id,
      value: e.target.value,
    })
  }

  const onClick = (e) => {
    logEvent('click', e.target.outerHTML.slice(0, 50)) // partial HTML
  }

  document.addEventListener('focusin', onFocus)
  document.addEventListener('input', onInput)
  document.addEventListener('click', onClick)

  return () => {
    document.removeEventListener('focusin', onFocus)
    document.removeEventListener('input', onInput)
    document.removeEventListener('click', onClick)
  }
}

onMounted(() => {
  const cleanup = trackDOMInteractions()

  // Optional: reset logs on route change
  const route = useRoute()
  watch(() => route.fullPath, () => {
    logs.splice(0)
    logEvent('navigation', route.fullPath)
  })

  // Listen for the 'L' key to toggle visibility (optional, keep both button and key support)
  window.addEventListener('keydown', (event) => {
    if (event.key === 'l' || event.key === 'L') {
      toggleVisibility()
    }
  })

  onBeforeUnmount(() => {
    cleanup()
    window.removeEventListener('keydown', toggleVisibility)
  })
})
</script>

<style scoped>
/* Black and green console look */
.sticky {
  position: sticky;
  top: 0;
  background-color: #000;
  color: #00ff00;
  z-index: 50; /* Increased z-index */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

li {
  transition: background-color 0.2s ease-in-out;
}

li:hover {
  background-color: #333;
}

/* Floating button for show/hide */
button {
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  z-index: 50; /* Increased z-index */
}

button:hover {
  background-color: #22c55e; /* Darker green on hover */
}

button:focus {
  outline: none;
}
</style>
