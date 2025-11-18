<script setup lang="ts">
import { homeCulinary } from "@/utils/swiperConfigs";
import { Swiper, SwiperSlide } from "swiper/vue";
defineProps<{
  getCulinaryDataList: {
    _id: string;
    title: string;
    description: string;
    diningTime: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    month: string;
    time: string;
  }[];
}>();
</script>
<template>
  <Swiper v-bind="homeCulinary">
    <SwiperSlide v-for="(culinaryItem, index) in getCulinaryDataList" :key="culinaryItem._id">
      <div class="relative overflow-hidden">
        <picture>
          <img class="w-full object-cover min-h-[400px] max-h-[600px] transition-transform duration-300 ease-in-out hover:scale-110" :src="culinaryItem.image" :alt="culinaryItem.title" />
        </picture>
        <div class="absolute bottom-0 p-4 flex flex-col gap-y-4 text-white backdrop-blur-sm md:p-6 md:gap-y-6">
          <div class="font-bold text-nowrap flex items-center justify-between">
            <h3 class="text-2xl">{{ culinaryItem.title }}</h3>
            <p class="flex items-center gap-x-2 md:gap-x-4">
              <time>{{ culinaryItem.month }}</time>
              <time>{{ culinaryItem.time }}</time>
            </p>
          </div>
          <div>
            <p>{{ culinaryItem.description }}</p>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>
