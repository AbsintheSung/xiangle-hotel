<script setup lang="ts">
const route = useRoute();
const isHiddeFooter = computed(() => {
  const authRoutes = ["auth-SignIn", "auth-SignUp"];
  return authRoutes.includes(route.name as string);
});
</script>
<template>
  <footer class="py-20 bg-black" :class="{ hidden: isHiddeFooter }">
    <div class="container flex flex-col gap-y-10">
      <div class="flex flex-col gap-y-10 md:flex-row md:justify-between md:items-center">
        <div class="flex flex-col gap-y-10">
          <RouterLink to="/">
            <TheSvgIcon class="w-[196px] h-[72px]" name="logo-white"></TheSvgIcon>
          </RouterLink>
          <div class="flex gap-x-4">
            <RouterLink to="/">
              <Icon class="text-white text-2xl" name="lineicons:line"></Icon>
            </RouterLink>
            <RouterLink to="/">
              <Icon class="text-white text-2xl" name="lineicons:instagram-original"></Icon>
            </RouterLink>
          </div>
        </div>
        <ul class="text-white grid gap-x-20 gap-y-4 md:grid-cols-2 md:gap-y-10">
          <li>
            <p class="font-bold">TEL:</p>
            <p>
              <a href="tel:+886-7-1234567">+886-7-1234567</a>
            </p>
          </li>
          <li>
            <p class="font-bold">MAIL:</p>
            <p>
              <a href="mailto:elh@hexschool.com">elh@hexschool.com</a>
            </p>
          </li>
          <li>
            <p class="font-bold">FAX:</p>
            <p>+886-7-1234567</p>
          </li>
          <li>
            <p class="font-bold">WEB:</p>
            <p>
              <a href="https://www.elhhexschool.com.tw" target="_blank" rel="noopener noreferrer">www.elhhexschool.com.tw</a>
            </p>
          </li>
        </ul>
      </div>
      <div class="flex flex-col md:flex-row items-start md:items-center md:justify-between text-white">
        <address>806023 台灣高雄市新興區六角路123號</address>
        <p>&copy; 享樂酒店 2023 All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>
<style scoped lang="scss"></style>
