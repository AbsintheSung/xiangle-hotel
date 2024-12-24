import type { AuthUser } from "~/types/auth";
import type { PutMemberInfoResponse } from "~/types/user";
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
    setTrueIsAuthenticated()
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
        // const userCookie = useCookie(config.public.cookieUser);
        // authData.value = userCookie.value ? (userCookie.value as unknown as AuthUser) : null;
        // isAuthenticated.value = true
        setUserData()
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

  //檢查是否登入狀態 - 回傳布林值
  const checkAuthBoolen = async () => {
    try {
      const response = await $fetch<CheckoutResponse>(`${config.public.apiBase}/api/v1/user/check`, {
        method: "GET",
        headers: {
          Authorization: `${useCookie(config.public.cookieAuth).value}`,
        },
      });
      if (response.status) {
        return response.status
      }
    } catch (error) {
      const errorMes = error as CheckoutError
      return errorMes.response?._data?.status
    }
  }

  //取得使用者資訊
  const fetchUserData = async () => {
    try {
      const response = await $fetch<PutMemberInfoResponse>(`${config.public.apiBase}/api/v1/user`, {
        method: "GET",
        headers: {
          Authorization: `${useCookie(config.public.cookieAuth).value}`,
        },
      });
      if (response.status) {
        //後端api回傳有缺少，所以採用登出方式，重新獲取資料( 登入時後回傳的是完整的 )
        //此處移除所有 cookie， user/member/index.vue -> 會進入該頁，觸發middleware
        const authCookie = useCookie(config.public.cookieAuth, { path: "/" })
        const userCookie = useCookie(config.public.cookieUser, { path: "/" })
        authCookie.value = null
        userCookie.value = null
      }
    } catch (error) {

    }
  }

  const setTrueIsAuthenticated = () => {
    isAuthenticated.value = true
  }

  const setFalseIsAuthenticated = () => {
    isAuthenticated.value = false
  }

  return {
    authData,
    getIsAuthenticated,
    getAuthData,
    setUserData,
    checkAuthStatus,
    setTrueIsAuthenticated,
    setFalseIsAuthenticated,
    checkAuthBoolen,
    fetchUserData
  };
});