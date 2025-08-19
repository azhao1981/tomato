<script setup lang="ts">
import { computed } from 'vue'
import { useTimerStore } from '../stores/timerStore'

const timerStore = useTimerStore()

// 计算进度环的样式
const progressStyle = computed(() => {
  const angle = (timerStore.progressPercentage / 100) * 360
  return {
    background: `conic-gradient(from 0deg, #10b981 0deg ${angle}deg, #e5e7eb ${angle}deg)`
  }
})

// 计算小时圈的样式
const hourRingStyle = computed(() => {
  const currentHour = 6 // 写死为6点进行测试
  const hourAngle = (currentHour / 12) * 360
  return {
    '--hour-angle': `${hourAngle}deg`,
    background: `conic-gradient(from 0deg, #fbbf24 0deg ${hourAngle}deg, #e5e7eb ${hourAngle}deg 360deg)`
  }
})

// 计算分钟圈的样式
const minuteRingStyle = computed(() => {
  const currentMinute = 30 // 写死为30分钟进行测试
  const minuteAngle = (currentMinute / 60) * 360
  return {
    '--minute-angle': `${minuteAngle}deg`,
    background: `conic-gradient(from 0deg, #1f2937 0deg ${minuteAngle}deg, #e5e7eb ${minuteAngle}deg 360deg)`
  }
})
</script>

<template>
  <div class="timer-container">
    <div class="minute-ring" :style="minuteRingStyle"></div>
    <div class="hour-ring" :style="hourRingStyle"></div>
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
.timer-container {
  position: relative;
  width: 320px;
  height: 320px;
}

.minute-ring {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  opacity: 0.8;
}

.minute-ring::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #1f2937;
  clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%, 50% 50%);
}

.hour-ring {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 310px;
  height: 310px;
  border-radius: 50%;
  opacity: 0.8;
  mask: radial-gradient(circle at center, transparent 70%, black 70%);
  -webkit-mask: radial-gradient(circle at center, transparent 70%, black 70%);
}

.timer-circle {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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