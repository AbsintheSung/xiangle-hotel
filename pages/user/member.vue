<script setup lang="ts">
useSeoMeta({
  title: `享樂酒店 - 我的帳戶`,
  description: `管理您的帳戶資訊，查看訂單和個人資料。`,
  ogTitle: `享樂酒店 - 我的帳戶`,
  ogDescription: `管理您的帳戶資訊，查看訂單和個人資料。`,
});
definePageMeta({
  middleware: "auth", // 指定要使用的中間件
});
import { useDomStore } from "~/stores/dom";
const authStore = useAuthStore();
const domStore = useDomStore();
const { y: windowScrollY } = useWindowScroll();

const marginTopStyle = computed(() => {
  return windowScrollY.value > 0 ? { marginTop: `${domStore.headerDomHeight}px` } : {};
});
</script>
<template>
  <main class="bg-black" :style="marginTopStyle">
    <section class="py-10 md:py-[120px] bg-user-nav">
      <div class="container">
        <div class="flex flex-col gap-x-6 gap-y-4 md:flex-row md:items-center">
          <img class="w-20 md:w-36" src="/assets/images/desktop/avatar-6.png" />
          <p class="text-white font-bold text-3xl md:text-5xl">Hello，{{ authStore.getAuthData?.name }}</p>
        </div>
      </div>
    </section>
    <section class="py-10 container text-white md:py-20">
      <ul class="font-bold flex items-center gap-x-2">
        <li>
          <NuxtLink to="/user/member">
            <p class="relative p-4">
              個人資料
              <span class="span-active hidden absolute w-1/2 h-1 bg-primary-base rounded-lg bottom-0 left-1/2 -translate-x-1/2"></span>
            </p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="p-4" to="/user/member/history">
            <p class="relative p-4">
              我的訂單
              <span class="span-active hidden absolute w-1/2 h-1 bg-primary-base rounded-lg bottom-0 left-1/2 -translate-x-1/2"></span>
            </p>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <NuxtPage />
    <!-- 這裡渲染子路由的內容 -->
  </main>
</template>
<style scoped lang="scss">
.router-link-exact-active {
  > p {
    > .span-active {
      display: inline-block !important;
    }
  }
}
</style>
