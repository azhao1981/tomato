import { defineStore } from 'pinia'
import { storage } from '../services/storageService'

interface Task {
  id: string
  name: string
  completed: boolean
  tomatoCount: number
}

interface TaskState {
  tasks: Task[]
  currentTaskId: string | null
}

export const useTaskStore = defineStore('tasks', {
  state: (): TaskState => ({
    tasks: [
      { id: '1', name: '完成项目文档', completed: false, tomatoCount: 2 },
      { id: '2', name: '学习新技术', completed: false, tomatoCount: 3 },
      { id: '3', name: '回复邮件', completed: false, tomatoCount: 1 },
      { id: '4', name: '代码审查', completed: true, tomatoCount: 1 }
    ],
    currentTaskId: null
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
    }
  },
  actions: {
    async loadTasks() {
      try {
        const tasks = await storage.getTasks()
        if (tasks && tasks.length > 0) {
          this.tasks = tasks
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
        tomatoCount: 1
      }
      this.tasks.push(newTask)
      this.saveTasks()
    },
    
    toggleTask(taskId: string) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
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
        this.saveTasks()
      }
    },
    
    clearCompleted() {
      this.tasks = this.tasks.filter(task => !task.completed)
      if (this.currentTaskId && !this.tasks.find(t => t.id === this.currentTaskId)) {
        this.currentTaskId = null
      }
      this.saveTasks()
    }
  }
})