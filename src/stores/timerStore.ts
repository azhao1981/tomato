import { defineStore } from 'pinia'

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
      const minutes = Math.floor(state.currentTime / 60)
      const seconds = state.currentTime % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    progressPercentage: (state) => {
      const totalTime = state.settings[state.mode + 'Time'] * 60
      return ((totalTime - state.currentTime) / totalTime) * 100
    }
  },
  actions: {
    startTimer() {
      this.isRunning = true
    },
    pauseTimer() {
      this.isRunning = false
    },
    resetTimer() {
      this.isRunning = false
      this.currentTime = this.settings[this.mode + 'Time'] * 60
    },
    setMode(mode: 'pomodoro' | 'shortBreak' | 'longBreak') {
      this.mode = mode
      this.resetTimer()
    },
    updateSettings(newSettings: Partial<TimerSettings>) {
      this.settings = { ...this.settings, ...newSettings }
      this.resetTimer()
    },
    decrementTime() {
      if (this.currentTime > 0) {
        this.currentTime--
      } else {
        this.pauseTimer()
        this.resetTimer()
      }
    }
  }
})