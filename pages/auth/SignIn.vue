<script setup lang="ts">
import * as zod from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import SigninForm from "./components/SigninForm.vue";
definePageMeta({
  middleware: "guest", // 指定要使用的中間件
});
//使用 auth 的 layouts布局
// definePageMeta({
//   layout: "auth",
// });
// // 定義表單驗證 Schema
// const userFormSchema = zod.object({
//   email: zod.string().email({ message: "請輸入有效的電子郵件地址" }),
//   password: zod
//     .string()
//     .min(6, { message: "至少需要 6 個字元且含一個英文字母" })
//     .regex(/[A-Za-z]/, { message: "必須包含至少一個英文字母" }),
// });

// // 使用 vee-validate 初始化表單
// const { handleSubmit, resetForm } = useForm({
//   validationSchema: toTypedSchema(userFormSchema),
//   initialValues: {
//     email: "",
//     password: "",
//   },
// });
// const { value: email, errorMessage: emailError } = useField("email");
// const { value: password, errorMessage: passwordError } = useField("password");

// // 處理表單提交
// const onSubmit = handleSubmit(
//   (values) => {
//     console.log("表單提交成功");
//     console.log("初始化前", values, "信箱:", email.value, "密碼", password.value);
//     resetForm(); // 初始化表單
//     console.log("初始化後", values, "信箱:", email.value, "密碼", password.value);
//   },
//   (errors) => {
//     console.log("表單驗證失敗");
//     console.log(emailError);
//     console.log(errors);
//   }
// );
</script>
<template>
  <main class="bg-black h-screen">
    <div class="flex items-center h-full gap-x-11">
      <div class="hidden flex-1 h-full xl:flex xl:items-stretch">
        <img class="w-full" src="@/assets/images/desktop/login-hero.png" alt="登入大圖" />
      </div>
      <div class="container h-full flex-1 flex flex-col items-center justify-center gap-y-10">
        <div class="w-full flex flex-col justify-start items-center gap-y-2 sm:w-2/3 4xl:w-1/2">
          <h2 class="w-full font-bold text-start text-primary-base">享樂酒店，誠摯歡迎</h2>
          <p class="w-full text-3xl text-start font-bold text-white sm:text-4xl md:text-5xl">立即開始旅程</p>
        </div>

        <SigninForm />
        <!-- <form @submit="onSubmit" class="w-full flex flex-col items-center text-white sm:w-2/3 4xl:w-1/2">
          <div class="relative w-full pb-6 flex flex-col gap-y-2">
            <label class="font-bold">電子信箱</label>
            <input name="email" type="email" v-model="email" class="p-4 text-black font-bold rounded-lg" />
            <Transition name="error-mes-anime">
              <span v-if="emailError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base">{{ emailError }}</span>
            </Transition>
          </div>
          <div class="relative w-full pb-6 flex flex-col gap-y-2">
            <label class="font-bold">密碼</label>
            <input name="password" v-model="password" class="p-4 text-black font-bold rounded-lg" />
            <Transition name="error-mes-anime">
              <span v-if="passwordError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base">{{ passwordError }}</span>
            </Transition>
          </div>
          <div class="py-4 w-full flex justify-between items-center font-medium">
            <div class="flex items-end gap-2 text-neutral-0">
              <input id="remember" type="checkbox" class="remember-checkbox" />
              <label for="remember" class="font-bold cursor-pointer">記住帳號</label>
            </div>
            <NuxtLink to="/" class="text-primary-base font-bold">忘記密碼?</NuxtLink>
          </div>
          <div class="w-full mt-6">
            <button type="submit" class="w-full py-4 bg-primary-base font-bold rounded-lg">會員登入</button>
          </div>
        </form> -->

        <div class="w-full flex justify-start items-center gap-x-2 font-medium sm:w-2/3 4xl:w-1/2">
          <p class="text-white">沒有會員嗎?</p>
          <NuxtLink to="/auth/signup" class="font-bold text-primary-base">前往註冊</NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.remember-checkbox {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  appearance: none;
  background-color: white;
  border-radius: 4px;
  &:checked {
    background-color: $primary-100;
    border-color: $primary-100;
    &::after {
      content: "";
      position: absolute;
      left: 8px;
      top: 4px;
      height: 14px;
      width: 8px;
      border-right: 2px solid white;
      border-bottom: 2px solid white;
      transform: rotate(45deg);
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(191, 157, 125, 0.2); // #BF9D7D with opacity
  }
}
.error-mes-anime-enter-active,
.error-mes-anime-leave-active {
  transition: opacity 0.2s ease;
}

.error-mes-anime-enter-from,
.error-mes-anime-leave-to {
  opacity: 0;
}
</style>
