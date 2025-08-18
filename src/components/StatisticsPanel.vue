<script setup lang="ts">
import { ref, computed } from 'vue'

// 模拟统计数据，实际项目中应该从 store 或 API 获取
const stats = ref({
  todayTomato: 8,
  incompleteTasks: 3,
  weeklyProgress: '40/50'
})

// 计算本周进度百分比
const weeklyProgressPercentage = computed(() => {
  const [completed, total] = stats.value.weeklyProgress.split('/').map(Number)
  return Math.round((completed / total) * 100)
})

// 处理统计项点击
function handleStatClick(statType: string) {
  console.log(`统计项被点击: ${statType}`)
  // 这里可以添加过滤逻辑，比如过滤任务列表
}
</script>

<template>
  <div class="stats-card rounded-xl p-4 shadow-lg mt-4">
    <div class="grid grid-cols-3 gap-4 text-center">
      <div 
        class="stat-item cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
        @click="handleStatClick('today-tomato')"
      >
        <div class="text-2xl font-bold text-purple-600">{{ stats.todayTomato }}</div>
        <div class="text-xs text-gray-600">今日番茄</div>
      </div>
      <div 
        class="stat-item cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
        @click="handleStatClick('incomplete-tasks')"
      >
        <div class="text-2xl font-bold text-blue-600">{{ stats.incompleteTasks }}</div>
        <div class="text-xs text-gray-600">未完成任务</div>
      </div>
      <div 
        class="stat-item cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
        @click="handleStatClick('weekly-progress')"
      >
        <div class="text-2xl font-bold text-green-600">{{ stats.weeklyProgress }}</div>
        <div class="text-xs text-gray-600">本周进度</div>
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