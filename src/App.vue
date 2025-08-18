<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue";
import { useTimerStore } from "./stores/timerStore";
import Header from "./components/Header.vue";
import TimerDisplay from "./components/TimerDisplay.vue";
import TimerControls from "./components/TimerControls.vue";
import ModeSelector from "./components/ModeSelector.vue";
import TimerSettings from "./components/TimerSettings.vue";
import IconTest from "./components/IconTest.vue";
import TimeUtilsTest from "./components/TimeUtilsTest.vue";
import StorageTest from "./components/StorageTest.vue";

const timerStore = useTimerStore();
const timerInterval = ref<number | null>(null);

// 组件挂载时加载设置
onMounted(async () => {
  await timerStore.loadSettings();
});

// Header 组件事件处理
function handleMenuClick() {
  console.log('菜单按钮被点击');
}

function handleTimerClick() {
  console.log('番茄时钟按钮被点击');
}

function handleSettingsClick() {
  console.log('设置按钮被点击');
}

function handleStatsClick() {
  console.log('统计按钮被点击');
}

function handleTasksClick() {
  console.log('任务列表按钮被点击');
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
  <div class="min-h-screen bg-gray-50">
    <!-- 头部导航 -->
    <Header 
      @menu-click="handleMenuClick"
      @timer-click="handleTimerClick"
      @settings-click="handleSettingsClick"
      @stats-click="handleStatsClick"
      @tasks-click="handleTasksClick"
    />
    
    <!-- 主要内容区域 -->
    <main class="flex flex-col items-center justify-center p-4 pt-6">
      <!-- 番茄时钟测试界面 -->
      <div class="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full">
        <h2 class="text-3xl font-bold text-center mb-8 text-gray-900">
          番茄时钟测试 (Pinia 状态管理)
        </h2>
        
        <!-- Lucide 图标测试 -->
        <IconTest />
        
        <!-- dayjs 时间处理工具测试 -->
        <TimeUtilsTest />
        
        <!-- localforage 本地存储测试 -->
        <StorageTest />
        
        <TimerDisplay>
          <template #controls>
            <TimerControls @start="startTimer" @pause="pauseTimer" @reset="resetTimer" />
          </template>
        </TimerDisplay>
        <ModeSelector />
        <TimerSettings />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 移除原有样式，使用 Tailwind CSS */
</style>