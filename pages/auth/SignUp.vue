<script setup lang="ts"></script>
<template>
  <main class="bg-black h-screen">
    <div class="flex items-center h-full gap-x-11">
      <div class="hidden flex-1 h-full xl:flex xl:items-stretch">
        <img class="w-full" src="@/assets/images/desktop/login-hero.png" alt="登入大圖" />
      </div>
      <div class="px-3 mx-auto h-full flex-1 flex flex-col items-center justify-center gap-y-10">
        <div class="w-full flex flex-col justify-start items-center gap-y-2 sm:w-2/3 lg:w-1/2">
          <h2 class="w-full font-bold text-start text-primary-base">享樂酒店，誠摯歡迎</h2>
          <p class="w-full text-3xl text-start font-bold text-white sm:text-4xl md:text-5xl">立即註冊</p>
        </div>

        <div class="w-full flex justify-between items-center gap-x-2 sm:w-2/3 lg:w-1/2">
          <div class="flex flex-col items-center gap-y-1">
            <div class="w-8 h-8 bg-primary-base rounded-full"></div>
            <p class="font-bold text-white">輸入信箱及密碼</p>
          </div>

          <div class="flex-1 h-[2px] bg-[#ECECEC]"></div>

          <div class="flex flex-col items-center gap-y-1">
            <div class="w-8 h-8 bg-primary-base rounded-full"></div>
            <p class="font-bold text-white">填寫基本資料</p>
          </div>
        </div>

        <!-- <form class="w-full flex flex-col items-center gap-y-4 text-white sm:w-2/3 lg:w-1/2">
          <div class="w-full flex flex-col gap-y-2">
            <label class="font-bold">電子信箱</label>
            <input type="email" class="p-4 text-black font-bold rounded-lg" placeholder="hello@exsample.com" />
          </div>
          <div class="w-full flex flex-col gap-y-2">
            <label class="font-bold">密碼</label>
            <input type="password" class="p-4 text-black font-bold rounded-lg" placeholder="請輸入密碼" />
          </div>
          <div class="w-full flex flex-col gap-y-2">
            <label class="font-bold">確認密碼</label>
            <inputtype="password" class="p-4 text-black font-bold rounded-lg" placeholder="請再輸入同一次密碼" />
          </div>
          <div class="w-full mt-6">
            <button class="w-full py-4 bg-primary-base font-bold rounded-lg">下一步</button>
          </div>
        </form> -->

        <form class="w-full flex flex-col items-center gap-y-4 text-white sm:w-2/3 lg:w-1/2">
          <div class="w-full flex flex-col gap-y-2">
            <label class="font-bold">姓名</label>
            <input type="text" class="p-4 text-black font-bold rounded-lg" placeholder="請輸入姓名" />
          </div>
          <div class="w-full flex flex-col gap-y-2">
            <label class="font-bold">手機號碼</label>
            <input type="phone" class="p-4 text-black font-bold rounded-lg" placeholder="請輸入手機號碼" />
          </div>
          <div class="w-full flex flex-col gap-y-2">
            <label class="font-bold">生日</label>
            <div class="w-full flex items-center gap-x-2">
              <div class="relative flex-1 w-full">
                <select class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                  <option disabled value="">年</option>
                  <option>2000</option>
                  <option>2001</option>
                  <option>2002</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
                </div>
              </div>
              <div class="relative flex-1 w-full">
                <select class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                  <option disabled value="">月</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
                </div>
              </div>
              <div class="relative flex-1 w-full">
                <select class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                  <option disabled value="">日</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full flex flex-col gap-y-2">
            <label class="font-bold">地址</label>
            <div class="flex items-center gap-x-2">
              <div class="relative flex-1 w-full">
                <select class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                  <option disabled value="">城市</option>
                  <option>台北市</option>
                  <option>台中市</option>
                  <option>高雄市</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
                </div>
              </div>
              <div class="relative flex-1 w-full">
                <select class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                  <option disabled value="">地區</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
                </div>
              </div>
            </div>

            <input type="text" class="p-4 text-black fond-bold rounded-lg" placeholder="請輸入詳細地址" />
          </div>

          <div class="w-full flex justify-start items-end gap-2 text-neutral-0">
            <input id="signup-terms" type="checkbox" class="terms-checkbox" />
            <label for="signup-terms" class="font-bold text-white cursor-pointer">
              <NuxtLink to="/auth/signup" class="hover:underline">我已閱讀並同意本網站個資使用規範</NuxtLink>
            </label>
          </div>

          <div class="w-full mt-6">
            <button class="w-full py-4 bg-primary-base font-bold rounded-lg">完成註冊</button>
          </div>
        </form>

        <div class="w-full flex justify-start items-center gap-x-2 font-medium sm:w-2/3 lg:w-1/2">
          <p class="text-white">已經有會員了嗎?</p>
          <NuxtLink to="/" class="font-bold text-primary-base hover:underline">立即登入</NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.terms-checkbox {
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
