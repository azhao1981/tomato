import localforage from 'localforage'

interface TimerSettings {
  pomodoroTime: number
  shortBreakTime: number
  longBreakTime: number
}

interface Task {
  id?: string
  name?: string
  title: string
  completed: boolean
  tomatoCount?: number
  createdAt?: Date | string
  updatedAt?: Date | string
}

// 配置存储实例
const taskStore = localforage.createInstance({
  name: 'tomato-timer',
  storeName: 'tasks'
})

const settingsStore = localforage.createInstance({
  name: 'tomato-timer',
  storeName: 'settings'
})

export const storage = {
  // 任务相关
  async getTasks(): Promise<Task[]> {
    const tasks = await taskStore.getItem('tasks')
    return Array.isArray(tasks) ? tasks : []
  },
  
  async saveTasks(tasks: Task[]): Promise<Task[]> {
    // 创建可序列化的对象副本
    const serializableTasks = tasks.map(task => ({
      id: String(task.id),
      title: String(task.name || task.title),
      completed: Boolean(task.completed),
      tomatoCount: Number(task.tomatoCount || 0),
      createdAt: task.createdAt ? new Date(task.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: task.updatedAt ? new Date(task.updatedAt).toISOString() : new Date().toISOString()
    }))
    return await taskStore.setItem('tasks', serializableTasks)
  },
  
  async addTask(task: Task): Promise<Task[]> {
    const tasks = await this.getTasks()
    const newTask = {
      id: String(task.id || Date.now().toString()),
      title: String(task.name || task.title),
      completed: Boolean(task.completed),
      tomatoCount: Number(task.tomatoCount || 0),
      createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
      updatedAt: task.updatedAt ? new Date(task.updatedAt) : new Date()
    }
    tasks.push(newTask)
    return await this.saveTasks(tasks)
  },
  
  // 设置相关
  async getSettings(): Promise<TimerSettings> {
    const settings = await settingsStore.getItem('settings') as TimerSettings | null
    return settings || {
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15
    }
  },
  
  async saveSettings(settings: TimerSettings): Promise<TimerSettings> {
    // 创建可序列化的对象副本
    const serializableSettings = {
      pomodoroTime: Number(settings.pomodoroTime),
      shortBreakTime: Number(settings.shortBreakTime),
      longBreakTime: Number(settings.longBreakTime)
    }
    return await settingsStore.setItem('settings', serializableSettings)
  }
}