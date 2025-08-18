<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { Search, Plus } from 'lucide-vue-next'

const taskStore = useTaskStore()

// 新任务输入
const newTaskName = ref('')

// 计算未完成任务数量
const incompleteTasksCount = computed(() => {
  return taskStore.incompleteTasksCount
})

// 在模板中使用这个计算属性
console.log('未完成任务数量:', incompleteTasksCount.value)

// 添加新任务
function addTask() {
  if (newTaskName.value.trim()) {
    taskStore.addTask(newTaskName.value.trim())
    newTaskName.value = ''
  }
}

// 切换任务完成状态
function toggleTask(taskId: string) {
  taskStore.toggleTask(taskId)
}

// 选择任务（可以设置为当前任务）
function selectTask(taskId: string) {
  taskStore.setCurrentTask(taskId)
  console.log(`选择任务: ${taskId}`)
}

// 删除任务
function deleteTask(taskId: string) {
  taskStore.deleteTask(taskId)
}

// 搜索任务
const searchQuery = ref('')
const filteredTasks = computed(() => {
  if (!searchQuery.value.trim()) {
    return taskStore.tasks
  }
  return taskStore.tasks.filter(task => 
    task.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div class="stats-card rounded-xl p-4 shadow-lg mt-4">
    <!-- 任务输入区域 -->
    <div class="flex items-center space-x-2 mb-3">
      <input 
        v-model="newTaskName"
        @keyup.enter="addTask"
        type="text" 
        placeholder="添加新任务..." 
        class="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
      <button class="p-2 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg transition-colors">
        <Search :size="16" />
      </button>
      <button 
        @click="addTask"
        class="p-2 text-purple-600 hover:text-purple-700 bg-purple-100 rounded-lg transition-colors"
      >
        <Plus :size="16" />
      </button>
    </div>
    
    <!-- 任务列表 -->
    <div class="space-y-2">
      <div 
        v-for="task in filteredTasks" 
        :key="task.id"
        class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 task-item transition-colors"
        :class="{ 'opacity-60': task.completed }"
        @click="selectTask(task.id)"
      >
        <input 
          type="checkbox" 
          :checked="task.completed"
          @change="toggleTask(task.id)"
          @click.stop
          class="w-5 h-5 text-purple-600 rounded-full border-2 border-gray-300 focus:ring-purple-500"
        >
        <span 
          class="flex-1 text-sm task-name"
          :class="task.completed ? 'text-gray-400 line-through' : 'text-gray-700'"
        >
          {{ task.name }}
        </span>
        <span 
          v-if="task.tomatoCount > 0"
          class="text-xs"
          :class="task.completed ? 'text-gray-400' : 'text-gray-500'"
        >
          {{ task.tomatoCount }}
        </span>
        <button 
          @click.stop="deleteTask(task.id)"
          class="text-red-500 hover:text-red-700 text-xs p-1 rounded transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.task-item {
  cursor: pointer;
  transition: all 0.2s ease;
}

.task-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.task-item input[type="checkbox"] {
  cursor: pointer;
}
</style>