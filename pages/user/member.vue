<script setup lang="ts"></script>
<template>
  <main class="bg-black">
    <div class="py-10 container text-white md:py-20">
      <ul class="flex items-center gap-x-2">
        <li>
          <NuxtLink class="p-4" to="/user/member">個人資料</NuxtLink>
        </li>
        <li>
          <NuxtLink class="p-4" to="/user/member/history">我的訂單</NuxtLink>
        </li>
      </ul>
    </div>

    <NuxtPage />
    <!-- 這裡渲染子路由的內容 -->
  </main>
</template>
<style scoped lang="scss"></style>
