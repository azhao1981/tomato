<script setup lang="ts">
import { Play, Pause, RotateCcw, Clock, Coffee } from "lucide-vue-next";
</script>

<template>
  <div class="icon-test">
    <Play :size="24" color="#22c55e" />
    <Pause :size="24" color="#f59e0b" />
    <RotateCcw :size="24" color="#ef4444" />
    <Clock :size="24" color="#3b82f6" />
    <Coffee :size="24" color="#8b5cf6" />
  </div>
</template>

<style scoped>
.icon-test {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 20px 0;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>