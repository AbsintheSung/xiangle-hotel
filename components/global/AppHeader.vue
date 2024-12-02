<script setup lang="ts">
const windowScroll = useWindowScroll();
const headerY = ref(windowScroll.y);
const isScrolled = ref(false);
const isOpenMenu = ref(false);
const handleMenu = () => {
  isOpenMenu.value = true;
};
const handleCloseMenu = () => {
  isOpenMenu.value = false;
};
onMounted(() => {
  watch(
    () => headerY.value,
    (newHeaderY) => {
      newHeaderY > 0 ? (isScrolled.value = true) : (isScrolled.value = false);
    },
    { immediate: true }
  );
});
</script>
<template>
  <header class="w-full fixed z-30 transition-all duration-300 ease-in-out" :class="{ 'bg-black': isScrolled }">
    <div class="px-3 py-6 flex items-center justify-between md:px-20">
      <h1>
        <RouterLink to="/">
          <TheSvgIcon class="w-[196px] h-[72px]" name="logo-white"></TheSvgIcon>
        </RouterLink>
      </h1>
      <ul class="hidden items-center gap-x-4 font-bold text-white md:flex">
        <li>
          <RouterLink class="block p-4" to="/">客房旅宿</RouterLink>
        </li>
        <li>
          <RouterLink class="block p-4" to="/">會員登入</RouterLink>
        </li>
        <li class="bg-primary-base rounded-xl">
          <RouterLink class="block py-4 px-8" to="/">立即訂房</RouterLink>
        </li>
      </ul>
      <div class="md:hidden">
        <button>
          <Icon class="text-white text-3xl" name="gridicons:menu" @click="handleMenu"></Icon>
        </button>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="isOpenMenu" class="p-5 fixed inset-0 w-full h-full z-50 bg-black flex flex-col items-center justify-center">
        <div class="absolute top-5 right-5">
          <button @click="handleCloseMenu">
            <Icon class="text-white text-3xl" name="gridicons:cross"></Icon>
          </button>
        </div>
        <div class="w-full">
          <ul class="flex flex-col items-center gap-y-4 font-bold text-white">
            <li class="w-full text-center">
              <RouterLink class="block p-4 w-full" to="/">客房旅宿</RouterLink>
            </li>
            <li class="w-full text-center">
              <RouterLink class="block p-4 w-full" to="/">會員登入</RouterLink>
            </li>
            <li class="w-full text-center bg-primary-base rounded-xl">
              <RouterLink class="block p-4 w-full" to="/">立即訂房</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </header>
</template>
<style scoped lang="scss"></style>
