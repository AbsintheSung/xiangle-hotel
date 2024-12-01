import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { userFormSchema } from "~/pages/auth/schemas/useSigninForm";
import type { UserFormSchema } from "~/pages/auth/schemas/useSigninForm";

export const useSignInForm = () => {
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
    (values) => {
      console.log("表單驗證成功", values);
      resetForm(); // 初始化表單
    },
    (errors) => {
      console.log("表單驗證失敗");
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