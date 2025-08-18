<script setup lang="ts">
import { computed } from 'vue'
import { useTimerStore } from '../stores/timerStore'

const timerStore = useTimerStore()

// 计算进度百分比
const progress = computed(() => {
  const totalTime = timerStore.duration
  const remainingTime = timerStore.remainingTime
  return ((totalTime - remainingTime) / totalTime) * 100
})

// 计算进度环的样式
const progressStyle = computed(() => {
  const angle = (progress.value / 100) * 360
  return {
    background: `conic-gradient(from 0deg, #10b981 0deg ${angle}deg, #e5e7eb ${angle}deg)`
  }
})
</script>

<template>
  <div class="flex justify-center">
    <div class="timer-circle">
      <div class="progress-ring" :style="progressStyle"></div>
      <div class="timer-display">
        <div class="text-5xl font-bold text-gray-800 mb-4 tabular-nums">
          {{ timerStore.formattedTime }}
        </div>
        <div class="flex justify-center space-x-2">
          <slot name="controls"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timer-circle {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.timer-circle::before {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: white;
}

.timer-display {
  position: relative;
  z-index: 10;
  text-align: center;
}

.progress-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  mask: radial-gradient(circle at center, transparent 60%, black 60%);
  -webkit-mask: radial-gradient(circle at center, transparent 60%, black 60%);
}
</style>