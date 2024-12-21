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

export const useSignInForm = () => {
  const config = useRuntimeConfig();
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
        await $fetch(`${config.public.apiBase}/api/v1/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            email: values.email,
            password: values.password,
          },
          onResponse({ request, response, options }) {
            const message = response._data;
            const authCookie = useCookie(config.public.cookieName, { path: "/" })
            authCookie.value = message.token
          }
        });
        console.log('登入成功')
        resetForm(); // 初始化表單

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