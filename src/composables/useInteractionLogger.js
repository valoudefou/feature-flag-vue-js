// composables/useInteractionLogger.js
import { watch } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

export function useInteractionLogger(form) {
  const logEvent = (type, detail) => {
    console.log(`[Interaction] ${type}:`, detail)
    // Optional: Send to server
    // fetch('/api/log', { method: 'POST', body: JSON.stringify({ type, detail }) })
  }

  const attachListeners = () => {
    // Listen to focus on inputs
    const formEl = document.querySelector('form')
    if (formEl) {
      formEl.addEventListener('focusin', (e) => {
        if (e.target.name || e.target.id) {
          logEvent('focus', e.target.name || e.target.id)
        }
      })
    }
  }

  const watchFields = () => {
    Object.entries(form).forEach(([key, val]) => {
      watch(
        () => form[key],
        (newVal, oldVal) => {
          if (newVal !== oldVal) {
            logEvent('change', { field: key, oldVal, newVal })
          }
        }
      )
    })
  }

  return {
    initLogger: () => {
      attachListeners()
      watchFields()
    },
    logEvent,
  }
}
