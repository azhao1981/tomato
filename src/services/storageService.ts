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

interface Statistics {
  dailyStats: Array<{
    date: string
    tomatoCount: number
  }>
  weeklyStats: Array<{
    week: string
    tomatoCount: number
  }>
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

const statisticsStore = localforage.createInstance({
  name: 'tomato-timer',
  storeName: 'statistics'
})

export const storage = {
  // 当前任务 ID 相关
  async getCurrentTaskId(): Promise<string | null> {
    const currentTaskId = await taskStore.getItem('currentTaskId')
    return currentTaskId || null
  },

  async saveCurrentTaskId(taskId: string | null): Promise<string | null> {
    return await taskStore.setItem('currentTaskId', taskId)
  },

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
  },

  // 统计数据相关
  async getStatistics(): Promise<Statistics | null> {
    const stats = await statisticsStore.getItem('statistics') as Statistics | null
    return stats || {
      dailyStats: [],
      weeklyStats: []
    }
  },

  async saveStatistics(stats: Statistics): Promise<Statistics> {
    // 创建可序列化的对象副本
    const serializableStats = {
      dailyStats: stats.dailyStats.map(stat => ({
        date: String(stat.date),
        tomatoCount: Number(stat.tomatoCount)
      })),
      weeklyStats: stats.weeklyStats.map(stat => ({
        week: String(stat.week),
        tomatoCount: Number(stat.tomatoCount)
      }))
    }
    return await statisticsStore.setItem('statistics', serializableStats)
  }
}