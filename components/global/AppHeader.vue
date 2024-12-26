<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useDomStore } from "~/stores/dom";
const route = useRoute();
const router = useRouter();
const domStore = useDomStore();
const authStore = useAuthStore();
const windowScroll = useWindowScroll();
const headerY = ref(windowScroll.y);
const isScrolled = ref(false);
const isOpenMenu = ref(false);

const isShowUlList = computed(() => {
  const authRoutes = ["auth-SignIn", "auth-SignUp"];
  return authRoutes.includes(route.name as string);
});
const isNeedsBackground = computed(() => {
  const authRoutes = ["index", "rooms"];
  return authRoutes.includes(route.name as string);
});
const isFixed = computed(() => {
  const authRoutes = ["index", "rooms", "auth-SignIn", "auth-SignUp"];
  return authRoutes.includes(route.name as string);
});

const handleMenu = () => {
  isOpenMenu.value = true;
};
const handleCloseMenu = () => {
  isOpenMenu.value = false;
};

// 使用路由的 afterEach 監聽導航完成
router.afterEach(() => {
  isOpenMenu.value = false; // 每次導航後初始化 isOpenMenu
});

const goToMyAccount = () => {
  navigateTo("/user/member");
};

onMounted(() => {
  watch(
    () => headerY.value,
    (newHeaderY) => {
      newHeaderY > 0 ? (isScrolled.value = true) : (isScrolled.value = false);
    },
    { immediate: true }
  );
});
const headerDom = ref<HTMLElement | null>(null);
const { height: headerHight } = useElementSize(headerDom);
watch(headerHight, (newHeight) => {
  if (newHeight >= 0) {
    domStore.setHeaderDomHeight(newHeight);
  }
});
</script>
<template>
  <header ref="headerDom" class="w-full z-30 transition-all duration-300 ease-in-out" :class="[{ 'bg-black': isScrolled || !isNeedsBackground }, { fixed: isScrolled || isFixed }]">
    <div class="px-3 py-6 flex items-center justify-between 3xl:px-20">
      <h1>
        <NuxtLink to="/">
          <TheSvgIcon class="w-[196px] h-[72px]" name="logo-white"></TheSvgIcon>
        </NuxtLink>
      </h1>
      <ul class="hidden items-center gap-x-4 font-bold text-white md:flex" v-show="!isShowUlList">
        <li class="hover:text-primary-base">
          <NuxtLink class="block p-4" to="/rooms">客房旅宿</NuxtLink>
        </li>
        <li v-if="!authStore.getIsAuthenticated" class="hover:text-primary-base">
          <NuxtLink class="block p-4" to="/auth/signin">會員登入</NuxtLink>
        </li>
        <li v-else>
          <Menu as="div" class="relative inline-block text-left">
            <div class="hover:text-primary-base">
              <MenuButton class="inline-flex w-full justify-center rounded-md px-4 py-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                <div class="flex items-center gap-x-2">
                  <Icon class="text-2xl" name="fluent:person-circle-32-regular" />
                  <p>{{ authStore.getAuthData?.name }}</p>
                </div>
              </MenuButton>
            </div>

            <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
              <MenuItems class="absolute left-0 mt-3 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div class="py-1 space-y-2">
                  <MenuItem as="a" v-slot="{ active }">
                    <button :class="[active ? ' bg-primary-base' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 ']" @click="goToMyAccount">我的帳戶</button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button :class="[active ? 'bg-primary-base' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 ']" @click="authStore.userlogout">會員登出</button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
          <!-- <NuxtLink class="block p-4" to="/user/member">
            <div class="flex items-center gap-x-2">
              <Icon class="text-2xl" name="fluent:person-circle-32-regular" />
              <p>{{ authStore.getAuthData?.name }}</p>
            </div>
          </NuxtLink> -->
        </li>
        <li class="bg-primary-base rounded-xl hover:bg-primary-120">
          <NuxtLink class="block py-4 px-8" to="/rooms">立即訂房</NuxtLink>
        </li>
      </ul>
      <div class="md:hidden">
        <button>
          <Icon class="text-white text-3xl" name="gridicons:menu" @click="handleMenu"></Icon>
        </button>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="isOpenMenu" class="p-5 fixed inset-0 w-full h-full z-50 bg-black flex flex-col items-center justify-center">
        <div class="absolute top-5 right-5">
          <button @click="handleCloseMenu">
            <Icon class="text-white text-3xl" name="gridicons:cross"></Icon>
          </button>
        </div>
        <div class="w-full">
          <ul class="flex flex-col items-center gap-y-4 font-bold text-white">
            <li class="w-full text-center">
              <NuxtLink class="block p-4 w-full" to="/rooms">客房旅宿</NuxtLink>
            </li>
            <li v-if="!authStore.getIsAuthenticated" class="w-full text-center">
              <NuxtLink class="block p-4 w-full" to="/auth/signin">會員登入</NuxtLink>
            </li>
            <li v-else class="w-full">
              <NuxtLink class="block p-4" to="/user/member">
                <div class="flex justify-center items-center gap-x-2">
                  <!-- <Icon class="text-2xl" name="fluent:person-circle-32-regular" />
                  <p>{{ authStore.getAuthData?.name }}</p> -->
                  <p>我的帳戶</p>
                </div>
              </NuxtLink>
            </li>
            <li v-if="authStore.getIsAuthenticated" class="w-full text-center">
              <button class="p-4 w-full" @click="authStore.userlogout">會員登出</button>
            </li>
            <li class="w-full text-center bg-primary-base rounded-xl">
              <NuxtLink class="block p-4 w-full" to="/rooms">立即訂房</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </header>
</template>
<style scoped lang="scss"></style>
