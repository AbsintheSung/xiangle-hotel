<script setup lang="ts"></script>
<template>
  <main class="bg-black h-screen">
    <div class="flex items-center h-full gap-x-11">
      <div class="hidden flex-1 h-full xl:flex xl:items-stretch">
        <img class="w-full" src="@/assets/images/desktop/login-hero.png" alt="登入大圖" />
      </div>
      <div class="container h-full flex-1 flex flex-col items-center justify-center gap-y-10">
        <div class="w-full flex flex-col justify-start items-center gap-y-2 sm:w-1/2">
          <h2 class="w-full font-bold text-start text-primary-base">享樂酒店，誠摯歡迎</h2>
          <p class="w-full text-3xl text-start font-bold text-white sm:text-4xl md:text-5xl">立即開始旅程</p>
        </div>

        <form class="w-full flex flex-col items-center gap-y-4 text-white sm:w-1/2">
          <div class="w-full flex flex-col gap-y-2">
            <label>電子信箱</label>
            <input class="p-4 text-black rounded-lg" />
          </div>
          <div class="w-full flex flex-col gap-y-2">
            <label>密碼</label>
            <input class="p-4 text-black rounded-lg" />
          </div>
          <div class="w-full flex justify-between items-center font-medium">
            <div class="flex items-end gap-2 text-neutral-0">
              <input id="remember" type="checkbox" class="remember-checkbox" />
              <label for="remember" class="font-bold cursor-pointer">記住帳號</label>
            </div>
            <NuxtLink to="/" class="text-primary-base font-bold">忘記密碼?</NuxtLink>
          </div>
          <div class="w-full mt-6">
            <button class="w-full py-4 bg-primary-base rounded-lg">會員登入</button>
          </div>
        </form>

        <div class="w-full flex justify-start items-center gap-x-2 font-medium sm:w-1/2">
          <p class="text-white">沒有會員嗎?</p>
          <NuxtLink to="/" class="text-primary-base">前往註冊</NuxtLink>
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
</style>
