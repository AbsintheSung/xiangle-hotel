import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { userFormSchema } from "~/pages/auth/schemas/useSigninForm";
import type { UserFormSchema } from "~/pages/auth/schemas/useSigninForm";

type SignInErrorResponse = {
  status: boolean;
  message: string;
};

type SignInError = {
  response?: {
    _data?: SignInErrorResponse;
    status?: number;
  };
  message?: string;
};
type SignInResponse = {
  status: boolean;
  token: string;
  message?: string;
}


export const useSignInForm = () => {
  const authStore = useAuthStore()
  const config = useRuntimeConfig();
  const router = useRouter();
  // const { $swal } = useNuxtApp();
  const validationSchema = toTypedSchema(userFormSchema);
  const initialValues: UserFormSchema = {
    email: "",
    password: "",
  }

  const { handleSubmit, resetForm, errors } = useForm({
    validationSchema,
    initialValues
  });

  const email = useField<string>('email')
  const password = useField<string>('password')

  const submitSigninForm = handleSubmit(
    async (values) => {
      try {
        const response = await $fetch<SignInResponse>(`${config.public.apiBase}/api/v1/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            email: values.email,
            password: values.password,
          },
          onResponse({ request, response, options }) {
            const signInResposne = response._data;
            const authCookie = useCookie(config.public.cookieAuth, { path: "/" })
            const userCookie = useCookie(config.public.cookieUser, { path: "/" })
            authCookie.value = signInResposne.token
            userCookie.value = signInResposne.result
            // authStore.authData = { ...signInResposne.result, address: { ...signInResposne.result.address } }
          }
        });
        if (response.status) {
          authStore.setUserData()
          resetForm(); // 初始化表單
          router.push('/')
        }
      } catch (error) {
        const signInError = error as SignInError;
        throw new Error(
          signInError.response?._data?.message
        );
        // $swal.fire({
        //   position: "center",
        //   icon: 'error',
        //   title: '登入失敗',
        //   text: signInError.response?._data?.message,
        //   showConfirmButton: false,
        //   timer: 1500
        // });
      }
    },
    (errors) => {
      console.log("表單驗證失敗", errors);
    }
  );
  return {
    //state
    errors: computed(() => errors.value),

    //field:
    email: email.value,
    password: password.value,

    //methods:
    submitSigninForm
  }
}

export type UseSignInForm = typeof useSignInForm