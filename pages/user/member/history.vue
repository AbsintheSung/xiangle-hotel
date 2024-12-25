<script setup lang="ts">
import CancelDialog from "./components/CancelDialog.vue";
import type { HistoryResponse, DeleteHistoryResponse, Order, DeleteOrderError } from "~/types/user";
type EnhancedOrder = Order & {
  formatCheckInTime: string; // 格式化的入住時間
  formatCheckInDate: string; // 格式化的入住日期
  formatCheckInWithDay: string; // 格式化的入住日期（帶星期）
  formatCheckOutTime: string; // 格式化的退房時間
  formatCheckOutDate: string; // 格式化的退房日期
  formatCheckOutWithDay: string; // 格式化的退房日期（帶星期）
};

const config = useRuntimeConfig();
const { $swal } = useNuxtApp();
const { $dayjs } = useNuxtApp();
const { data: orderList } = await useFetch<HistoryResponse>(`${config.public.apiBase}/api/v1/orders`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${useCookie(config.public.cookieAuth).value}`,
  },
});

const formatDateTime = (date: string) => $dayjs(date).format("HH:mm"); // 僅時間
const formatDate = (date: string) => $dayjs(date).format("YYYY/MM/DD"); // 僅日期
const formatWithDay = (date: string) => $dayjs(date).format("dddd"); //顯示星期
const ROOM_TiTLES = {
  facilityInfo: "房內設備",
  amenityInfo: "備品提供",
};
const userSelectOrder = ref<EnhancedOrder | null>(null);
const getOrderList = computed<EnhancedOrder[]>(
  () =>
    orderList.value?.result.map((orderItem) => ({
      ...orderItem,
      formatCheckInTime: formatDateTime(orderItem.checkInDate),
      formatCheckInDate: formatDate(orderItem.checkInDate),
      formatCheckInWithDay: formatWithDay(orderItem.checkInDate),
      formatCheckOutTime: formatDateTime(orderItem.checkOutDate),
      formatCheckOutDate: formatDate(orderItem.checkOutDate),
      formatCheckOutWithDay: formatWithDay(orderItem.checkOutDate),
    })) || []
);

// 狀態管理：初始顯示的數量
const displayCount = ref(3);

// 可見訂單的計算屬性
const getViewOrders = computed(() => getOrderList.value?.slice(0, displayCount.value) || []);

//取得最近的且未超過時間的第一筆定單
const getfirstUpcomingOrder = computed(() => {
  const now = $dayjs();
  if (userSelectOrder.value === null) {
    return getOrderList.value
      ?.filter((order) => $dayjs(order.checkInDate).isAfter(now)) // 過濾出現在之後的訂單
      .sort((a, b) => $dayjs(a.checkInDate).diff($dayjs(b.checkInDate)))[0]; // 按時間排序 // 取得第一筆
  } else {
    return userSelectOrder.value;
  }
});
const getfirstUpcomingOrderId = computed(() => getfirstUpcomingOrder.value._id);
const getfirstUpcomingOrderTimeState = computed(() => {
  if (!getfirstUpcomingOrder.value.checkInDate) return false; // 如果沒有 checkInDate，預設為 false
  const checkIn = $dayjs(getfirstUpcomingOrder.value.checkInDate); // 將 checkInDate 轉換為 Day.js 日期
  const now = $dayjs(); // 當前時間
  return checkIn.isAfter(now); // 判斷是否在現在時間之後
});

const getOrderId = computed(() => getfirstUpcomingOrder.value?._id);
const getPeopleNum = computed(() => getfirstUpcomingOrder.value?.peopleNum);
const getRoomName = computed(() => getfirstUpcomingOrder.value?.roomId.name);
const getRoomPrice = computed(() => getfirstUpcomingOrder.value?.roomId.price || 0);
const groupedInfo = computed(() => ({
  facilityInfo: getfirstUpcomingOrder.value?.roomId.facilityInfo,
  amenityInfo: getfirstUpcomingOrder.value?.roomId.amenityInfo,
}));
const getCheckOutDate = computed(() => {
  return `${getfirstUpcomingOrder.value?.formatCheckOutDate} ${getfirstUpcomingOrder.value?.formatCheckOutWithDay}`;
});
const getCheckInDate = computed(() => {
  return `${getfirstUpcomingOrder.value?.formatCheckInDate} ${getfirstUpcomingOrder.value?.formatCheckInWithDay}`;
});
const getTotalNights = computed(() => {
  // 檢查 start 和 end 是否為有效日期
  if (!getfirstUpcomingOrder.value?.checkInDate || !getfirstUpcomingOrder.value?.checkOutDate) {
    return 0; // 如果有一個值為空，返回 0 晚
  }
  const start = $dayjs(getfirstUpcomingOrder.value?.checkInDate);
  const end = $dayjs(getfirstUpcomingOrder.value?.checkOutDate);
  return end.diff(start, "day"); // 返回天數差
});

const getTotalPrice = computed(() => getTotalNights.value * getRoomPrice.value);

// 點擊查看更多按鈕的方法
const handleOrderMore = () => {
  displayCount.value += 3; // 每次增加3個
};
const handleOrderItem = (data: EnhancedOrder) => {
  userSelectOrder.value = data;
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 使用平滑滾動
  });
};

import { TransitionRoot, TransitionChild, Dialog, DialogTitle, DialogPanel } from "@headlessui/vue";

const isOpenCancel = ref(false);
const isCancelLoading = ref(false);
const closeCancelModal = () => {
  if (!isCancelLoading.value) {
    isOpenCancel.value = false;
  }
};

const openCancelModal = () => {
  isOpenCancel.value = true;
};

const handleCancelOrder = async () => {
  isCancelLoading.value = true;
  // console.log(getfirstUpcomingOrderId.value);
  try {
    const response = await $fetch<DeleteHistoryResponse>(`${config.public.apiBase}/api/v1/orders/${getfirstUpcomingOrderId.value}`, {
      method: "DELETE",
      headers: {
        Authorization: `${useCookie(config.public.cookieAuth).value}`,
      },
    });
    if (response.status) {
      // console.log("重新獲取列表api");
      $swal.fire({
        position: "center",
        icon: "success",
        title: "刪除成功",
        text: "(後端API並不會將資料移除或更改，故資料仍會存在以及獲取)",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    const errorMes = error as DeleteOrderError;
    if (!errorMes.response?._data?.status) {
      $swal.fire({
        position: "center",
        icon: "error",
        title: "刪除失敗",
        // text: "",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } finally {
    isCancelLoading.value = false;
    isOpenCancel.value = false;
  }
};

const handleCheckCancel = () => {
  openCancelModal();
};
</script>
<template>
  <TransitionRoot appear :show="isOpenCancel" as="template">
    <Dialog as="div" @close="closeCancelModal" class="relative z-50" :open="isOpenCancel">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>
      <div class="px-3 fixed inset-0 overflow-y-auto">
        <div class="flex w-full min-h-full items-center justify-center text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="py-4 w-full flex flex-col gap-y-4 rounded-2xl bg-white shadow-xl transform overflow-hidden transition-all md:w-2xl md:max-w-2xl">
              <DialogTitle as="h3" class="text-lg font-bold leading-6 text-gray-900">取消預定</DialogTitle>
              <div class="py-6 md:py-16">
                <p class="font-bold">確定要取消此房型的預訂嗎?</p>
              </div>
              <div class="px-3 flex gap-x-4 items-center font-bold">
                <button class="w-full py-4 text-primary-base border border-primary-base rounded-lg" @click="closeCancelModal">關閉視窗</button>
                <button class="w-full py-4 text-white bg-primary-base rounded-lg" @click="() => handleCancelOrder()">取消預定</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <section class="container flex flex-col gap-x-10 gap-y-6 md:flex-row">
    <aside class="space-y-6 h-fit p-6 w-full text-black bg-white rounded-[20px] lg:p-10 md:w-7/12 md:space-y-10">
      <div class="space-y-2">
        <p>預訂參考編號： {{ getOrderId }}</p>
        <h3 v-if="getfirstUpcomingOrderTimeState" class="font-bold md:text-2xl">即將到來行程</h3>
        <h3 v-else class="font-bold md:text-2xl">已留下完美的行程</h3>
      </div>
      <div>
        <img class="rounded-lg" :src="getfirstUpcomingOrder?.roomId.imageUrl" alt="房型圖片1" />
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
      <div class="font-bold flex items-center gap-x-4">
        <button class="w-full py-4 text-primary-base border border-primary-base rounded-lg" @click="handleCheckCancel()">取消預定</button>
        <button class="w-full py-4 text-white bg-primary-base rounded-lg">查看詳情</button>
      </div>
    </aside>
    <div class="h-fit p-6 w-full text-black bg-white rounded-[20px] lg:p-10 md:w-5/12">
      <h2>訂單紀錄</h2>
      <ul>
        <li v-for="orderItem in getViewOrders" :key="orderItem._id" @click="handleOrderItem(orderItem)" class="hover:cursor-pointer" :class="{ 'text-primary-base': orderItem._id === getfirstUpcomingOrderId }">
          <div class="py-6 flex gap-x-6 border-b border-neutral-300 md:py-10">
            <div>
              <img class="w-[120px] h-[80px]" :src="orderItem.roomId.imageUrl" alt="房型圖片" />
            </div>
            <div class="text-[14px] flex flex-col gap-y-4">
              <h3>預定參考編號:{{ orderItem._id }}</h3>
              <h4 class="font-bold text-xl">{{ orderItem.roomId.name }}</h4>
              <div class="flex flex-col gap-y-2">
                <p>
                  住宿天數:
                  <span class="font-bold">{{ $dayjs(orderItem.formatCheckOutDate).diff($dayjs(orderItem.formatCheckInDate), "day") }}</span>
                  晚
                </p>
                <p>
                  住宿人數:
                  <span class="font-bold">{{ orderItem.peopleNum }}</span>
                  位
                </p>
              </div>
              <div class="space-y-2">
                <div class="flex items-stretch">
                  <span class="w-1 mr-3 bg-primary-base rounded-2xl"></span>
                  <p>入住：{{ orderItem.formatCheckInDate }}，15:00 可入住</p>
                </div>
                <div class="flex items-stretch">
                  <span class="w-1 mr-3 bg-primary-base rounded-2xl"></span>
                  <p>退房：{{ orderItem.formatCheckOutDate }}，12:00 前退房</p>
                </div>
              </div>
              <div>
                <p v-number-format="$dayjs(orderItem.formatCheckOutDate).diff($dayjs(orderItem.formatCheckInDate), 'day') * orderItem.roomId.price"></p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <button class="mt-6 py-4 w-full font-bold text-center text-primary-base border border-primary-base rounded-lg md:mt-10" @click="handleOrderMore">查看更多</button>
    </div>
  </section>
</template>
<style scoped></style>
