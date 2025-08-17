<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { useTimerStore } from "./stores/timerStore";
import TimerDisplay from "./components/TimerDisplay.vue";
import TimerControls from "./components/TimerControls.vue";
import ModeSelector from "./components/ModeSelector.vue";
import TimerSettings from "./components/TimerSettings.vue";

const timerStore = useTimerStore();
const timerInterval = ref<NodeJS.Timeout | null>(null);

function startTimer() {
  if (!timerStore.isRunning) {
    timerStore.startTimer();
    timerInterval.value = setInterval(() => {
      timerStore.decrementTime();
    }, 1000);
  }
}

function pauseTimer() {
  timerStore.pauseTimer();
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
}

function resetTimer() {
  pauseTimer();
  timerStore.resetTimer();
}

// 组件卸载时清理定时器
onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});
</script>

<template>
  <main class="container">
    <!-- 番茄时钟测试界面 -->
    <div class="timer-test">
      <h2>番茄时钟测试 (Pinia 状态管理)</h2>
      
      <TimerDisplay />
      <TimerControls @start="startTimer" @pause="pauseTimer" @reset="resetTimer" />
      <ModeSelector />
      <TimerSettings />
    </div>
  </main>
</template>

<style scoped>
.timer-test {
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.container {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>