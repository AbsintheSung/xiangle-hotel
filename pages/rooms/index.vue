<script setup lang="ts">
import RoomsCard from "./components/RoomsCard.vue";
import homeHeroImg from "@/assets/images/desktop/home-hero.png";
import homeHeroImgSm from "@/assets/images/mobile/home-hero-sm.png";
import { Swiper, SwiperSlide } from "swiper/vue";
import { roomsHome } from "@/utils/swiperConfigs";
import type { ResponseRooms } from "@/types/rooms";
const config = useRuntimeConfig();
const HomeHeroImgList = ref([
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-1" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-2" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-3" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-4" },
]);
const { data: roomsDataList } = await useFetch<ResponseRooms>(`${config.public.apiBase}/api/v1/rooms`);
const getRoomsDataList = computed(() => {
  return (
    roomsDataList.value?.result.map((room) => {
      return {
        ...room,
        allImagesList: [room.imageUrl, ...room.imageUrlList],
      };
    }) || [] // 如果是 undefined 就返回空陣列
  );
});
</script>
<template>
  <main>
    <section class="relative">
      <Swiper ref="roomSwiper" v-bind="roomsHome" class="h-full">
        <SwiperSlide v-for="heroItem in HomeHeroImgList" :key="heroItem.alt">
          <picture>
            <source :srcset="heroItem.imgSrcset" media="(min-width:576px)" />
            <img class="w-full h-screen object-cover brightness-50" :src="heroItem.imgSrc" :alt="heroItem.alt" />
          </picture>
        </SwiperSlide>
      </Swiper>

      <div class="absolute container w-full top-1/2 z-20 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 md:px-20">
        <div class="w-full flex flex-col md:flex-row items-center justify-center gap-x-10">
          <div>
            <h2 class="basis-1/3 flex flex-col gap-y-2 font-bold text-primary-base">
              <span class="text-4xl text-center md:text-start">享樂酒店</span>
              <span class="text-2xl">Enjoyment Luxury Hotel</span>
            </h2>
            <div class="hidden mt-10 w-full h-[2px] bg-gradient-to-r from-[#BE9C7C] to-white md:block lg:w-[30vw]" />
          </div>

          <div class="mt-5 mb-10 h-20 w-[2px] bg-gradient-to-r from-[#BE9C7C] to-white md:hidden"></div>

          <div>
            <p class="text-5xl text-white font-bold">客房旅宿</p>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-primary-Tint py-4 md:py-[120px]">
      <div class="container">
        <div class="mb-10 flex flex-col gap-y-2 font-bold md:gap-y-4 md:mb-20">
          <span class="text-[14px] md:text-xl">房型選擇</span>
          <h2 class="text-3xl md:text-5xl text-primary-base">各種房型，任您挑選</h2>
        </div>
        <RoomsCard :roomDataList="getRoomsDataList" />
      </div>
    </section>
  </main>
</template>
<style scoped lang="scss">
//swiper 下底按鈕
.swiper :deep(.swiper-pagination) {
  margin: 0 auto;
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
