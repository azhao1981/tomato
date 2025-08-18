<script setup lang="ts">
import { ref } from 'vue'
import { useTimerStore } from '../stores/timerStore'

const timerStore = useTimerStore()
const showSettings = ref(false)

// 本地设置状态
const localSettings = ref({
  pomodoroTime: timerStore.settings.pomodoroTime,
  shortBreakTime: timerStore.settings.shortBreakTime,
  longBreakTime: timerStore.settings.longBreakTime
})

function toggleSettings() {
  showSettings.value = !showSettings.value
  if (showSettings.value) {
    // 打开时同步当前设置
    localSettings.value = { ...timerStore.settings }
  }
}

// saveSettings 函数将在未来版本中用于保存设置
</script>

<template>
  <div class="settings-dropdown">
    <!-- 设置按钮 -->
    <button 
      @click="toggleSettings"
      class="mode-button bg-white rounded-xl p-4 text-center shadow-md"
      :class="{ active: showSettings }"
    >
      <div class="font-semibold text-sm">设置</div>
      <svg 
        class="w-3 h-3 mx-auto mt-1 text-gray-500"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.mode-button {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.mode-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.mode-button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
}

.mode-button.active * {
  color: white !important;
}

.stats-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>