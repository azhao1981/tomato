<script setup lang="ts">
import { useTimerStore } from '../stores/timerStore'
import { Timer, Clock, Play, Pause } from 'lucide-vue-next'

const timerStore = useTimerStore()
</script>

<template>
  <div class="timer-display">
    <div class="time">
      <Timer :size="32" />
      {{ timerStore.formattedTime }}
    </div>
    <div class="mode">
      <Clock :size="16" />
      当前模式: {{ timerStore.mode }}
    </div>
    <div class="status">
      <component :is="timerStore.isRunning ? Play : Pause" :size="16" />
      状态: {{ timerStore.isRunning ? '运行中' : '已停止' }}
    </div>
  </div>
</template>

<style scoped>
.timer-display {
  text-align: center;
  margin: 2rem 0;
}

.timer-display .time {
  font-size: 3rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}

.timer-display .mode,
.timer-display .status {
  color: #666;
  margin: 0.25rem 0;
}
</style>