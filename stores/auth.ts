import type { AuthUser } from "~/types/auth";
export const useAuthStore = defineStore("authStore", () => {
  const config = useRuntimeConfig();
  // 定義 state
  const authData = ref<AuthUser | null>(null);


  // 定義 getter
  const isAuthenticated = computed(() => {
    const authCookie = useCookie(config.public.cookieName);
    // 如果 token 存在，回傳 true（已登入）,不存在（null 或 undefined），回傳 false（未登入）
    if (authCookie.value) {
      return true;  // 已登入
    } else {
      return false; // 未登入
    }
  });

  return {
    authData,
    isAuthenticated
  };
});