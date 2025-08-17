<script setup lang="ts">
import { useTimerStore } from '../stores/timerStore'
import { Clock, Coffee, Moon } from 'lucide-vue-next'

const timerStore = useTimerStore()
</script>

<template>
  <div class="mode-selector">
    <button 
      @click="timerStore.setMode('pomodoro')" 
      :class="{ active: timerStore.mode === 'pomodoro' }"
      class="pomodoro-btn"
    >
      <Clock :size="16" />
      <span>番茄时间</span>
    </button>
    <button 
      @click="timerStore.setMode('shortBreak')" 
      :class="{ active: timerStore.mode === 'shortBreak' }"
      class="short-break-btn"
    >
      <Coffee :size="16" />
      <span>短休息</span>
    </button>
    <button 
      @click="timerStore.setMode('longBreak')" 
      :class="{ active: timerStore.mode === 'longBreak' }"
      class="long-break-btn"
    >
      <Moon :size="16" />
      <span>长休息</span>
    </button>
  </div>
</template>

<style scoped>
.mode-selector {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.mode-selector button {
  padding: 0.5rem 1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.mode-selector button:hover {
  border-color: #3498db;
}

.mode-selector .pomodoro-btn.active {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

.mode-selector .short-break-btn.active {
  background: #8b5cf6;
  color: white;
  border-color: #8b5cf6;
}

.mode-selector .long-break-btn.active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}

.mode-selector .pomodoro-btn:hover {
  border-color: #ef4444;
}

.mode-selector .short-break-btn:hover {
  border-color: #8b5cf6;
}

.mode-selector .long-break-btn:hover {
  border-color: #6366f1;
}
</style>