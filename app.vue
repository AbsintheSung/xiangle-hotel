<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, EffectCreative } from "swiper/modules";
// 导入所需的 Swiper 样式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
const swiperConfig = {
  modules: [Navigation, EffectCreative],
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,
  breakpoints: {
    545: {
      slidesPerView: 2,
    },
    1080: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
  },
};
</script>
<template>
  <div>
    <Swiper :modules="[Navigation, EffectCreative]" :slides-per-view="1" :space-between="16" :loop="true">
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  </div>
</template>
<style></style>
