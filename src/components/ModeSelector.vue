<script setup lang="ts">
import { useTimerStore } from '../stores/timerStore'
import { Clock, Settings } from 'lucide-vue-next'

const timerStore = useTimerStore()

// 定义事件
const emit = defineEmits<{
  'settings-click': []
}>()
</script>

<template>
  <div class="grid grid-cols-4 gap-3">
    <button 
      @click="timerStore.setMode('pomodoro')" 
      :class="{ active: timerStore.mode === 'pomodoro' }"
      class="mode-button bg-white rounded-xl p-4 text-center shadow-md"
    >
      <Clock :size="20" class="mx-auto mb-1" :class="timerStore.mode === 'pomodoro' ? 'text-purple-600' : 'text-gray-600'" />
      <div class="text-xs font-medium" :class="timerStore.mode === 'pomodoro' ? 'text-green-600' : 'text-gray-500'">
        {{ timerStore.settings.pomodoroTime }}min
      </div>
    </button>
    
    <button 
      @click="timerStore.setMode('shortBreak')" 
      :class="{ active: timerStore.mode === 'shortBreak' }"
      class="mode-button bg-white rounded-xl p-4 text-center shadow-md"
    >
      <div class="font-semibold text-sm">短休</div>
      <div class="text-xs" :class="timerStore.mode === 'shortBreak' ? 'text-green-600' : 'text-gray-500'">
        {{ timerStore.settings.shortBreakTime }}min
      </div>
    </button>
    
    <button 
      @click="timerStore.setMode('longBreak')" 
      :class="{ active: timerStore.mode === 'longBreak' }"
      class="mode-button bg-white rounded-xl p-4 text-center shadow-md"
    >
      <div class="font-semibold text-sm">长休</div>
      <div class="text-xs" :class="timerStore.mode === 'longBreak' ? 'text-green-600' : 'text-gray-500'">
        {{ timerStore.settings.longBreakTime }}min
      </div>
    </button>
    
    <button 
      @click="emit('settings-click')" 
      class="mode-button bg-white rounded-xl p-4 text-center shadow-md"
    >
      <div class="font-semibold text-sm">设置</div>
      <Settings :size="16" class="mx-auto mt-1 text-gray-600" />
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
</style>