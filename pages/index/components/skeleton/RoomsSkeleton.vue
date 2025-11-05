<script setup lang="ts">
const { skeletonCount = 1 } = defineProps<{
  skeletonCount?: number;
}>();
</script>
<template>
  <div class="px-3 flex flex-col md:flex-row items-stretch gap-x-20 gap-y-6" v-for="n in skeletonCount" :key="n">
    <!-- 左側圖片骨架 -->
    <div class="room-sweiper w-full lg:w-1/2">
      <div class="w-full h-full min-h-[200px] bg-primary-base/50 animate-pulse rounded"></div>
    </div>

    <!-- 右側內容骨架 -->
    <div class="flex flex-col w-full lg:w-1/3 gap-y-10 mt-auto">
      <!-- 標題和描述骨架 -->
      <div class="flex flex-col gap-y-4">
        <div class="h-12 lg:h-14 bg-primary-base/60 rounded w-3/4 animate-pulse"></div>
        <div class="space-y-2">
          <div class="h-4 bg-primary-base/60 rounded w-full animate-pulse"></div>
          <div class="h-4 bg-primary-base/60 rounded w-5/6 animate-pulse"></div>
          <div class="h-4 bg-primary-base/60 rounded w-4/5 animate-pulse"></div>
        </div>
      </div>

      <!-- 價格骨架 -->
      <div class="h-9 bg-primary-base/60 rounded w-1/3 animate-pulse"></div>

      <!-- 按鈕骨架 -->
      <div class="w-full h-[80px] lg:h-[120px] bg-primary-base/50 rounded-md animate-pulse"></div>

      <!-- 控制按鈕骨架 -->
      <div class="flex items-center justify-end gap-x-2">
        <div class="w-12 h-12 bg-primary-base/60 rounded animate-pulse"></div>
        <div class="w-12 h-12 bg-primary-base/60 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
