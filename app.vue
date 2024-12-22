<script setup lang="ts">
import "virtual:svg-icons-register";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
const authStore = useAuthStore();
onMounted(async () => {
  await authStore.checkAuthStatus();
  console.log(authStore.getIsAuthenticated);
});
</script>
<template>
  <!-- <NuxtPage /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style></style>
