<script setup lang="ts">
import type { ResponseOrder } from "~/types/order";
import { useDomStore } from "~/stores/dom";
const domStore = useDomStore();
const { y: windowScrollY } = useWindowScroll();
const config = useRuntimeConfig();
const { $dayjs } = useNuxtApp();
const route = useRoute();
console.log(route.params.order_id);
// const { data: order } = await useFetch<ResponseOrder>(`/api/order`);
const { data: order } = await useFetch<ResponseOrder>(`${config.public.apiBase}/api/v1/orders/${route.params.order_id}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${useCookie(config.public.cookieAuth).value}`,
  },
});
console.log(order);
const ROOM_TiTLES = {
  facilityInfo: "房內設備",
  amenityInfo: "備品提供",
};
const getUserName = computed(() => order.value?.result.userInfo.name);
const getUserPhone = computed(() => order.value?.result.userInfo.phone);
const getUserEmail = computed(() => order.value?.result.userInfo.email);
const getOrderId = computed(() => order.value?.result._id);
const getPeopleNum = computed(() => order.value?.result.peopleNum);
const getRoomName = computed(() => order.value?.result.roomId.name);
const getRoomPrice = computed(() => order.value?.result.roomId.price || 0);
const groupedInfo = computed(() => ({
  facilityInfo: order.value?.result.roomId.facilityInfo,
  amenityInfo: order.value?.result.roomId.amenityInfo,
}));
const getCheckOutDate = computed(() => {
  const date = $dayjs(order.value?.result.checkOutDate);
  const weekDay = date.format("dddd"); // dayjs 會根據 locale 自動轉換成中文
  return `${date.format("YYYY/MM/DD")} ${weekDay}`;
});
const getCheckInDate = computed(() => {
  const date = $dayjs(order.value?.result.checkInDate);
  const weekDay = date.format("dddd"); // dayjs 會根據 locale 自動轉換成中文
  return `${date.format("YYYY/MM/DD")} ${weekDay}`;
});
const getTotalNights = computed(() => {
  // 檢查 start 和 end 是否為有效日期
  if (!order.value?.result.checkInDate || !order.value?.result.checkOutDate) {
    return 0; // 如果有一個值為空，返回 0 晚
  }
  const checkInDate = $dayjs(order.value?.result.checkInDate).format("YYYY/MM/DD");
  const checkOutDate = $dayjs(order.value?.result.checkOutDate).format("YYYY/MM/DD");
  const start = $dayjs(checkInDate);
  const end = $dayjs(checkOutDate);
  return end.diff(start, "day"); // 返回天數差
});

const getTotalPrice = computed(() => getTotalNights.value * getRoomPrice.value);

const marginTopStyle = computed(() => {
  return windowScrollY.value > 0 ? { marginTop: `${domStore.headerDomHeight}px` } : {};
});
</script>
<template>
  <main class="bg-black" :style="marginTopStyle">
    <section class="py-10 container flex flex-col gap-x-6 gap-y-10 md:py-[120px] md:flex-row">
      <div class="w-full text-white flex flex-col gap-y-10 md:w-7/12 md:gap-y-20">
        <div class="space-y-8 md:space-y-10">
          <div class="flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-10">
            <p class="p-2 w-10 h-10 flex items-center justify-center bg-success-base rounded-full">
              <Icon class="text-2xl text-white" name="fluent:checkmark-16-filled" />
            </p>
            <div class="flex flex-col gap-y-2 font-bold text-3xl md:text-5xl">
              <h2>恭喜，{{ getUserName }}！</h2>
              <p>您已預訂成功</p>
            </div>
          </div>
          <p class="font-medium md:text-2xl">我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。</p>
        </div>
        <div class="py-10 md:py-20 border-t border-b border-neutral-200">
          <h3 class="mb-6 font-bold md:mb-10 md:text-2xl">立即查看您的訂單紀錄</h3>
          <button class="py-4 w-full bg-primary-base rounded-lg sm:w-fit sm:px-10">前往我的訂單</button>
        </div>
        <div class="space-y-8 md:space-y-10">
          <h3 class="font-bold text-2xl">訂房人資訊</h3>
          <ul class="space-y-6">
            <li>
              <p class="font-medium">姓名</p>
              <p class="font-bold">{{ getUserName }}</p>
            </li>
            <li>
              <p class="font-medium">手機號碼</p>
              <p class="font-bold">{{ getUserPhone }}</p>
            </li>
            <li>
              <p class="font-medium">電子信箱</p>
              <p class="font-bold">{{ getUserEmail }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full md:w-5/12">
        <aside class="p-10 flex flex-col gap-y-10 bg-white rounded-[20px]">
          <div class="space-y-2">
            <p>預訂參考編號： {{ getOrderId }}</p>
            <h3 class="font-bold md:text-2xl">即將到來行程</h3>
          </div>
          <div>
            <img class="rounded-lg" :src="order?.result.roomId.imageUrl" alt="房型圖片1" />
          </div>
          <ul class="space-y-6 md:space-y-10">
            <li class="space-y-6">
              <div class="flex font-bold text-xl">
                <p class="me-4">{{ getRoomName }}，{{ getTotalNights }} 晚</p>
                <p class="text-neutral-200">|</p>
                <p class="ms-4">住宿人數：{{ getPeopleNum }} 位</p>
              </div>
              <div class="font-bold space-y-2">
                <div class="flex items-stretch">
                  <span class="w-1 mr-3 bg-primary-base rounded-2xl"></span>
                  <p>入住：{{ getCheckInDate }}，15:00 可入住</p>
                </div>
                <div class="flex items-stretch">
                  <span class="w-1 mr-3 bg-primary-base rounded-2xl"></span>
                  <p>退房：{{ getCheckOutDate }}，12:00 前退房</p>
                </div>
              </div>
              <div class="font-bold">
                <p class="md:text-2xl" v-number-format="getTotalPrice"></p>
              </div>
            </li>
            <li class="space-y-6" v-for="(gruopItem, gruopKey) in groupedInfo" :key="gruopKey">
              <div class="flex items-stretch">
                <span class="w-1 mr-3 bg-primary-base rounded-2xl"></span>
                <h3 class="font-bold md:text-2xl">{{ ROOM_TiTLES[gruopKey] }}</h3>
              </div>
              <ul class="p-6 text-nowrap font-bold bg-white grid grid-cols-2 gap-6 rounded-lg border border-neutral-300">
                <li class="flex items-center gap-x-2" v-for="item in gruopItem" :key="item.title">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" v-if="item.isProvide" />
                  <p>{{ item.title }}</p>
                </li>
              </ul>
            </li>
          </ul>
        </aside>
      </div>
    </section>
    <section class="hidden md:block">
      <img class="w-full" src="/assets/images/deco/deco-line-group-horizontal-full.png" />
    </section>
  </main>
</template>
<style scoped lang="scss"></style>
