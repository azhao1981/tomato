<script setup lang="ts">
import { ref } from 'vue'
import { 
  Play, Pause, RotateCcw, Clock, Coffee, 
  Settings, Check, X, ChevronLeft, ChevronRight,
  Timer, Zap, Moon, Star,
  Home, Bell, Search
} from "lucide-vue-next"

const iconSize = ref(24)
const iconColor = ref('#3b82f6')
const strokeWidth = ref(2)

const iconGroups = [
  {
    name: '计时器控制',
    icons: [
      { component: Play, name: 'Play', color: '#22c55e' },
      { component: Pause, name: 'Pause', color: '#f59e0b' },
      { component: RotateCcw, name: 'Reset', color: '#ef4444' },
      { component: Timer, name: 'Timer', color: '#3b82f6' }
    ]
  },
  {
    name: '模式选择',
    icons: [
      { component: Clock, name: 'Pomodoro', color: '#ef4444' },
      { component: Coffee, name: 'Short Break', color: '#8b5cf6' },
      { component: Moon, name: 'Long Break', color: '#6366f1' },
      { component: Zap, name: 'Focus', color: '#f59e0b' }
    ]
  },
  {
    name: '设置和操作',
    icons: [
      { component: Settings, name: 'Settings', color: '#6b7280' },
      { component: Check, name: 'Complete', color: '#22c55e' },
      { component: X, name: 'Cancel', color: '#ef4444' },
      { component: Bell, name: 'Notification', color: '#f59e0b' }
    ]
  },
  {
    name: '导航和界面',
    icons: [
      { component: ChevronLeft, name: 'Previous', color: '#6b7280' },
      { component: ChevronRight, name: 'Next', color: '#6b7280' },
      { component: Home, name: 'Home', color: '#3b82f6' },
      { component: Search, name: 'Search', color: '#6b7280' }
    ]
  }
]

function increaseSize() {
  if (iconSize.value < 48) {
    iconSize.value += 4
  }
}

function decreaseSize() {
  if (iconSize.value > 16) {
    iconSize.value -= 4
  }
}

function increaseStroke() {
  if (strokeWidth.value < 4) {
    strokeWidth.value += 0.5
  }
}

function decreaseStroke() {
  if (strokeWidth.value > 1) {
    strokeWidth.value -= 0.5
  }
}
</script>

<template>
  <div class="icon-test">
    <h3>Lucide Vue 图标库配置测试</h3>
    
    <div class="controls">
      <div class="control-group">
        <label>图标大小: {{ iconSize }}px</label>
        <div class="button-group">
          <button @click="decreaseSize" size="small">-</button>
          <button @click="increaseSize" size="small">+</button>
        </div>
      </div>
      
      <div class="control-group">
        <label>线条粗细: {{ strokeWidth }}</label>
        <div class="button-group">
          <button @click="decreaseStroke" size="small">-</button>
          <button @click="increaseStroke" size="small">+</button>
        </div>
      </div>
      
      <div class="control-group">
        <label>颜色:</label>
        <input v-model="iconColor" type="color" />
      </div>
    </div>

    <div v-for="group in iconGroups" :key="group.name" class="icon-group">
      <h4>{{ group.name }}</h4>
      <div class="icons-container">
        <div v-for="icon in group.icons" :key="icon.name" class="icon-item">
          <component 
            :is="icon.component" 
            :size="iconSize" 
            :color="icon.color"
            :stroke-width="strokeWidth"
            class="icon"
          />
          <div class="icon-name">{{ icon.name }}</div>
        </div>
      </div>
    </div>

    <div class="icon-group">
      <h4>动态属性测试</h4>
      <div class="icons-container">
        <div class="icon-item">
          <Play :size="iconSize" :color="iconColor" :stroke-width="strokeWidth" />
          <div class="icon-name">动态 Play</div>
        </div>
        <div class="icon-item">
          <Pause :size="iconSize" :color="iconColor" :stroke-width="strokeWidth" />
          <div class="icon-name">动态 Pause</div>
        </div>
        <div class="icon-item">
          <Settings :size="iconSize" :color="iconColor" :stroke-width="strokeWidth" />
          <div class="icon-name">动态 Settings</div>
        </div>
        <div class="icon-item">
          <Star :size="iconSize" :color="iconColor" :stroke-width="strokeWidth" :fill="iconColor" fill-opacity="0.2" />
          <div class="icon-name">填充 Star</div>
        </div>
      </div>
    </div>

    <div class="usage-example">
      <h4>使用示例</h4>
      <pre><code>&lt;!-- 按需导入 --&gt;
import { Play, Pause, Settings } from "lucide-vue-next"

&lt;!-- 基础使用 --&gt;
&lt;Play :size="24" color="#22c55e" /&gt;

&lt;!-- 动态属性 --&gt;
&lt;Pause :size="iconSize" :color="iconColor" :stroke-width="2" /&gt;

&lt;!-- 填充图标 --&gt;
&lt;Star :size="32" color="#fbbf24" :fill="#fbbf24" fill-opacity="0.2" /&gt;</code></pre>
    </div>
  </div>
</template>

<style scoped>
.icon-test {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.button-group {
  display: flex;
  gap: 4px;
}

button {
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
}

button:hover {
  background: #f3f4f6;
}

input[type="color"] {
  width: 40px;
  height: 32px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
}

.icon-group {
  margin-bottom: 24px;
}

.icon-group h4 {
  margin: 0 0 12px 0;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
}

.icons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  min-width: 80px;
}

.icon-item:hover {
  background: #f3f4f6;
}

.icon {
  margin-bottom: 8px;
}

.icon-name {
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  font-weight: 500;
}

.usage-example {
  margin-top: 24px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.usage-example h4 {
  margin: 0 0 12px 0;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.usage-example pre {
  margin: 0;
  padding: 12px;
  background: #1e293b;
  border-radius: 6px;
  overflow-x: auto;
}

.usage-example code {
  color: #e2e8f0;
  font-size: 12px;
  line-height: 1.5;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}
</style>