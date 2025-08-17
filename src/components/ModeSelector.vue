<script setup lang="ts">
import { useTimerStore } from '../stores/timerStore'

const timerStore = useTimerStore()
</script>

<template>
  <div class="mode-selector">
    <button 
      @click="timerStore.setMode('pomodoro')" 
      :class="{ active: timerStore.mode === 'pomodoro' }"
    >
      番茄时间
    </button>
    <button 
      @click="timerStore.setMode('shortBreak')" 
      :class="{ active: timerStore.mode === 'shortBreak' }"
    >
      短休息
    </button>
    <button 
      @click="timerStore.setMode('longBreak')" 
      :class="{ active: timerStore.mode === 'longBreak' }"
    >
      长休息
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
}

.mode-selector button:hover {
  border-color: #3498db;
}

.mode-selector button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}
</style>