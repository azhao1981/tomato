<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconTest from '../components/IconTest.vue'
import TimeUtilsTest from '../components/TimeUtilsTest.vue'
import StorageTest from '../components/StorageTest.vue'
import TimerSettings from '../components/TimerSettings.vue'
import { ArrowLeft } from 'lucide-vue-next'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">开发测试页面</h1>
      <button 
        @click="goHome"
        class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <ArrowLeft :size="16" />
        <span>返回主页</span>
      </button>
    </div>
    
    <div class="space-y-8">
      <section>
        <h2 class="text-lg font-semibold mb-3">图标测试</h2>
        <IconTest />
      </section>
      
      <section>
        <h2 class="text-lg font-semibold mb-3">时间工具测试</h2>
        <TimeUtilsTest />
      </section>
      
      <section>
        <h2 class="text-lg font-semibold mb-3">存储服务测试</h2>
        <StorageTest />
      </section>
      
      <section>
        <h2 class="text-lg font-semibold mb-3">计时器设置测试</h2>
        <TimerSettings />
      </section>
    </div>
  </div>
</template>