<script setup lang="ts">
import { useTimerStore } from '../stores/timerStore'
import { Clock, Coffee, Moon, Settings } from 'lucide-vue-next'

const timerStore = useTimerStore()

function updatePomodoroTime() {
  timerStore.updateSettings(timerStore.settings)
}

function updateShortBreakTime() {
  timerStore.updateSettings(timerStore.settings)
}

function updateLongBreakTime() {
  timerStore.updateSettings(timerStore.settings)
}
</script>

<template>
  <div class="settings">
    <h3><Settings :size="20" /> 设置</h3>
    <div class="setting-item">
      <label><Clock :size="16" /> 番茄时间 (分钟):</label>
      <input 
        type="number" 
        v-model.number="timerStore.settings.pomodoroTime" 
        min="1" 
        max="60"
        @change="updatePomodoroTime"
      >
    </div>
    <div class="setting-item">
      <label><Coffee :size="16" /> 短休息时间 (分钟):</label>
      <input 
        type="number" 
        v-model.number="timerStore.settings.shortBreakTime" 
        min="1" 
        max="30"
        @change="updateShortBreakTime"
      >
    </div>
    <div class="setting-item">
      <label><Moon :size="16" /> 长休息时间 (分钟):</label>
      <input 
        type="number" 
        v-model.number="timerStore.settings.longBreakTime" 
        min="1" 
        max="60"
        @change="updateLongBreakTime"
      >
    </div>
  </div>
</template>

<style scoped>
.settings {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.settings h3 {
  margin-top: 0;
  color: #2c3e50;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}

.setting-item label {
  font-weight: 500;
  color: #555;
}

.setting-item input {
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}
</style>