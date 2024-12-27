import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();
  const isAuthenticated = await authStore.checkAuthBoolen();

  // 若已經登入，無法進入，導向會員中心
  if (isAuthenticated) {
    return navigateTo('/user/member');
  }
});