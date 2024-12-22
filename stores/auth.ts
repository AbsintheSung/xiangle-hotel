import type { AuthUser } from "~/types/auth";
type CheckoutErrorResponse = {
  status: boolean;
  token: string;
};

type CheckoutError = {
  response?: {
    _data?: CheckoutErrorResponse;
    status?: number;
  };
  message?: string;
};
type CheckoutResponse = {
  status: boolean;
  token: string;
}
export const useAuthStore = defineStore("authStore", () => {
  const config = useRuntimeConfig();
  // 定義 state
  const authData = ref<AuthUser | null>(null);
  const isAuthenticated = ref<boolean>(false)

  // 定義 getter
  const getIsAuthenticated = computed(() => isAuthenticated.value)

  const getAuthData = computed(() => {
    if (authData.value === null) {
      return null
    } else {
      return {
        ...authData.value,
        address: { ...authData.value?.address }
      }
    }
  })

  // 定義 action
  const setUserData = () => {
    //useCookie 未設置的話為 undefined，使用userCookie.value ? 可以判斷  undefined 跟 null狀態
    const userCookie = useCookie(config.public.cookieUser);
    authData.value = userCookie.value ? (userCookie.value as unknown as AuthUser) : null;
  }

  //檢查是否登入狀態
  const checkAuthStatus = async () => {
    try {
      const response = await $fetch<CheckoutResponse>(`${config.public.apiBase}/api/v1/user/check`, {
        method: "GET",
        headers: {
          Authorization: `${useCookie(config.public.cookieAuth).value}`,
        },
      });
      if (response.status) {
        isAuthenticated.value = true
      }
    } catch (error) {
      const errorMes = error as CheckoutError
      if (!errorMes.response?.status) {
        const authCookie = useCookie(config.public.cookieAuth, { path: "/" })
        const userCookie = useCookie(config.public.cookieUser, { path: "/" })
        authCookie.value = null
        userCookie.value = null
        isAuthenticated.value = false
      }
    }
  };


  return {
    authData,
    getIsAuthenticated,
    getAuthData,
    setUserData,
    checkAuthStatus
  };
});