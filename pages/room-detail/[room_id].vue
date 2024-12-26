<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { roomDetailCards } from "@/utils/swiperConfigs";
import DateDialog from "./components/DateDialog.vue";
import CheckDialog from "./components/CheckDialog.vue";
import type { RoomDetailResponse } from "~/types/roomdetail";
import { useDomStore } from "~/stores/dom";
const config = useRuntimeConfig();
const { $swal } = useNuxtApp();
const route = useRoute();
const authStore = useAuthStore();
const swiperContainer = ref<HTMLElement | null>(null);
const domStore = useDomStore();
const { $dayjs } = useNuxtApp();
const { width: windowWidthSize } = useWindowSize();
const { width: swiperWidth } = useElementSize(swiperContainer);
const { y: windowScrollY } = useWindowScroll();
const GUEST_LIMITS = {
  MIN: 1,
  MAX: 4,
};
const ROOM_TiTLES = {
  layoutInfo: "房間格局",
  facilityInfo: "房內設備",
  amenityInfo: "備品提供",
};
const totalGuests = ref<number>(GUEST_LIMITS.MIN);
const isDateOpen = ref(false);
const isOpenConfirm = ref(false);
const calendarKey = ref(0);
const dateRange = ref({
  // 日期選擇範圍
  start: "",
  end: "",
});
const masks = ref({
  // 日期格式 (用於日曆標題與選擇格式)
  title: "西元 YYYY 年 MM 月", // 日曆標題顯示格式
  modelValue: "YYYY/MM/DD", // 日期選擇的值格式
});
const minDate = ref($dayjs().toDate()); // 最早可選當天
const maxDate = ref($dayjs().add(1, "year").toDate()); // 最晚可選下一年同一天
//控制燈箱開關
const visibleRef = ref<boolean>(false);
//開啟燈箱後，要顯示的圖片( 圖片是陣列，從位置0開始顯示 )
const indexRef = ref<number>(0);

const { data: roomDetail } = await useFetch<RoomDetailResponse>(`${config.public.apiBase}/api/v1/rooms/${route.params.room_id}`);
useSeoMeta({
  title: `享樂酒店-${roomDetail.value?.result.name}`,
  description: `享樂酒店-${roomDetail.value?.result.name}：${roomDetail.value?.result.description || ""}`,
  ogTitle: `享樂酒店-${roomDetail.value?.result.name}`,
  ogDescription: `享樂酒店-${roomDetail.value?.result.name}：${roomDetail.value?.result.description || ""}`,
  keywords: `享樂酒店,${roomDetail.value?.result.name},住宿,訂房,酒店預訂, 豪華住宿,`,
});
const marginTopStyle = computed(() => {
  return windowScrollY.value > 0 ? { marginTop: `${domStore.headerDomHeight}px` } : {};
});

//判斷是否可以增減
const guestLimits = computed(() => ({
  canAdd: totalGuests.value < GUEST_LIMITS.MAX,
  canReduce: totalGuests.value > GUEST_LIMITS.MIN,
}));

//獲取資料圖片，並整合成一個新陣列
const imgList = computed(() => {
  // return [data.result.imageUrl, ...data.result.imageUrlList];
  if (!roomDetail.value) return [] as string[];
  return [roomDetail.value.result.imageUrl, ...roomDetail.value.result.imageUrlList];
});

const getRoomId = computed(() => roomDetail.value?.result._id);

//控制 swiper的寬度 顯示與隱藏
const getSwiperWidth = computed(() => {
  return swiperWidth.value > 0 ? true : false;
});

//控制  DatePicker 的 col 呈現
const VDatePickerCol = computed(() => {
  return windowWidthSize.value > 768 ? 2 : 1;
});

//控制  DatePicker 的 row 呈現
const VDatePickerRow = computed(() => {
  return windowWidthSize.value > 768 ? 1 : 2;
});

// 計算總共幾晚數
const totalNights = computed(() => {
  // 檢查 start 和 end 是否為有效日期
  if (!dateRange.value.start || !dateRange.value.end) {
    return 0; // 如果有一個值為空，返回 0 晚
  }
  const start = $dayjs(dateRange.value.start);
  const end = $dayjs(dateRange.value.end);
  return end.diff(start, "day"); // 返回天數差
});

//計算日期是否完整填入
const isDateRangeComplete = computed(() => {
  return dateRange.value.start && dateRange.value.end ? true : false;
});

//計算 若日期完整填入 回傳對應字串
const formattedDateRange = computed(() => {
  return isDateRangeComplete.value ? `${dateRange.value.start} - ${dateRange.value.end}` : "";
});

// 使用 computed 分組資料( 房間設備對應 )
const groupedInfo = computed(() => ({
  layoutInfo: roomDetail.value?.result.layoutInfo,
  facilityInfo: roomDetail.value?.result.facilityInfo,
  amenityInfo: roomDetail.value?.result.amenityInfo,
}));

const getRoomDetailPrice = computed(() => {
  if (roomDetail.value && roomDetail.value.result) {
    return roomDetail.value.result.price;
  }
  return 0;
});
const getTotalPrice = computed(() => {
  if (totalNights.value === 0) {
    return getRoomDetailPrice.value;
  } else {
    // console.log(getRoomDetailPrice.value * totalNights.value);
    return getRoomDetailPrice.value * totalNights.value;
  }
});

//針對桌面板
const formattedTotalPrice = computed(() => {
  const total = getTotalPrice.value;
  return `NT$\u00A0${new Intl.NumberFormat("zh-TW").format(total)}`;
});
//關閉 date的 dialog
const closeDateModal = (): void => {
  isDateOpen.value = false;
};
//開啟 date的 dialog
const openDateModal = (): void => {
  isDateOpen.value = true;
};
//關閉 Confirm 的 dialog
const closeConfirmModal = (): void => {
  isOpenConfirm.value = false;
};
//開啟 Confirm 的 dialog
const openConfirmModal = (): void => {
  isOpenConfirm.value = true;
};
// 控制 是否填入日期，來決定是否進行下一步
const checkDate = (): void => {
  if (dateRange.value.start === "" || dateRange.value.end === "") {
    return;
  }
  if (windowWidthSize.value > 768) {
    closeDateModal();
  } else {
    closeDateModal();
    openConfirmModal();
  }
};
//清除日期，重新選擇
const clearDate = (): void => {
  dateRange.value.start = "";
  dateRange.value.end = "";
  calendarKey.value++;
};
//手機板重新選擇日期
const reSelectDate = (): void => {
  closeConfirmModal();
  openDateModal();
  clearDate();
};

//增加人數
const reduceGuests = (): void => {
  if (guestLimits.value.canReduce) {
    totalGuests.value--;
  }
};

//減少人數
const addGuests = (): void => {
  if (guestLimits.value.canAdd) {
    totalGuests.value++;
  }
};

const canProceed = computed(() => {
  // 確保兩個日期非空且格式正確
  const dateFormat = "YYYY/MM/DD";
  const isCheckInValid = $dayjs(dateRange.value.start, dateFormat, true).isValid();
  const isCheckOutValid = $dayjs(dateRange.value.end, dateFormat, true).isValid();
  return isCheckInValid && isCheckOutValid;
});

//燈箱設定
//開啟燈箱
const handleLightbox = (): void => {
  visibleRef.value = true;
};
//關閉燈箱
const handleCloseLightbox = (): void => {
  visibleRef.value = false;
};

const reservate = async (): Promise<void> => {
  const isAuth = await authStore.checkAuthBoolen();
  if (!isAuth) {
    $swal.fire({
      position: "center",
      icon: "warning",
      title: "系統警告",
      text: "請先登入",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }
  if (canProceed.value) {
    navigateTo({
      path: "/booking",
      query: {
        roomId: getRoomId.value,
        checkInDate: dateRange.value.start,
        checkOutDate: dateRange.value.end,
        peopleNum: totalGuests.value,
      },
    });
  }
};

// 監聽並格式化日期選擇器輸出
watch(dateRange, (newVal) => {
  if (newVal === null) return;
  if (newVal.start) {
    newVal.start = $dayjs(newVal.start).format("YYYY-MM-DD");
  }
  if (newVal.end) {
    newVal.end = $dayjs(newVal.end).format("YYYY-MM-DD");
  }
});
</script>
<template>
  <main class="bg-primary-Tint" :style="marginTopStyle">
    <section class="hidden p-12 md:block 2xl:p-20">
      <div class="relative flex gap-x-2">
        <div class="w-1/2 flex items-stretch">
          <img class="w-full rounded-l-lg" :src="imgList[0]" />
        </div>
        <div class="w-1/2 flex flex-col gap-y-2">
          <div class="flex gap-x-2">
            <div class="w-1/2">
              <img class="w-full" :src="imgList[1]" />
            </div>
            <div class="w-1/2">
              <img class="w-full rounded-tr-lg" :src="imgList[2]" />
            </div>
          </div>
          <div class="flex gap-x-2">
            <div class="w-1/2">
              <img class="w-full" :src="imgList[3]" />
            </div>
            <div class="w-1/2">
              <img class="w-full rounded-br-lg" :src="imgList[4]" />
            </div>
          </div>
        </div>
        <button class="absolute bottom-2 right-2 px-3 py-2 bg-neutral-50 text-primary-base font-bold text-nowrap rounded-lg xl:bottom-10 xl:right-10 xl:px-8 xl:py-4" @click="handleLightbox">看更多</button>
      </div>
      <!-- 燈箱 -->
      <VueEasyLightbox :visible="visibleRef" :imgs="imgList" :index="indexRef" @hide="handleCloseLightbox" />
    </section>
    <section ref="swiperContainer" class="md:hidden">
      <Swiper v-if="getSwiperWidth" class="h-full" v-bind="roomDetailCards">
        <SwiperSlide v-for="(imgItem, itemIndex) in imgList" :key="imgItem">
          <img class="w-full h-full" :src="imgItem" :alt="`roomPicture${itemIndex}`" />
        </SwiperSlide>
      </Swiper>
    </section>
    <section class="py-10 lg:py-[120px]">
      <div class="container flex gap-x-6">
        <div class="w-full md:w-7/12">
          <div class="flex flex-col gap-y-4 mb-6 md:mb-20">
            <h2 class="font-bold text-[32px] md:text-5xl">{{ roomDetail?.result.name }}</h2>
            <p class="font-medium text-[14px] md:text-base">{{ roomDetail?.result.description }}</p>
          </div>
          <ul class="flex flex-col gap-y-6 md:gap-y-20">
            <li>
              <h3 class="ps-3 mb-4 border-s-4 border-primary-base font-bold md:text-2xl md:mb-6">房型基本資訊</h3>
              <ul class="flex items-center flex-wrap gap-x-4">
                <li class="w-[97px] h-[97px] p-3 bg-white border border-neutral-300 rounded-xl flex flex-col justify-center gap-y-2">
                  <Icon class="shrink-0 text-2xl text-primary-base" name="fluent:slide-size-24-filled" />
                  <p class="font-bold">{{ roomDetail?.result.areaInfo }}</p>
                </li>
                <li class="w-[97px] h-[97px] p-3 bg-white border border-neutral-300 rounded-xl flex flex-col justify-center gap-y-2">
                  <Icon class="shrink-0 text-2xl text-primary-base" name="fluent:bed-24-filled" />
                  <p class="font-bold">{{ roomDetail?.result.bedInfo }}</p>
                </li>
                <li class="w-[97px] h-[97px] p-3 bg-white border border-neutral-300 rounded-xl flex flex-col justify-center gap-y-2">
                  <Icon class="shrink-0 text-2xl text-primary-base" name="fluent:person-24-filled" />
                  <p class="font-bold">{{ `1-${roomDetail?.result.maxPeople}人` }}</p>
                </li>
              </ul>
            </li>
            <li v-for="(gruopItem, gruopKey) in groupedInfo" :key="gruopKey">
              <h3 class="ps-3 mb-4 border-s-4 border-primary-base font-bold md:text-2xl md:mb-6">{{ ROOM_TiTLES[gruopKey] }}</h3>
              <ul class="p-6 text-nowrap font-bold bg-white grid grid-cols-3 gap-6 rounded-lg md:grid-cols-4 lg:grid-cols-5 md:gap-x-10 md:gap-y-2">
                <li class="flex items-center gap-x-2" v-for="item in gruopItem" :key="item.title">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" v-if="item.isProvide" />
                  <p>{{ item.title }}</p>
                </li>
              </ul>
            </li>
            <li>
              <h3 class="ps-3 mb-4 border-s-4 border-primary-base font-bold md:text-2xl md:mb-6">訂房須知</h3>
              <ul class="font-medium text-[14px] flex flex-col gap-y-1 md:text-base">
                <li>1.入住時間為下午3點，退房時間為上午12點。</li>
                <li>2.如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。</li>
                <li>3.請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。</li>
                <li>4.若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。</li>
                <li>2.請愛惜我們的房間與公共空間，並保持整潔。</li>
                <li>6.如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。</li>
                <li>7.我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。</li>
                <li>8.請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。</li>
                <li>9.我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。</li>
                <li>10.為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。</li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="relative hidden md:block w-5/12">
          <div class="sticky top-40 p-10 flex flex-col gap-y-10 bg-white rounded-[20px]">
            <p class="pb-4 text-2xl font-bold border-b border-neutral-200">預定房型</p>
            <div class="flex flex-col gap-y-2">
              <h3 class="text-4xl font-bold">{{ roomDetail?.result.name }}</h3>
              <p>{{ roomDetail?.result.description }}</p>
            </div>
            <div class="w-full flex flex-col flex-wrap gap-y-4 gap-x-2 items-center lg:flex-row">
              <div class="w-full p-4 flex-1 flex flex-col border rounded-lg hover:cursor-pointer" @click="openDateModal">
                <label class="pointer-events-none">入住</label>
                <input type="date" v-model="dateRange.start" class="pointer-events-none focus:outline-none" readonly />
              </div>
              <div class="w-full p-4 flex-1 flex flex-col border rounded-lg hover:cursor-pointer" @click="openDateModal">
                <label class="pointer-events-none">退房</label>
                <input type="date" v-model="dateRange.end" class="pointer-events-none focus:outline-none" readonly />
              </div>
              <div class="w-full font-bold flex justify-between items-center">
                <p>人數</p>
                <div class="flex items-center gap-x-4">
                  <button class="p-4 flex items-center justify-center border border-neutral-200 rounded-full" @click="reduceGuests">
                    <Icon name="fluent:minimize-24-regular" />
                  </button>
                  <p class="px-1">{{ totalGuests }}</p>
                  <button class="p-4 flex items-center justify-center border border-neutral-200 rounded-full" @click="addGuests">
                    <Icon name="fluent:add-24-filled" />
                  </button>
                </div>
              </div>
            </div>
            <p class="font-bold text-primary-base sm:text-2xl">{{ formattedTotalPrice }}</p>
            <button class="py-4 w-full text-white font-bold bg-primary-base rounded-lg" @click="reservate">立即預定</button>
          </div>
        </div>
      </div>
    </section>

    <CheckDialog v-model:dateRange="dateRange" :isOpenConfirm="isOpenConfirm" :totalNights="totalNights" :closeConfirmModal="closeConfirmModal" :openConfirmModal="openConfirmModal" :totalGuests="totalGuests" :addGuests="addGuests" :reduceGuests="reduceGuests" :reSelectDate="reSelectDate" :formattedDateRange="formattedDateRange" />
    <DateDialog v-model:dateRange="dateRange" :isDateOpen="isDateOpen" :windowWidthSize="windowWidthSize" :VDatePickerRow="VDatePickerRow" :VDatePickerCol="VDatePickerCol" :masks="masks" :minDate="minDate" :maxDate="maxDate" :calendarKey="calendarKey" :totalNights="totalNights" :closeDateModal="closeDateModal" :openDateModal="openDateModal" :checkDate="checkDate" :clearDate="clearDate" :formattedDateRange="formattedDateRange" />

    <section class="w-full bottom-0 fixed z-10 md:hidden bg-neutral-200">
      <div v-if="!isDateRangeComplete" class="p-3 flex items-center justify-between gap-x-1">
        <div class="flex-1 flex items-center gap-y-1">
          <p class="font-bold text-primary-base sm:text-2xl" v-number-format="getTotalPrice"></p>
          <p>&nbsp; / &nbsp; 晚</p>
        </div>
        <button class="px-8 py-4 text-base font-bold text-white bg-primary-base sm:px-12 rounded-lg" @click="openDateModal">查看可訂日期</button>
      </div>
      <div v-else class="p-3 flex items-center justify-between gap-x-1">
        <div class="flex-1 flex flex-col gap-x-1" @click="openDateModal">
          <div class="flex items-center">
            <p class="font-bold text-primary-base gap-x-1 sm:text-2xl" v-number-format="getTotalPrice"></p>
            <p>&nbsp;/&nbsp; {{ totalNights }}晚&nbsp;/&nbsp;{{ totalGuests }}人&nbsp;</p>
          </div>
          <p>{{ formattedDateRange }}</p>
        </div>
        <button class="px-8 py-4 text-base font-bold text-white bg-primary-base sm:px-12 rounded-lg" @click="reservate">立即預訂</button>
      </div>
    </section>
  </main>
</template>
<style scoped lang="scss">
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
