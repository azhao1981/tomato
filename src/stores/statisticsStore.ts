import { defineStore } from 'pinia'
import { storage } from '../services/storageService'

interface DailyStats {
  date: string        // YYYY-MM-DD
  tomatoCount: number
}

interface WeeklyStats {
  week: string        // YYYY-WW
  tomatoCount: number
}

interface StatisticsState {
  dailyStats: DailyStats[]
  weeklyStats: WeeklyStats[]
}

export const useStatisticsStore = defineStore('statistics', {
  state: (): StatisticsState => ({
    dailyStats: [],
    weeklyStats: []
  }),

  getters: {
    // 获取今日统计
    todayStats: (state) => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const today = `${year}-${month}-${day}`
      return state.dailyStats.find(stat => stat.date === today) || { date: today, tomatoCount: 0 }
    },

    // 获取本周统计
    thisWeekStats: (state) => {
      const now = new Date()
      const year = now.getFullYear()
      const weekNumber = getWeekNumber(now)
      const weekKey = `${year}-${weekNumber.toString().padStart(2, '0')}`
      return state.weeklyStats.find(stat => stat.week === weekKey) || { week: weekKey, tomatoCount: 0 }
    },

    // 获取最近7天的统计
    last7DaysStats: (state) => {
      const dates = []
      const today = new Date()
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const dateStr = `${year}-${month}-${day}`
        dates.push(dateStr)
      }
      
      return dates.map(date => {
        const stat = state.dailyStats.find(s => s.date === date)
        return {
          date,
          tomatoCount: stat ? stat.tomatoCount : 0
        }
      })
    },

    // 获取最近4周的统计
    last4WeeksStats: (state) => {
      const weeks = []
      const today = new Date()
      
      for (let i = 3; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - (i * 7))
        const year = date.getFullYear()
        const weekNumber = getWeekNumber(date)
        const weekKey = `${year}-${weekNumber.toString().padStart(2, '0')}`
        weeks.push(weekKey)
      }
      
      return weeks.map(week => {
        const stat = state.weeklyStats.find(s => s.week === week)
        return {
          week,
          tomatoCount: stat ? stat.tomatoCount : 0
        }
      })
    }
  },

  actions: {
    // 加载统计数据
    async loadStatistics() {
      try {
        const stats = await storage.getStatistics()
        if (stats) {
          this.dailyStats = stats.dailyStats || []
          this.weeklyStats = stats.weeklyStats || []
        }
      } catch (error) {
        console.error('加载统计数据失败:', error)
      }
    },

    // 保存统计数据
    async saveStatistics() {
      try {
        await storage.saveStatistics({
          dailyStats: this.dailyStats,
          weeklyStats: this.weeklyStats
        })
      } catch (error) {
        console.error('保存统计数据失败:', error)
      }
    },

    // 完成一个番茄时钟时调用
    async completeTomato() {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const today = `${year}-${month}-${day}`
      
      const weekNumber = getWeekNumber(now)
      const weekKey = `${year}-${weekNumber.toString().padStart(2, '0')}`

      // 更新日统计
      const dailyIndex = this.dailyStats.findIndex(stat => stat.date === today)
      if (dailyIndex >= 0) {
        this.dailyStats[dailyIndex].tomatoCount++
      } else {
        this.dailyStats.push({ date: today, tomatoCount: 1 })
      }

      // 更新周统计
      const weeklyIndex = this.weeklyStats.findIndex(stat => stat.week === weekKey)
      if (weeklyIndex >= 0) {
        this.weeklyStats[weeklyIndex].tomatoCount++
      } else {
        this.weeklyStats.push({ week: weekKey, tomatoCount: 1 })
      }

      await this.saveStatistics()
    },

    // 清除统计数据
    async clearStatistics() {
      this.dailyStats = []
      this.weeklyStats = []
      await this.saveStatistics()
    }
  }
})

// 获取周数的辅助函数
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}