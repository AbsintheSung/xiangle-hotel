<script setup lang="ts">
import homeHeroImg from "@/assets/images/desktop/home-hero.png";
import homeHeroImgSm from "@/assets/images/mobile/home-hero-sm.png";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, EffectCreative, Pagination } from "swiper/modules";
// 引入所需的 Swiper 樣式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
const HomeHeroImgList = ref([
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-1" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-2" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-3" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-4" },
]);
const swiperConfig = {
  modules: [Navigation, EffectCreative, Pagination],
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    dynamicBullets: true,
  },
};
</script>

<template>
  <main>
    <section class="relative">
      <Swiper v-bind="swiperConfig" class="h-full">
        <SwiperSlide v-for="heroItem in HomeHeroImgList" :key="heroItem.alt">
          <picture>
            <source :srcset="heroItem.imgSrcset" media="(min-width:576px)" />
            <img class="w-full h-screen object-cover brightness-50" :src="heroItem.imgSrc" :alt="heroItem.alt" />
          </picture>
        </SwiperSlide>
      </Swiper>

      <div class="absolute w-full top-1/2 z-20 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 md:px-20">
        <div class="w-full flex flex-col md:flex-row items-center justify-between">
          <h2 class="basis-1/3 flex flex-col gap-y-2 font-bold text-primary-base">
            <span class="text-4xl text-center md:text-start">享樂酒店</span>
            <span class="text-2xl">Enjoyment Luxury Hotel</span>
          </h2>
          <div class="mt-5 mb-10 h-20 w-[2px] bg-gradient-to-r from-[#BE9C7C] to-white md:hidden"></div>
          <div class="ms-auto sm:ms-0 w-[calc(100%-3rem)] sm:w-fit border-t border-r border-[#F5F7F9] rounded-[80px] py-24 backdrop-blur-sm shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
            <div class="-translate-x-12">
              <h3 class="flex flex-col gap-y-2 text-5xl lg:text-6xl 2xl:text-8xl text-white font-bold">
                <span>高雄</span>
                <span>豪華住宿之選</span>
              </h3>
              <p class="mt-6 mb-24 text-base lg:text-2xl 2xl:text-3xl text-white font-semibold">我們致力於為您提供無與倫比的奢華體驗與優質服務</p>
            </div>
            <div class="-translate-x-12">
              <RouterLink to="/" class="w-full flex items-center justify-end gap-x-4 bg-white md:bg-primary-base p-5 md:p-[40px] rounded-md">
                <p class="text-base text-black md:text-2xl md:text-white font-bold">立即訂房</p>
                <p class="h-[1px] bg-black md:bg-white w-28"></p>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.swiper :deep(.swiper-pagination) {
  bottom: 24px;
}

.swiper :deep(.swiper-pagination-bullet) {
  width: 32px;
  height: 4px;
  background-color: #f1eae4;
  border-radius: 100px;
  opacity: 1;
}

.swiper :deep(.swiper-pagination-bullet-active) {
  width: 60px;
  background-color: #bf9d7d;
}
</style>
