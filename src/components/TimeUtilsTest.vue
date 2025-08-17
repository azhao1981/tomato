<script setup lang="ts">
import { ref, computed } from "vue";
import { 
  formatTime, 
  getDuration, 
  getCurrentTimestamp, 
  formatDateTime, 
  formatDate,
  getDurationBetween 
} from "../utils/timeUtils";

// 测试数据
const testSeconds = ref(125); // 2分5秒
const testMinutes = ref(25);
const startTime = ref(getCurrentTimestamp());
const currentTime = ref(getCurrentTimestamp());

// 计算属性
const formattedTime = computed(() => formatTime(testSeconds.value));
const durationSeconds = computed(() => getDuration(testMinutes.value));
const formattedDateTime = computed(() => formatDateTime(startTime.value));
const formattedDate = computed(() => formatDate(startTime.value));
const elapsedSeconds = computed(() => getDurationBetween(startTime.value, currentTime.value));

// 更新当前时间
setInterval(() => {
  currentTime.value = getCurrentTimestamp();
}, 1000);
</script>

<template>
  <div class="time-utils-test">
    <h3>dayjs 时间处理工具测试</h3>
    
    <div class="test-item">
      <span class="label">格式化时间 (125秒):</span>
      <span class="value">{{ formattedTime }}</span>
    </div>
    
    <div class="test-item">
      <span class="label">分钟转秒数 (25分钟):</span>
      <span class="value">{{ durationSeconds }} 秒</span>
    </div>
    
    <div class="test-item">
      <span class="label">当前日期时间:</span>
      <span class="value">{{ formattedDateTime }}</span>
    </div>
    
    <div class="test-item">
      <span class="label">当前日期:</span>
      <span class="value">{{ formattedDate }}</span>
    </div>
    
    <div class="test-item">
      <span class="label">已运行时间:</span>
      <span class="value">{{ formatTime(elapsedSeconds) }}</span>
    </div>
    
    <div class="test-item">
      <span class="label">当前时间戳:</span>
      <span class="value">{{ currentTime }}</span>
    </div>
  </div>
</template>

<style scoped>
.time-utils-test {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.time-utils-test h3 {
  margin: 0 0 8px 0;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
}

.test-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
}

.test-item:last-child {
  border-bottom: none;
}

.label {
  color: #6b7280;
  font-size: 14px;
}

.value {
  color: #111827;
  font-weight: 500;
  font-size: 14px;
}
</style>