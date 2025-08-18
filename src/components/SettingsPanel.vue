<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useTimerStore } from '../stores/timerStore'
import { useStatisticsStore } from '../stores/statisticsStore'

const timerStore = useTimerStore()
const statisticsStore = useStatisticsStore()

// 时间更新触发器，用于强制重新计算时间
const timeUpdateTrigger = ref(0)

// 当前时间信息
const currentTimeInfo = computed(() => {
  const now = new Date()
  
  // 获取本地时区的日期
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const today = `${year}-${month}-${day}`
  
  // 使用修复后的 todayStats 计算属性
  const todayStats = statisticsStore.todayStats
  
  return {
    currentTime: now.toLocaleTimeString('zh-CN'),
    currentDate: `${year}年${month}月${day}日`,
    todayTomatoCount: todayStats.tomatoCount,
    isoDate: today
  }
})

// 每秒更新时间显示
let timeInterval: number
onMounted(() => {
  timeInterval = setInterval(() => {
    timeUpdateTrigger.value++
  }, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

// 本地设置状态
const localSettings = ref({
  pomodoroTime: timerStore.settings.pomodoroTime,
  shortBreakTime: timerStore.settings.shortBreakTime,
  longBreakTime: timerStore.settings.longBreakTime
})

// 监听 store 设置变化，同步到本地状态
watch(() => timerStore.settings, (newSettings) => {
  localSettings.value = { ...newSettings }
}, { deep: true })

async function saveSettings() {
  await timerStore.updateSettings(localSettings.value)
}
</script>

<template>
  <div class="stats-card rounded-xl p-4 shadow-lg mt-4">
    <h3 class="text-sm font-semibold text-gray-800 mb-3">设置</h3>
    
    <!-- 当前时间信息 -->
    <div class="bg-purple-50 rounded-lg p-3 mb-4 border border-purple-100">
      <div class="text-xs text-purple-600 font-medium mb-2">当前时间信息</div>
      <div class="space-y-1">
        <div class="flex justify-between text-xs">
          <span class="text-gray-600">当前时间:</span>
          <span class="font-mono text-purple-700">{{ currentTimeInfo.currentTime }}</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-gray-600">今日日期:</span>
          <span class="text-purple-700">{{ currentTimeInfo.currentDate }}</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-gray-600">ISO 日期:</span>
          <span class="font-mono text-purple-700 text-xs">{{ currentTimeInfo.isoDate }}</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-gray-600">今日番茄:</span>
          <span class="text-purple-700 font-semibold">{{ currentTimeInfo.todayTomatoCount }} 个</span>
        </div>
      </div>
    </div>
    
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <label class="text-sm text-gray-600">番茄时间</label>
        <input 
          v-model.number="localSettings.pomodoroTime"
          @input="saveSettings"
          type="number" 
          min="1" 
          max="60"
          class="w-16 px-2 py-1 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
      </div>
      <div class="flex items-center justify-between">
        <label class="text-sm text-gray-600">短休息时间</label>
        <input 
          v-model.number="localSettings.shortBreakTime"
          @input="saveSettings"
          type="number" 
          min="1" 
          max="30"
          class="w-16 px-2 py-1 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
      </div>
      <div class="flex items-center justify-between">
        <label class="text-sm text-gray-600">长休息时间</label>
        <input 
          v-model.number="localSettings.longBreakTime"
          @input="saveSettings"
          type="number" 
          min="1" 
          max="60"
          class="w-16 px-2 py-1 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>