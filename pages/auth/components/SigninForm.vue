<script setup lang="ts">
import { useSignInForm } from "~/composables/signInForm";
const { errors, email, password, submitSigninForm } = useSignInForm();
const isLoading = ref<boolean>(false);
const router = useRouter();
const handleSignin = async (): Promise<void> => {
  isLoading.value = true;
  try {
    await submitSigninForm();
    router.push("/");
  } catch (error) {
    console.log(error);
    const errorMessage = (error as Error).message;
    const { $swal } = useNuxtApp();
    $swal.fire({
      position: "center",
      icon: "error",
      title: "登入失敗",
      text: errorMessage,
      showConfirmButton: false,
      timer: 1500,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <form class="w-full flex flex-col items-center text-white sm:w-2/3 4xl:w-1/2">
    <div class="relative w-full pb-6 flex flex-col gap-y-2">
      <label class="font-bold">電子信箱</label>
      <input name="email" type="email" v-model="email" class="p-4 text-black font-bold rounded-lg" :disabled="isLoading" />
      <Transition name="error-mes-anime">
        <span v-if="errors.email !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base">{{ errors.email }}</span>
      </Transition>
    </div>
    <div class="relative w-full pb-6 flex flex-col gap-y-2">
      <label class="font-bold">密碼</label>
      <input name="password" type="password" v-model="password" class="p-4 text-black font-bold rounded-lg" :disabled="isLoading" />
      <Transition name="error-mes-anime">
        <span v-if="errors.password !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base">{{ errors.password }}</span>
      </Transition>
    </div>
    <div class="py-4 w-full flex justify-between items-center font-medium">
      <div class="flex items-end gap-2 text-neutral-0">
        <input id="remember" type="checkbox" class="remember-checkbox" :disabled="isLoading" />
        <label for="remember" class="font-bold cursor-pointer">記住帳號</label>
      </div>
      <NuxtLink to="/" class="text-primary-base font-bold">忘記密碼?</NuxtLink>
    </div>
    <div class="w-full mt-6">
      <button class="w-full py-4 bg-primary-base font-bold rounded-lg" @click.prevent="handleSignin">
        <p class="relative w-fit mx-auto">
          會員登入
          <span v-show="isLoading" class="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 flex items-center justify-center">
            <Icon name="svg-spinners:270-ring-with-bg" />
          </span>
        </p>
      </button>
    </div>
  </form>
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
