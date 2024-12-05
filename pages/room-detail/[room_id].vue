<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";

const data = {
  status: true,
  result: {
    _id: "66b0909bafe4327b9a563797",
    name: "尊爵雙人房",
    description: "享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。",
    imageUrl: "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-1.png",
    imageUrlList: ["https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-2.png", "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-3.png", "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-4.png", "https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-5.png?raw=true"],
    areaInfo: "24坪",
    bedInfo: "一張大床",
    maxPeople: 4,
    price: 10000,
    status: 1,
    layoutInfo: [
      {
        title: "市景",
        isProvide: true,
      },
      {
        title: "獨立衛浴",
        isProvide: true,
      },
      {
        title: "樓層電梯",
        isProvide: true,
      },
    ],
    facilityInfo: [
      {
        title: "平面電視",
        isProvide: true,
      },
      {
        title: "吹風機",
        isProvide: true,
      },
      {
        title: "冰箱",
        isProvide: true,
      },
      {
        title: "熱水壺",
        isProvide: true,
      },
      {
        title: "檯燈",
        isProvide: true,
      },
      {
        title: "衣櫥",
        isProvide: true,
      },
      {
        title: "書桌",
        isProvide: true,
      },
    ],
    amenityInfo: [
      {
        title: "衛生紙",
        isProvide: true,
      },
      {
        title: "拖鞋",
        isProvide: true,
      },
      {
        title: "沐浴用品",
        isProvide: true,
      },
      {
        title: "刮鬍刀",
        isProvide: true,
      },
      {
        title: "刷牙用品",
        isProvide: true,
      },
      {
        title: "罐裝水",
        isProvide: true,
      },
      {
        title: "梳子",
        isProvide: true,
      },
    ],
    createdAt: "2024-08-05T08:43:07.276Z",
    updatedAt: "2024-08-14T06:31:08.477Z",
  },
};
const imgList = computed(() => {
  return [data.result.imageUrl, ...data.result.imageUrlList];
});
import { Navigation, EffectCreative, Pagination, Autoplay } from "swiper/modules";
const roomsCards = {
  modules: [Navigation, Pagination, EffectCreative],
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    clickable: true,
  },
  navigation: false,
};
const swiperContainer = ref<HTMLElement | null>(null);
const { width: swiperWidth } = useElementSize(swiperContainer);
const getSwiperWidth = computed(() => {
  //因為裝置大於 768會隱藏，此時 width會是0。
  return swiperWidth.value > 0 ? true : false;
});

const { width: windowWidthSize } = useWindowSize();
const VDatePickerCol = computed(() => {
  return windowWidthSize.value > 768 ? 2 : 1;
});
const VDatePickerRow = computed(() => {
  return windowWidthSize.value > 768 ? 1 : 2;
});
// const date = ref({
//   start: "",
//   end: "",
// });

//dialog
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";

const isOpen = ref(false);
const closeModal = () => {
  isOpen.value = false;
};
const openModal = () => {
  isOpen.value = true;
};

const isOpenConfirm = ref(false);
const closeConfirmModal = () => {
  isOpenConfirm.value = false;
};
const openConfirmModal = () => {
  isOpenConfirm.value = true;
};

//處理時間
const { $dayjs } = useNuxtApp();

// 日期選擇範圍
const dateRange = ref({
  // start: $dayjs().format("YYYY-MM-DD"), // 當前日期
  // end: $dayjs().add(1, "day").format("YYYY-MM-DD"), // 次日日期
  start: "",
  end: "",
});

// 日期格式 (用於日曆標題與選擇格式)
const masks = ref({
  title: "西元 YYYY 年 MM 月", // 日曆標題顯示格式
  modelValue: "YYYY-MM-DD", // 日期選擇的值格式
});

// 日期限制
const minDate = ref($dayjs().toDate()); // 最早可選當天
const maxDate = ref($dayjs().add(1, "year").toDate()); // 最晚可選下一年同一天

// 監聽並格式化日期選擇器輸出
watch(dateRange, (newVal) => {
  console.log(newVal);
  if (newVal.start) {
    newVal.start = $dayjs(newVal.start).format("YYYY-MM-DD");
  }
  if (newVal.end) {
    newVal.end = $dayjs(newVal.end).format("YYYY-MM-DD");
  }
});
// 計算總共晚數（使用 computed）
const totalNights = computed(() => {
  // 檢查 start 和 end 是否為有效日期
  if (!dateRange.value.start || !dateRange.value.end) {
    return 0; // 如果有一個值為空，返回 0 晚
  }
  const start = $dayjs(dateRange.value.start);
  const end = $dayjs(dateRange.value.end);
  return end.diff(start, "day"); // 返回天數差
});
</script>
<template>
  <main class="bg-primary-Tint">
    <section class="hidden p-12 md:block 2xl:p-20">
      <div class="relative flex gap-x-2">
        <div class="w-1/2 flex items-stretch">
          <img class="w-full rounded-l-lg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-1.png" />
        </div>
        <div class="w-1/2 flex flex-col gap-y-2">
          <div class="flex gap-x-2">
            <div class="w-1/2">
              <img class="w-full" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-2.png" />
            </div>
            <div class="w-1/2">
              <img class="w-full rounded-tr-lg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-3.png" />
            </div>
          </div>
          <div class="flex gap-x-2">
            <div class="w-1/2">
              <img class="w-full" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-4.png" />
            </div>
            <div class="w-1/2">
              <img class="w-full rounded-br-lg" src="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-5.png?raw=true" />
            </div>
          </div>
        </div>
        <button class="absolute bottom-2 right-2 px-3 py-2 bg-neutral-50 text-primary-base font-bold text-nowrap rounded-lg xl:bottom-10 xl:right-10 xl:px-8 xl:py-4">看更多</button>
      </div>
    </section>
    <section ref="swiperContainer" class="md:hidden">
      <Swiper v-if="getSwiperWidth" class="h-full" v-bind="roomsCards">
        <SwiperSlide v-for="(imgItem, itemIndex) in imgList" :key="imgItem">
          <img class="w-full h-full" :src="imgItem" :alt="`roomPicture${itemIndex}`" />
        </SwiperSlide>
      </Swiper>
    </section>
    <section class="py-10 lg:py-[120px]">
      <div class="container flex gap-x-6">
        <div class="w-full md:w-7/12">
          <div class="flex flex-col gap-y-4 mb-6 md:mb-20">
            <h2 class="font-bold text-[32px] md:text-5xl">尊爵雙人房</h2>
            <p class="font-medium text-[14px] md:text-base">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
          </div>
          <ul class="flex flex-col gap-y-6 md:gap-y-20">
            <li>
              <h3 class="ps-3 mb-4 border-s-4 border-primary-base font-bold md:text-2xl md:mb-6">房型基本資訊</h3>
              <ul class="flex items-center flex-wrap gap-x-4">
                <li class="w-[97px] h-[97px] p-3 bg-white border border-neutral-300 rounded-xl flex flex-col justify-center gap-y-2">
                  <Icon class="shrink-0 text-2xl text-primary-base" name="fluent:slide-size-24-filled" />
                  <p class="font-bold">{{ "24坪" }}</p>
                </li>
                <li class="w-[97px] h-[97px] p-3 bg-white border border-neutral-300 rounded-xl flex flex-col justify-center gap-y-2">
                  <Icon class="shrink-0 text-2xl text-primary-base" name="fluent:bed-24-filled" />
                  <p class="font-bold">{{ "1張大床" }}</p>
                </li>
                <li class="w-[97px] h-[97px] p-3 bg-white border border-neutral-300 rounded-xl flex flex-col justify-center gap-y-2">
                  <Icon class="shrink-0 text-2xl text-primary-base" name="fluent:person-24-filled" />
                  <p class="font-bold">{{ `1-${2}人` }}</p>
                </li>
              </ul>
            </li>
            <li>
              <h3 class="ps-3 mb-4 border-s-4 border-primary-base font-bold md:text-2xl md:mb-6">房間格局</h3>
              <ul class="p-6 text-nowrap font-bold bg-white grid grid-cols-3 gap-6 rounded-lg md:grid-cols-4 lg:grid-cols-5 md:gap-x-10 md:gap-y-2">
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>市景</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>獨立衛浴</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>客廳</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>書房</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>市井</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>樓層電梯</p>
                </li>
              </ul>
            </li>
            <li>
              <h3 class="ps-3 mb-4 border-s-4 border-primary-base font-bold md:text-2xl md:mb-6">房內設備</h3>
              <ul class="p-6 text-nowrap font-bold bg-white grid grid-cols-3 gap-6 rounded-lg md:grid-cols-4 lg:grid-cols-5 md:gap-x-10 md:gap-y-2">
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>平面電視</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>吹風機</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>冰箱</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>熱水壺</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>檯燈</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>衣櫃</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>除濕機</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>浴缸</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>書桌</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>音響</p>
                </li>
              </ul>
            </li>
            <li>
              <h3 class="ps-3 mb-4 border-s-4 border-primary-base font-bold md:text-2xl md:mb-6">備品提供</h3>
              <ul class="p-6 text-nowrap font-bold bg-white grid grid-cols-3 gap-6 rounded-lg md:grid-cols-4 lg:grid-cols-5 md:gap-x-10 md:gap-y-2">
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>衛生紙</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>拖鞋</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>淋浴用品</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>清潔用品</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>刮鬍刀</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>吊衣架</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>浴巾</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>刷牙用品</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>罐裝水</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <Icon class="shrink-0 text-primary-base" name="fluent:checkmark-24-filled" />
                  <p>梳子</p>
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
              <h3 class="text-4xl font-bold">尊爵雙人房</h3>
              <p>享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
            </div>
            <div class="w-full flex flex-col flex-wrap gap-y-4 gap-x-2 items-center lg:flex-row">
              <div class="p-4 flex-1 flex flex-col border rounded-lg hover:cursor-pointer">
                <label class="pointer-events-none">入住</label>
                <input class="pointer-events-none focus:outline-none" readonly type="date" />
              </div>
              <div class="p-4 flex-1 flex flex-col border rounded-lg hover:cursor-pointer">
                <label class="pointer-events-none">退房</label>
                <input class="pointer-events-none focus:outline-none" readonly type="date" />
              </div>
              <div class="w-full font-bold flex justify-between items-center">
                <p>人數</p>
                <div class="flex items-center gap-x-4">
                  <button class="p-4 flex items-center justify-center border border-neutral-200 rounded-full">
                    <Icon name="fluent:minimize-24-regular" />
                  </button>
                  <p class="px-1">{{ 1 }}</p>
                  <button class="p-4 flex items-center justify-center border border-neutral-200 rounded-full">
                    <Icon name="fluent:add-24-filled" />
                  </button>
                </div>
              </div>
            </div>
            <p class="font-bold text-primary-base sm:text-2xl" v-number-format="1000"></p>
            <button class="py-4 w-full text-white font-bold bg-primary-base rounded-lg">立即預定</button>
          </div>
        </div>
      </div>
    </section>
    <!-- <div class="fixed inset-0 flex items-center justify-center">
      <button type="button" @click="openModal" class="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">Open dialog</button>
    </div> -->
    <!-- <div class="fixed inset-0 flex items-center justify-center">
      <button type="button" @click="openConfirmModal" class="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">Open dialog</button>
    </div> -->
    <TransitionRoot class="md:hidden" appear :show="isOpenConfirm" as="template">
      <Dialog as="div" @close="closeConfirmModal" class="relative z-50">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>
        <div class="w-full fixed bottom-0 overflow-y-auto">
          <div class="flex w-full min-h-full items-center justify-center text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
              <DialogPanel class="py-4 w-full flex flex-col gap-y-10 rounded-2xl bg-white shadow-xl transform overflow-hidden transition-all md:w-2xl md:max-w-2xl">
                <div class="-mt-4 px-6 py-2 flex flex-col gap-y-4 bg-neutral-300">
                  <button class="self-start flex items-center justify-center">
                    <Icon class="text-3xl border-none" name="fluent:dismiss-24-filled" />
                  </button>
                  <div class="flex items-center gap-x-2">
                    <p class="text-2xl text-start font-bold">{{ totalNights }}晚</p>
                    <p class="font-medium">{{ dateRange.start }} - {{ dateRange.end }}</p>
                  </div>
                </div>
                <div class="px-6 flex flex-col gap-y-4">
                  <p class="text-start font-bold text-xl">選擇人數</p>
                  <p class="text-start font-medium">此房型最多供 4 人居住，不接受寵物入住。</p>
                  <div class="flex items-center gap-x-4">
                    <button class="p-4 flex items-center justify-center border border-neutral-200 rounded-full">
                      <Icon name="fluent:minimize-24-regular" />
                    </button>
                    <p class="px-1">{{ 1 }}</p>
                    <button class="p-4 flex items-center justify-center border border-neutral-200 rounded-full">
                      <Icon name="fluent:add-24-filled" />
                    </button>
                  </div>
                </div>
                <div class="px-6 font-bold flex items-center gap-x-4">
                  <button class="flex-1 py-4 rounded-lg">重新選擇日期</button>
                  <button class="flex-1 py-4 text-white bg-primary-base rounded-lg">儲存</button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex w-full min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
              <DialogPanel class="p-6 w-full flex flex-col gap-y-10 rounded-2xl bg-white shadow-xl transform overflow-hidden transition-all md:w-2xl md:max-w-2xl">
                <template v-if="windowWidthSize > 768" #default>
                  <div class="hidden items-center justify-between md:flex">
                    <div class="flex flex-col gap-y-2">
                      <p class="text-2xl text-start font-bold">{{ totalNights }}晚</p>
                      <p class="font-medium">{{ dateRange.start }} - {{ dateRange.end }}</p>
                    </div>
                    <div class="flex items-center gap-x-2 font-medium">
                      <div class="w-44 p-4 flex flex-col gap-y-2 border boprder-black rounded-lg">
                        <p class="text-[12px] text-start">入住</p>
                        <p class="text-start">{{ dateRange.start }}</p>
                      </div>
                      <div class="w-44 p-4 flex flex-col gap-y-2 border boprder-black rounded-lg">
                        <p class="text-[12px] text-start">退房</p>
                        <p class="text-start">{{ dateRange.end }}</p>
                      </div>
                    </div>
                  </div>
                  <VDatePicker v-model.range="dateRange" :masks="masks" :columns="VDatePickerCol" :rows="VDatePickerRow" :min-date="minDate" :max-date="maxDate" expanded />
                  <div class="w-full flex items-center justify-end gap-x-4 font-bold text-base">
                    <button class="px-8 py-4 rounded-lg">清除日期</button>
                    <button class="px-8 py-4 bg-primary-base text-white rounded-lg">確定日期</button>
                  </div>
                </template>
                <template v-else #default>
                  <div class="flex flex-col gap-y-2">
                    <div class="flex items-center justify-start">
                      <button class="flex items-center justify-center">
                        <Icon class="text-3xl border-none" name="fluent:dismiss-24-filled" />
                      </button>
                    </div>
                    <div>
                      <p v-if="totalNights === 0" class="text-xl font-bold text-start">選擇入住與退房日期</p>
                      <p v-else class="flex gap-x-3 items-center">
                        <span class="text-xl font-bold">{{ totalNights }}晚</span>
                        <span>{{ dateRange.start }} - {{ dateRange.end }}</span>
                      </p>
                    </div>
                  </div>
                  <VDatePicker v-model.range="dateRange" :masks="masks" :columns="VDatePickerCol" :rows="VDatePickerRow" :min-date="minDate" :max-date="maxDate" expanded />
                  <div class="w-full flex items-center justify-end gap-x-4 font-bold text-base">
                    <button class="px-8 py-4 rounded-lg">清除日期</button>
                    <button class="px-8 py-4 bg-primary-base text-white rounded-lg">確定日期</button>
                  </div>
                </template>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <section class="w-full bottom-0 fixed md:hidden bg-neutral-200">
      <div class="p-3 flex items-center justify-between gap-x-1">
        <div class="flex-1 flex flex-col items-center gap-y-1">
          <p>資訊1</p>
          <p>資訊2</p>
        </div>
        <button class="px-8 py-4 text-base font-bold text-white bg-primary-base sm:px-12 rounded-lg">查看可訂日期</button>
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
