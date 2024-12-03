<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { roomsCards } from "~/utils/swiperConfigs";
import type { RoomsComputed } from "~/types/rooms";
defineProps<{
  roomDataList: RoomsComputed[];
}>();
</script>
<template>
  <ul class="flex flex-col gap-y-6 sm:gap-y-12">
    <li v-for="roomItem in roomDataList" :key="roomItem._id" class="flex flex-col items-center gap-y-4 gap-x-6 lg:flex-row lg:items-stretch">
      <div class="w-full lg:w-7/12 lg:-me-6">
        <Swiper class="h-full" v-bind="roomsCards">
          <SwiperSlide v-for="(imgItem, itemIndex) in roomItem.allImagesList" :key="imgItem">
            <img class="w-full h-full" :src="imgItem" :alt="`roomPicture${itemIndex}`" />
          </SwiperSlide>
        </Swiper>
      </div>
      <ul class="w-full lg:w-5/12">
        <li class="h-full p-4 flex flex-col gap-y-5 md:p-10 md:gap-y-10">
          <div>
            <h3 class="mb-2 font-bold text-[28px] md:text-[40px]">{{ roomItem.name }}</h3>
            <p class="font-medium text-[14px] md:text-base">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
          </div>
          <div class="flex items-center gap-x-4">
            <div class="w-[97px] h-[97px] p-3 border border-neutral-300 rounded-xl flex flex-col gap-y-2">
              <Icon class="text-2xl text-primary-base" name="fluent:slide-size-24-filled" />
              <p class="font-bold">{{ roomItem.areaInfo }}</p>
            </div>
            <div class="w-[97px] h-[97px] p-3 border border-neutral-300 rounded-xl flex flex-col gap-y-2">
              <Icon class="text-2xl text-primary-base" name="fluent:bed-24-filled" />
              <p class="font-bold">{{ roomItem.bedInfo }}</p>
            </div>
            <div class="w-[97px] h-[97px] p-3 border border-neutral-300 rounded-xl flex flex-col gap-y-2">
              <Icon class="text-2xl text-primary-base" name="fluent:person-24-filled" />
              <p class="font-bold">{{ `1-${roomItem.maxPeople}人` }}</p>
            </div>
          </div>
          <div class="w-full h-[2px] bg-gradient-to-r from-[#BE9C7C] to-white" />
          <div class="flex items-center justify-between">
            <p class="font-bold text-primary-base sm:text-2xl" v-number-format="roomItem.price"></p>
            <NuxtLink to="/rooms" class="flex items-center justify-center">
              <Icon class="text-2xl text-primary-base" name="fluent:arrow-right-16-filled" />
            </NuxtLink>
          </div>
        </li>
      </ul>
    </li>
  </ul>
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
//swiper 左右鍵
.swiper:deep(.swiper-button-prev),
.swiper:deep(.swiper-button-next) {
  display: none; // 預設隱藏
}
@media (min-width: 576px) {
  .swiper :deep(.swiper-button-prev),
  .swiper :deep(.swiper-button-next) {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}

.swiper :deep(.swiper-button-prev):after,
.swiper :deep(.swiper-button-next):after {
  font-weight: bold;
  font-size: 16px;
  color: black;
}
</style>
