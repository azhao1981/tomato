<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { useTimerStore } from "./stores/timerStore";

const greetMsg = ref("");
const name = ref("");

const timerStore = useTimerStore();

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", { name: name.value });
}
</script>

<template>
  <main class="container">
    <h1>Welcome to Tauri + Vue</h1>
    
    <!-- 番茄时钟测试界面 -->
    <div class="timer-test">
      <h2>番茄时钟测试 (Pinia 状态管理)</h2>
      
      <div class="timer-display">
        <div class="time">{{ timerStore.formattedTime }}</div>
        <div class="mode">当前模式: {{ timerStore.mode }}</div>
        <div class="status">状态: {{ timerStore.isRunning ? '运行中' : '已停止' }}</div>
      </div>
      
      <div class="controls">
        <button @click="timerStore.startTimer" :disabled="timerStore.isRunning">
          开始
        </button>
        <button @click="timerStore.pauseTimer" :disabled="!timerStore.isRunning">
          暂停
        </button>
        <button @click="timerStore.resetTimer">
          重置
        </button>
      </div>
      
      <div class="mode-selector">
        <button 
          @click="timerStore.setMode('pomodoro')" 
          :class="{ active: timerStore.mode === 'pomodoro' }"
        >
          番茄时间
        </button>
        <button 
          @click="timerStore.setMode('shortBreak')" 
          :class="{ active: timerStore.mode === 'shortBreak' }"
        >
          短休息
        </button>
        <button 
          @click="timerStore.setMode('longBreak')" 
          :class="{ active: timerStore.mode === 'longBreak' }"
        >
          长休息
        </button>
      </div>
      
      <div class="settings">
        <h3>设置</h3>
        <div class="setting-item">
          <label>番茄时间 (分钟):</label>
          <input 
            type="number" 
            v-model.number="timerStore.settings.pomodoroTime" 
            min="1" 
            max="60"
            @change="timerStore.updateSettings(timerStore.settings)"
          >
        </div>
        <div class="setting-item">
          <label>短休息时间 (分钟):</label>
          <input 
            type="number" 
            v-model.number="timerStore.settings.shortBreakTime" 
            min="1" 
            max="30"
            @change="timerStore.updateSettings(timerStore.settings)"
          >
        </div>
        <div class="setting-item">
          <label>长休息时间 (分钟):</label>
          <input 
            type="number" 
            v-model.number="timerStore.settings.longBreakTime" 
            min="1" 
            max="60"
            @change="timerStore.updateSettings(timerStore.settings)"
          >
        </div>
      </div>
    </div>

    <hr class="divider">
    
    <div class="original-demo">
      <h2>原始 Tauri 示例</h2>
      <div class="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" class="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and Vue logos to learn more.</p>

      <form class="row" @submit.prevent="greet">
        <input id="greet-input" v-model="name" placeholder="Enter a name..." />
        <button type="submit">Greet</button>
      </form>
      <p>{{ greetMsg }}</p>
    </div>
  </main>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}

/* 番茄时钟测试界面样式 */
.timer-test {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.timer-display {
  text-align: center;
  margin: 2rem 0;
}

.timer-display .time {
  font-size: 3rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}

.timer-display .mode,
.timer-display .status {
  color: #666;
  margin: 0.25rem 0;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.controls button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.controls button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.controls button:first-child {
  background: #27ae60;
  color: white;
}

.controls button:nth-child(2) {
  background: #f39c12;
  color: white;
}

.controls button:nth-child(3) {
  background: #e74c3c;
  color: white;
}

.mode-selector {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.mode-selector button {
  padding: 0.5rem 1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-selector button:hover {
  border-color: #3498db;
}

.mode-selector button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

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

.divider {
  border: none;
  border-top: 2px solid #eee;
  margin: 3rem 0;
}

.original-demo {
  margin-top: 2rem;
}

</style>
<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

.container {
  margin: 0;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: 0.75s;
}

.logo.tauri:hover {
  filter: drop-shadow(0 0 2em #24c8db);
}

.row {
  display: flex;
  justify-content: center;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1 {
  text-align: center;
}

input,
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #0f0f0f;
  background-color: #ffffff;
  transition: border-color 0.25s;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

button {
  cursor: pointer;
}

button:hover {
  border-color: #396cd8;
}
button:active {
  border-color: #396cd8;
  background-color: #e8e8e8;
}

input,
button {
  outline: none;
}

#greet-input {
  margin-right: 5px;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  }

  a:hover {
    color: #24c8db;
  }

  input,
  button {
    color: #ffffff;
    background-color: #0f0f0f98;
  }
  button:active {
    background-color: #0f0f0f69;
  }
}

</style>