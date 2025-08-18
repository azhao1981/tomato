<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTimerStore } from '../stores/timerStore'

const timerStore = useTimerStore()

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
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <label class="text-sm text-gray-600">番茄时间</label>
        <input 
          v-model.number="localSettings.pomodoroTime"
          @change="saveSettings"
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
          @change="saveSettings"
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
          @change="saveSettings"
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