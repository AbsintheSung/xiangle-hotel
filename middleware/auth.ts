// middleware/auth.ts
import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();
  const isAuthenticated = await authStore.checkAuthBoolen();
  // 驗證是否有權限訪問
  if (!isAuthenticated) {
    // 如果沒有權限，導向登入頁面
    return navigateTo("/auth/signin");
  }
});