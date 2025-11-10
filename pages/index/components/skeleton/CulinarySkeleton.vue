<script setup lang="ts">
const { skeletonCount = 1 } = defineProps<{
  skeletonCount?: number;
}>();
</script>
<template>
  <!-- 內容區塊 -->
  <div class="p-4 flex flex-col gap-y-4 w-full backdrop-blur-sm md:p-6 md:gap-y-6" v-for="n in skeletonCount" :key="n">
    <!-- 圖片骨架 -->
    <div class="w-full min-h-[300px] max-h-[400px] bg-primary-base/20 animate-pulse"></div>
    <!-- 標題和時間骨架 -->
    <div class="font-bold flex items-center justify-between gap-x-2">
      <div class="h-8 bg-primary-base/30 rounded w-1/2 animate-pulse"></div>
      <div class="flex items-center gap-x-2 md:gap-x-4">
        <div class="h-6 bg-primary-base/30 rounded w-16 animate-pulse"></div>
        <div class="h-6 bg-primary-base/30 rounded w-16 animate-pulse"></div>
      </div>
    </div>

    <!-- 描述骨架 -->
    <div>
      <div class="h-4 bg-primary-base/30 rounded w-full animate-pulse mb-2"></div>
      <div class="h-4 bg-primary-base/30 rounded w-3/4 animate-pulse"></div>
    </div>
  </div>
</template>
<style scoped></style>
