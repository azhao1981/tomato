<script setup lang="ts">
import { computed } from 'vue'
import { useStatisticsStore } from '../stores/statisticsStore'
import { useTaskStore } from '../stores/taskStore'

const statisticsStore = useStatisticsStore()
const taskStore = useTaskStore()

// 获取统计数据
const todayStats = computed(() => statisticsStore.todayStats)
const thisWeekStats = computed(() => statisticsStore.thisWeekStats)
const incompleteTasksCount = computed(() => taskStore.incompleteTasksCount)

// 处理统计项点击
function handleStatClick(statType: string) {
  console.log(`统计项被点击: ${statType}`)
  // 这里可以添加过滤逻辑，比如过滤任务列表
  
  // 触发自定义事件，让父组件处理
  const event = new CustomEvent('stat-click', { 
    detail: { type: statType },
    bubbles: true
  })
  document.dispatchEvent(event)
}
</script>

<template>
  <div class="stats-card rounded-xl p-4 shadow-lg mt-4">
    <div class="grid grid-cols-3 gap-4 text-center">
      <div 
        class="stat-item cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
        @click="handleStatClick('today-tomato')"
      >
        <div class="text-2xl font-bold text-purple-600">{{ todayStats.tomatoCount }}</div>
        <div class="text-xs text-gray-600">今日番茄</div>
      </div>
      <div 
        class="stat-item cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
        @click="handleStatClick('incomplete-tasks')"
      >
        <div class="text-2xl font-bold text-blue-600">{{ incompleteTasksCount }}</div>
        <div class="text-xs text-gray-600">未完成任务</div>
      </div>
      <div 
        class="stat-item cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
        @click="handleStatClick('weekly-tomato')"
      >
        <div class="text-2xl font-bold text-green-600">{{ thisWeekStats.tomatoCount }}</div>
        <div class="text-xs text-gray-600">本周番茄</div>
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

.stat-item {
  transition: all 0.2s ease;
}

.stat-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>