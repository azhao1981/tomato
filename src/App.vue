<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue";
import { useTimerStore } from "./stores/timerStore";
import { useUIStore } from "./stores/uiStore";
import Header from "./components/Header.vue";
import TimerDisplay from "./components/TimerDisplay.vue";
import TimerControls from "./components/TimerControls.vue";
import ModeSelector from "./components/ModeSelector.vue";
import TimerSettings from "./components/TimerSettings.vue";
import SettingsPanel from "./components/SettingsPanel.vue";
import StatisticsPanel from "./components/StatisticsPanel.vue";
import TaskList from "./components/TaskList.vue";
import IconTest from "./components/IconTest.vue";
import TimeUtilsTest from "./components/TimeUtilsTest.vue";
import StorageTest from "./components/StorageTest.vue";

const timerStore = useTimerStore();
const uiStore = useUIStore();
const timerInterval = ref<number | null>(null);

// 组件挂载时加载设置
onMounted(async () => {
  await timerStore.loadSettings();
});

// 显示/隐藏设置面板
function toggleSettings() {
  uiStore.toggleSettingsPanel();
}

// Header 组件事件处理
function handleMenuClick() {
  console.log('菜单按钮被点击');
}

function handleTimerClick() {
  uiStore.toggleTimerCircle();
}

function handleSettingsClick() {
  uiStore.toggleSettingsPanel();
}

function handleStatsClick() {
  uiStore.toggleStatisticsCards();
}

function handleTasksClick() {
  uiStore.toggleTaskList();
}

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
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
    <!-- 头部导航 -->
    <Header 
      @menu-click="handleMenuClick"
      @timer-click="handleTimerClick"
      @settings-click="handleSettingsClick"
      @stats-click="handleStatsClick"
      @tasks-click="handleTasksClick"
    />
    
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-6 max-w-md">
      <!-- Main Timer Circle -->
      <div v-if="uiStore.showTimerCircle" class="flex justify-center mb-8">
        <TimerDisplay>
          <template #controls>
            <TimerControls @start="startTimer" @pause="pauseTimer" @reset="resetTimer" />
          </template>
        </TimerDisplay>
      </div>

      <!-- Mode Selection -->
      <ModeSelector v-if="uiStore.showModeSelector" @settings-click="toggleSettings" />
      
      <!-- Settings Panel -->
      <SettingsPanel v-if="uiStore.showSettingsPanel" />
      
      <!-- Statistics Panel -->
      <StatisticsPanel v-if="uiStore.showStatisticsCards" />
      
      <!-- Task List -->
      <TaskList v-if="uiStore.showTaskList" />
    </div>

    <!-- 隐藏的测试组件（用于开发验证） -->
    <div class="hidden">
      <IconTest />
      <TimeUtilsTest />
      <StorageTest />
      <TimerSettings />
    </div>
  </div>
</template>

<style scoped>
/* 移除原有样式，使用 Tailwind CSS */
</style>