<script setup lang="ts">
import { useTimerStore } from '../stores/timerStore'
import { Play, Pause, RotateCcw } from 'lucide-vue-next'

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
    <button @click="startTimer" :disabled="timerStore.isRunning" class="start-btn">
      <Play :size="20" />
      <span>开始</span>
    </button>
    <button @click="pauseTimer" :disabled="!timerStore.isRunning" class="pause-btn">
      <Pause :size="20" />
      <span>暂停</span>
    </button>
    <button @click="resetTimer" class="reset-btn">
      <RotateCcw :size="20" />
      <span>重置</span>
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.controls button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.controls .start-btn {
  background: #22c55e;
  color: white;
}

.controls .pause-btn {
  background: #f59e0b;
  color: white;
}

.controls .reset-btn {
  background: #ef4444;
  color: white;
}
</style>