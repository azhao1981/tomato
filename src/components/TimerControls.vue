<script setup lang="ts">
import { useTimerStore } from '../stores/timerStore'
import { Play, Pause, RotateCcw } from 'lucide-vue-next'

const timerStore = useTimerStore()

const emit = defineEmits<{
  start: []
  pause: []
  reset: []
}>()

function startTimer() {
  emit('start')
}

function pauseTimer() {
  emit('pause')
}

function resetTimer() {
  emit('reset')
}
</script>

<template>
  <div class="flex justify-center space-x-2">
    <button 
      @click="startTimer" 
      :disabled="timerStore.isRunning"
      class="control-button bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow disabled:opacity-50 disabled:cursor-not-allowed"
      title="开始"
    >
      <Play :size="16" />
    </button>
    <button 
      @click="pauseTimer" 
      :disabled="!timerStore.isRunning"
      class="control-button bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow disabled:opacity-50 disabled:cursor-not-allowed"
      title="暂停"
    >
      <Pause :size="16" />
    </button>
    <button 
      @click="resetTimer" 
      class="control-button bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full shadow"
      title="重置"
    >
      <RotateCcw :size="16" />
    </button>
  </div>
</template>

<style scoped>
.control-button {
  transition: all 0.2s ease;
}

.control-button:hover:not(:disabled) {
  transform: scale(1.05);
}

.control-button:active:not(:disabled) {
  transform: scale(0.95);
}
</style>