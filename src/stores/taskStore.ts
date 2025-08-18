import { defineStore } from 'pinia'
import { storage } from '../services/storageService'

interface Task {
  id: string
  name: string
  title?: string
  completed: boolean
  tomatoCount: number
  updatedAt: Date
}

interface TaskState {
  tasks: Task[]
  currentTaskId: string | null
  searchQuery: string
  isSearchMode: boolean
}

export const useTaskStore = defineStore('tasks', {
  state: (): TaskState => ({
    tasks: [],
    currentTaskId: null,
    searchQuery: '',
    isSearchMode: false
  }),
  getters: {
    incompleteTasks: (state) => {
      return state.tasks.filter(task => !task.completed)
    },
    completedTasks: (state) => {
      return state.tasks.filter(task => task.completed)
    },
    currentTask: (state) => {
      return state.tasks.find(task => task.id === state.currentTaskId)
    },
    incompleteTasksCount: (state) => {
      return state.tasks.filter(task => !task.completed).length
    },
    filteredTasks: (state) => {
      let tasks = state.tasks
      if (!state.searchQuery.trim()) {
        tasks = state.tasks
      } else {
        tasks = state.tasks.filter(task => 
          task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
      }
      // 按最后更新时间降序排列
      return tasks.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    }
  },
  actions: {
    async loadTasks() {
      try {
        const tasks = await storage.getTasks()
        if (tasks && tasks.length > 0) {
          // 转换存储的任务格式为内部格式
          this.tasks = tasks.map(task => ({
            id: String(task.id),
            name: String(task.title || task.name),
            completed: Boolean(task.completed),
            tomatoCount: Number(task.tomatoCount || 0),
            updatedAt: task.updatedAt ? new Date(task.updatedAt) : new Date()
          }))
        }
      } catch (error) {
        console.error('加载任务失败:', error)
      }
    },
    
    async saveTasks() {
      try {
        await storage.saveTasks(this.tasks)
      } catch (error) {
        console.error('保存任务失败:', error)
      }
    },
    
    addTask(name: string) {
      const newTask: Task = {
        id: Date.now().toString(),
        name: name.trim(),
        completed: false,
        tomatoCount: 0,
        updatedAt: new Date()
      }
      this.tasks.push(newTask)
      this.saveTasks()
    },
    
    toggleTask(taskId: string) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
        task.updatedAt = new Date()
        this.saveTasks()
      }
    },
    
    deleteTask(taskId: string) {
      const index = this.tasks.findIndex(t => t.id === taskId)
      if (index > -1) {
        this.tasks.splice(index, 1)
        // 如果删除的是当前任务，清除当前任务
        if (this.currentTaskId === taskId) {
          this.currentTaskId = null
        }
        this.saveTasks()
      }
    },
    
    setCurrentTask(taskId: string) {
      this.currentTaskId = taskId
    },
    
    incrementTomatoCount(taskId: string) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.tomatoCount++
        task.updatedAt = new Date()
        this.saveTasks()
      }
    },
    
    clearCompleted() {
      this.tasks = this.tasks.filter(task => !task.completed)
      if (this.currentTaskId && !this.tasks.find(t => t.id === this.currentTaskId)) {
        this.currentTaskId = null
      }
      this.saveTasks()
    },
    
    setSearchQuery(query: string) {
      this.searchQuery = query
    },
    
    setSearchMode(isSearch: boolean) {
      this.isSearchMode = isSearch
      if (!isSearch) {
        this.searchQuery = ''
      }
    }
  }
})