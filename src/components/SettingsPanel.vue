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
  
  return {
    currentTime: now.toLocaleTimeString('zh-CN'),
    currentDate: `${year}年${month}月${day}日`
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
  longBreakTime: timerStore.settings.longBreakTime,
  showHourRing: timerStore.settings.showHourRing,
  showMinuteRing: timerStore.settings.showMinuteRing
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
      <div class="flex justify-between items-center text-sm">
        <span class="text-gray-600">当前时间:</span>
        <span class="font-mono text-purple-700">{{ currentTimeInfo.currentTime }} {{ currentTimeInfo.currentDate }}</span>
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
      
      <!-- 分隔线 -->
      <div class="border-t border-gray-200 my-3"></div>
      
      <!-- 显示设置 -->
      <div class="space-y-3">
        <div class="text-xs font-medium text-gray-700 mb-2">显示设置</div>
        <div class="flex items-center justify-between">
          <label class="text-sm text-gray-600">显示小时圈</label>
          <input 
            v-model="localSettings.showHourRing"
            @change="saveSettings"
            type="checkbox"
            class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          >
        </div>
        <div class="flex items-center justify-between">
          <label class="text-sm text-gray-600">显示分钟圈</label>
          <input 
            v-model="localSettings.showMinuteRing"
            @change="saveSettings"
            type="checkbox"
            class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          >
        </div>
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