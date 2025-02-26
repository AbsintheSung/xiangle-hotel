<script setup lang="ts">
import "virtual:svg-icons-register";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
const authStore = useAuthStore();
const config = useRuntimeConfig();
type CheckoutResponse = {
  status: boolean;
  token: string;
};
const { data: checkoutData } = await useFetch<CheckoutResponse>(`${config.public.apiBase}/api/v1/user/check`, {
  method: "GET",
  headers: {
    Authorization: `${useCookie(config.public.cookieAuth).value}`,
  },
});

if (checkoutData.value?.status) {
  authStore.setUserData();
}
</script>
<template>
  <!-- <NuxtPage /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style></style>
