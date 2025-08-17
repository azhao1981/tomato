<script setup lang="ts">
import { useTimerStore } from '../stores/timerStore'

const timerStore = useTimerStore()

const emit = defineEmits<{
  start: []
  pause: []
  reset: []
}>()

function startTimer() {
  emit('start')
}

function pauseTimer() {
  emit('pause')
}

function resetTimer() {
  emit('reset')
}
</script>

<template>
  <div class="controls">
    <button @click="startTimer" :disabled="timerStore.isRunning">
      开始
    </button>
    <button @click="pauseTimer" :disabled="!timerStore.isRunning">
      暂停
    </button>
    <button @click="resetTimer">
      重置
    </button>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.controls button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.controls button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.controls button:first-child {
  background: #27ae60;
  color: white;
}

.controls button:nth-child(2) {
  background: #f39c12;
  color: white;
}

.controls button:nth-child(3) {
  background: #e74c3c;
  color: white;
}
</style>