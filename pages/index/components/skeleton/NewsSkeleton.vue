<script setup lang="ts">
const { skeletonCount = 1 } = defineProps<{
  skeletonCount?: number;
}>();
</script>
<template>
  <div class="md:w-5/6">
    <ul class="flex flex-col gap-y-10">
      <li class="flex flex-col items-center gap-6 sm:flex-row" v-for="n in skeletonCount" :key="n">
        <!-- 圖片骨架 -->
        <div class="w-full sm:w-2/5 flex-shrink-0 sm:self-stretch">
          <div class="w-full h-[200px] sm:h-[294px] bg-primary-base/30 animate-pulse rounded-xl"></div>
        </div>

        <!-- 內容骨架 -->
        <div class="flex flex-col gap-y-6 w-full">
          <!-- 標題骨架 -->
          <div class="h-8 md:h-9 bg-primary-base/30 rounded w-3/4 animate-pulse"></div>

          <!-- 描述骨架 -->
          <div class="space-y-2">
            <div class="h-5 bg-primary-base/30 rounded w-full animate-pulse"></div>
            <div class="h-5 bg-primary-base/30 rounded w-5/6 animate-pulse"></div>
            <div class="h-5 bg-primary-base/30 rounded w-4/5 animate-pulse"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped></style>
