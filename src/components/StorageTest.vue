<template>
  <div class="storage-test">
    <h3>Localforage 本地存储测试</h3>
    
    <div class="test-section">
      <h4>设置测试</h4>
      <div class="form-group">
        <label>番茄时间 (分钟):</label>
        <input v-model.number="testSettings.pomodoroTime" type="number" min="1" max="60">
      </div>
      <div class="form-group">
        <label>短休息时间 (分钟):</label>
        <input v-model.number="testSettings.shortBreakTime" type="number" min="1" max="30">
      </div>
      <div class="form-group">
        <label>长休息时间 (分钟):</label>
        <input v-model.number="testSettings.longBreakTime" type="number" min="1" max="60">
      </div>
      <button @click="saveTestSettings" :disabled="isSaving">
        {{ isSaving ? '保存中...' : '保存设置' }}
      </button>
      <button @click="loadTestSettings" :disabled="isLoading">
        {{ isLoading ? '加载中...' : '加载设置' }}
      </button>
    </div>

    <div class="test-section">
      <h4>任务测试</h4>
      <div class="form-group">
        <input v-model="newTask" placeholder="输入新任务">
        <button @click="addTestTask" :disabled="!newTask.trim()">添加任务</button>
      </div>
      <div class="task-list">
        <div v-for="task in tasks" :key="task.id" class="task-item">
          <span :class="{ completed: task.completed }">{{ task.title }}</span>
          <button @click="toggleTask(task)" size="small">
            {{ task.completed ? '撤销' : '完成' }}
          </button>
          <button @click="deleteTask(task)" size="small">删除</button>
        </div>
      </div>
      <div class="task-actions">
        <button @click="clearAllTasks">清空所有任务</button>
        <button @click="loadTasks">重新加载任务</button>
      </div>
    </div>

    <div class="test-section">
      <h4>存储状态</h4>
      <div class="status-info">
        <p><strong>当前设置:</strong> {{ JSON.stringify(currentSettings, null, 2) }}</p>
        <p><strong>任务数量:</strong> {{ tasks.length }}</p>
        <p><strong>最后操作:</strong> {{ lastOperation }}</p>
      </div>
      <button @click="clearAllData" class="danger-btn">清空所有数据</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { storage } from '../services/storageService'

const testSettings = reactive({
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15
})

const currentSettings = ref<any>(null)
const tasks = ref<any[]>([])
const newTask = ref('')
const isSaving = ref(false)
const isLoading = ref(false)
const lastOperation = ref('')

async function saveTestSettings() {
  try {
    isSaving.value = true
    await storage.saveSettings(testSettings)
    currentSettings.value = testSettings
    lastOperation.value = `保存设置: ${JSON.stringify(testSettings)}`
    console.log('设置保存成功:', testSettings)
  } catch (error) {
    console.error('保存设置失败:', error)
    lastOperation.value = `保存设置失败: ${error}`
  } finally {
    isSaving.value = false
  }
}

async function loadTestSettings() {
  try {
    isLoading.value = true
    const settings = await storage.getSettings()
    currentSettings.value = settings
    testSettings.pomodoroTime = settings.pomodoroTime
    testSettings.shortBreakTime = settings.shortBreakTime
    testSettings.longBreakTime = settings.longBreakTime
    lastOperation.value = `加载设置: ${JSON.stringify(settings)}`
    console.log('设置加载成功:', settings)
  } catch (error) {
    console.error('加载设置失败:', error)
    lastOperation.value = `加载设置失败: ${error}`
  } finally {
    isLoading.value = false
  }
}

async function addTestTask() {
  if (!newTask.value.trim()) return
  
  try {
    const task = {
      id: Date.now().toString(),
      title: newTask.value.trim(),
      completed: false,
      createdAt: new Date()
    }
    
    await storage.addTask(task)
    await loadTasks()
    newTask.value = ''
    lastOperation.value = `添加任务: ${task.title}`
    console.log('任务添加成功:', task)
  } catch (error) {
    console.error('添加任务失败:', error)
    lastOperation.value = `添加任务失败: ${error}`
  }
}

async function loadTasks() {
  try {
    const taskList = await storage.getTasks()
    tasks.value = taskList
    lastOperation.value = `加载任务: ${taskList.length} 个任务`
    console.log('任务加载成功:', taskList)
  } catch (error) {
    console.error('加载任务失败:', error)
    lastOperation.value = `加载任务失败: ${error}`
  }
}

async function toggleTask(task: any) {
  try {
    task.completed = !task.completed
    await storage.saveTasks(tasks.value)
    lastOperation.value = `切换任务状态: ${task.title} -> ${task.completed}`
    console.log('任务状态更新成功:', task)
  } catch (error) {
    console.error('更新任务状态失败:', error)
    lastOperation.value = `更新任务状态失败: ${error}`
  }
}

async function deleteTask(task: any) {
  try {
    tasks.value = tasks.value.filter(t => t.id !== task.id)
    await storage.saveTasks(tasks.value)
    lastOperation.value = `删除任务: ${task.title}`
    console.log('任务删除成功:', task)
  } catch (error) {
    console.error('删除任务失败:', error)
    lastOperation.value = `删除任务失败: ${error}`
  }
}

async function clearAllTasks() {
  try {
    await storage.saveTasks([])
    tasks.value = []
    lastOperation.value = '清空所有任务'
    console.log('所有任务已清空')
  } catch (error) {
    console.error('清空任务失败:', error)
    lastOperation.value = `清空任务失败: ${error}`
  }
}

async function clearAllData() {
  if (confirm('确定要清空所有本地存储数据吗？此操作不可恢复！')) {
    try {
      await storage.saveSettings({
        pomodoroTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15
      })
      await storage.saveTasks([])
      currentSettings.value = null
      tasks.value = []
      testSettings.pomodoroTime = 25
      testSettings.shortBreakTime = 5
      testSettings.longBreakTime = 15
      lastOperation.value = '清空所有数据'
      console.log('所有数据已清空')
    } catch (error) {
      console.error('清空数据失败:', error)
      lastOperation.value = `清空数据失败: ${error}`
    }
  }
}

onMounted(async () => {
  await loadTestSettings()
  await loadTasks()
})
</script>

<style scoped>
.storage-test {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #e9ecef;
}

.test-section {
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.form-group {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-group label {
  min-width: 120px;
  font-weight: 500;
}

.form-group input {
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 100px;
}

button {
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #0056b3;
}

button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

button[size="small"] {
  padding: 4px 8px;
  font-size: 12px;
  margin: 0 2px;
}

.danger-btn {
  background: #dc3545;
}

.danger-btn:hover {
  background: #c82333;
}

.task-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #e9ecef;
}

.task-item:last-child {
  border-bottom: none;
}

.task-item .completed {
  text-decoration: line-through;
  color: #6c757d;
}

.task-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.status-info {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  margin: 10px 0;
}

.status-info p {
  margin: 5px 0;
  font-family: monospace;
  font-size: 12px;
}
</style>