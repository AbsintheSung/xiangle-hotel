<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { homeRooms } from "@/utils/swiperConfigs";
const roomsSwiper: Ref<typeof Swiper | null> = ref(null);
const props = defineProps<{
  getRoomsData?: {
    name: string;
    description: string;
    imageUrlList: string[];
    price: number;
  };
  roomsNum: number;
  getRoomsDataLength: number;
}>();

const emit = defineEmits<{
  prev: [number];
  next: [number];
}>();

// 子組件內部處理 Swiper 重置
const resetSwiper = () => {
  roomsSwiper.value?.$el.swiper.slideToLoop(0, 0);
  roomsSwiper.value?.$el.swiper.autoplay?.start();
};

const handlePrev = () => {
  const temp = (props.roomsNum - 1 + props.getRoomsDataLength) % props.getRoomsDataLength;
  emit("prev", temp);
};

const handleNext = () => {
  const temp = (props.roomsNum + 1) % props.getRoomsDataLength;
  emit("next", temp);
};
watch(
  () => props.roomsNum,
  () => {
    resetSwiper();
  }
);
</script>

<template>
  <div>
    <Swiper ref="roomsSwiper" v-bind="homeRooms" class="home-room-swiper w-full lg:w-1/2">
      <SwiperSlide v-for="(imgItem, index) in getRoomsData?.imageUrlList" :key="index">
        <picture>
          <img class="w-full h-full object-cover max-h-[900px]" :src="imgItem" :alt="imgItem + index" />
        </picture>
      </SwiperSlide>
    </Swiper>

    <div class="flex flex-col w-full lg:w-1/3 gap-y-10 text-white mt-auto">
      <div class="flex flex-col gap-y-4">
        <h2 class="text-4xl lg:text-5xl font-bold">{{ getRoomsData?.name }}</h2>
        <p>{{ getRoomsData?.description }}</p>
      </div>
      <p class="text-3xl font-bold" v-number-format="getRoomsData?.price"></p>
      <NuxtLink to="/rooms" class="relative w-full flex items-center justify-end gap-x-4 bg-white p-5 lg:p-[40px] rounded-md transition duration-300 ease-in-out group overflow-hidden">
        <p class="z-10 text-base text-nowrap text-black md:text-2xl font-bold group-hover:text-white">查看更多</p>
        <p class="z-10 h-[1px] bg-black w-28 group-hover:bg-white"></p>
        <div class="absolute inset-0 bg-primary-base transform -translate-x-full transition-transform duration-300 group-hover:-translate-x-0"></div>
      </NuxtLink>
      <div class="flex items-center justify-end text-primary-base">
        <button class="p-4" @click="handlePrev">
          <Icon name="material-symbols:arrow-back-rounded"></Icon>
        </button>
        <button class="p-4" @click="handleNext">
          <Icon name="material-symbols:arrow-forward"></Icon>
        </button>
      </div>
    </div>
  </div>
</template>
