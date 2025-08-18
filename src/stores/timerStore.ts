import { defineStore } from 'pinia'
import { storage } from '../services/storageService'
import { formatTime } from '../utils/timeUtils'

// 创建事件发射器
const createEventEmitter = () => {
  const listeners: Record<string, Function[]> = {}
  return {
    on(event: string, callback: Function) {
      if (!listeners[event]) listeners[event] = []
      listeners[event].push(callback)
    },
    emit(event: string, data?: any) {
      if (listeners[event]) {
        listeners[event].forEach(callback => callback(data))
      }
    }
  }
}

export const timerEvents = createEventEmitter()

interface TimerSettings {
  pomodoroTime: number
  shortBreakTime: number
  longBreakTime: number
}

interface TimerState {
  currentTime: number
  isRunning: boolean
  mode: 'pomodoro' | 'shortBreak' | 'longBreak'
  settings: TimerSettings
}

export const useTimerStore = defineStore('timer', {
  state: (): TimerState => ({
    currentTime: 25 * 60, // 25分钟，以秒为单位
    isRunning: false,
    mode: 'pomodoro', // pomodoro, shortBreak, longBreak
    settings: {
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15
    }
  }),
  getters: {
    formattedTime: (state) => {
      return formatTime(state.currentTime)
    },
    progressPercentage: (state) => {
      const totalTime = state.settings[state.mode === 'pomodoro' ? 'pomodoroTime' : state.mode === 'shortBreak' ? 'shortBreakTime' : 'longBreakTime'] * 60
      return ((totalTime - state.currentTime) / totalTime) * 100
    },
    remainingTime: (state) => {
      return state.currentTime
    },
    duration: (state) => {
      return state.settings[state.mode === 'pomodoro' ? 'pomodoroTime' : state.mode === 'shortBreak' ? 'shortBreakTime' : 'longBreakTime'] * 60
    }
  },
  actions: {
    async loadSettings() {
      try {
        const settings = await storage.getSettings()
        // 确保数据类型正确
        this.settings = {
          pomodoroTime: Number(settings.pomodoroTime) || 25,
          shortBreakTime: Number(settings.shortBreakTime) || 5,
          longBreakTime: Number(settings.longBreakTime) || 15
        }
        this.resetTimer()
      } catch (error) {
        console.error('加载设置失败:', error)
        // 使用默认设置
        this.settings = {
          pomodoroTime: 25,
          shortBreakTime: 5,
          longBreakTime: 15
        }
      }
    },
    
    async saveSettings() {
      try {
        await storage.saveSettings(this.settings)
      } catch (error) {
        console.error('保存设置失败:', error)
      }
    },
    
    startTimer() {
      this.isRunning = true
    },
    pauseTimer() {
      this.isRunning = false
    },
    resetTimer() {
      this.isRunning = false
      this.currentTime = this.settings[this.mode === 'pomodoro' ? 'pomodoroTime' : this.mode === 'shortBreak' ? 'shortBreakTime' : 'longBreakTime'] * 60
    },
    setMode(mode: 'pomodoro' | 'shortBreak' | 'longBreak') {
      this.mode = mode
      this.resetTimer()
    },
    async updateSettings(newSettings: Partial<TimerSettings>) {
      this.settings = { ...this.settings, ...newSettings }
      await this.saveSettings()
      this.resetTimer()
    },
    decrementTime() {
      if (this.currentTime > 0) {
        this.currentTime--
      } else {
        this.pauseTimer()
        // 发射计时完成事件，通知外部清除定时器
        timerEvents.emit('timerCompleted')
        // 如果是番茄模式完成，发射完成事件
        if (this.mode === 'pomodoro') {
          timerEvents.emit('pomodoroCompleted')
        }
        this.resetTimer()
      }
    }
  }
})