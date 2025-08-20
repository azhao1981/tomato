<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { Menu, Clock, Settings, BarChart3, ListChecks } from 'lucide-vue-next'

// 定义 props
defineProps<{}>()

// 定义事件
const emit = defineEmits<{
  menuClick: []
  timerClick: []
  settingsClick: []
  statsClick: []
  tasksClick: []
  modeSelectorClick: []
}>()

const taskStore = useTaskStore()

// 当前任务标题
const taskTitle = computed(() => {
  return taskStore.currentTask?.name || '选择任务'
})
</script>

<template>
  <header class="">
    <div class="flex items-center justify-between">
      <!-- 左侧：菜单按钮和任务标题 -->
      <div class="flex items-center space-x-3">
        <!-- 菜单按钮 -->
        <button 
          @click="emit('menuClick')"
          class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors"
          aria-label="菜单"
        >
          <Menu :size="20" class="text-white" />
        </button>
        
        <!-- 当前任务标题 -->
        <div class="flex-1">
          <h1 class="text-lg font-medium text-gray-800 truncate">
            {{ taskTitle }}
          </h1>
        </div>
      </div>
      
      <!-- 右侧：功能导航图标 -->
      <div class="flex items-center space-x-2">
        <!-- 番茄时钟按钮 -->
        <button 
          @click="emit('timerClick')"
          class="nav-icon w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="番茄时钟"
          title="番茄时钟"
        >
          <Clock :size="20" class="text-gray-600" />
        </button>
        
        <!-- 设置按钮 - 控制模式选择组件 -->
        <button 
          @click="emit('modeSelectorClick')"
          class="nav-icon w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="模式选择"
          title="模式选择"
        >
          <Settings :size="20" class="text-gray-600" />
        </button>
        
        <!-- 统计按钮 -->
        <button 
          @click="emit('statsClick')"
          class="nav-icon w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="统计"
          title="统计"
        >
          <BarChart3 :size="20" class="text-gray-600" />
        </button>
        
        <!-- 任务列表按钮 -->
        <button 
          @click="emit('tasksClick')"
          class="nav-icon w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="任务列表"
          title="任务列表"
        >
          <ListChecks :size="20" class="text-gray-600" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 组件样式使用 Tailwind CSS */
</style>