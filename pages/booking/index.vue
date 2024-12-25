<script setup lang="ts">
//測試用進入: http://localhost:3000/booking?roomId=65251f6095429cd58654bf12&checkInDate=2024-12-14&checkOutDate=2025-01-12&peopleNum=4
import type { RoomDetailResponse } from "~/types/roomdetail";
import type { ResponseOrder } from "~/types/order";
import LoadingOverlay from "./components/LoadingOverlay.vue";
import { useDomStore } from "~/stores/dom";
const domStore = useDomStore();
const { y: windowScrollY } = useWindowScroll();
const isLoading = ref(false);
const formRef = ref<HTMLFormElement | null>(null);
const route = useRoute();
const router = useRouter();
const { $dayjs } = useNuxtApp();
const config = useRuntimeConfig();
const authStore = useAuthStore();
const { width: windowWidthSize } = useWindowSize();
const { $swal } = useNuxtApp();
const { data: roomDetail } = await useFetch<RoomDetailResponse>(`https://nuxr3.zeabur.app/api/v1/rooms/${route.query.roomId}`);
console.log("roomDetail", roomDetail.value);
// 取得 URL 參數
const bookingData = ref({
  roomId: route.query.roomId as string,
  checkInDate: $dayjs(route.query.checkInDate as string).format("YYYY/MM/DD"),
  checkOutDate: $dayjs(route.query.checkOutDate as string).format("YYYY/MM/DD"),
  peopleNum: Number(route.query.peopleNum) as number,
});

const marginTopStyle = computed(() => {
  return windowScrollY.value > 0 ? { marginTop: `${domStore.headerDomHeight}px` } : {};
});
const getCheckInWeek = computed(() => {
  // 檢查是否符合 YYYY/MM/DD 格式
  if (!$dayjs(bookingData.value.checkInDate, "YYYY/MM/DD", true).isValid()) {
    return "";
  }
  const date = $dayjs(bookingData.value.checkInDate);
  // 取得星期幾的中文名稱
  const weekDay = date.format("dddd"); // dayjs 會根據 locale 自動轉換成中文
  // 格式化日期為 MM/DD 星期X
  return `${date.format("YYYY/MM/DD")} ${weekDay}`;
});
const getCheckOutWeek = computed(() => {
  // 檢查是否符合 YYYY/MM/DD 格式
  if (!$dayjs(bookingData.value.checkOutDate, "YYYY/MM/DD", true).isValid()) {
    return "";
  }
  const date = $dayjs(bookingData.value.checkOutDate);
  // 取得星期幾的中文名稱
  const weekDay = date.format("dddd"); // dayjs 會根據 locale 自動轉換成中文
  // 格式化日期為 MM/DD 星期X
  return `${date.format("YYYY/MM/DD")} ${weekDay}`;
});
const getRoomDetailImg = computed(() => roomDetail.value?.result.imageUrl);
const getRoomDetailPrice = computed(() => roomDetail.value?.result.price);

const getTotalNights = computed(() => {
  // 檢查 start 和 end 是否為有效日期
  if (!bookingData.value.checkInDate || !bookingData.value.checkOutDate) {
    return 0; // 如果有一個值為空，返回 0 晚
  }
  const start = $dayjs(bookingData.value.checkInDate);
  const end = $dayjs(bookingData.value.checkOutDate);
  return end.diff(start, "day"); // 返回天數差
});
const getTotalPrice = computed(() => {
  if (getRoomDetailPrice.value === undefined) {
    return 0;
  } else {
    return getRoomDetailPrice.value * getTotalNights.value;
  }
});

const groupedInfo = computed(() => ({
  layoutInfo: roomDetail.value?.result.layoutInfo,
  facilityInfo: roomDetail.value?.result.facilityInfo,
  amenityInfo: roomDetail.value?.result.amenityInfo,
}));
const ROOM_TiTLES = {
  layoutInfo: "房間格局",
  facilityInfo: "房內設備",
  amenityInfo: "備品提供",
};

const getRoomId = computed(() => bookingData.value.roomId);
const getCheckInDate = computed(() => bookingData.value.checkInDate);
const getCheckOutDate = computed(() => bookingData.value.checkOutDate);
const getPeopleNum = computed(() => bookingData.value.peopleNum);
import * as zod from "zod";
import { taiwanCity } from "~/content/city";

// 定義地址結構
type Address = {
  zipcode?: number | null; // 郵遞區號（可選）
  detail: string; // 詳細地址
  city: string; // 城市
  county: string; // 縣市
};

// 定義註冊資料結構
type BookingForm = {
  name: string; // 姓名
  email: string; // 電子郵件
  phone: string; // 電話號碼
  // birthday: string;    // 生日，格式 yyyy/mm/dd
  address: Address; // 地址
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
};

const bookingForm = ref<BookingForm>({
  name: "",
  email: "",
  phone: "",
  // birthday: "", //字串，格式為 yyyy/mm/dd
  address: {
    zipcode: null, //會傳入 number
    detail: "",
    city: "",
    county: "",
  },
  roomId: getRoomId.value,
  checkInDate: getCheckInDate.value,
  checkOutDate: getCheckOutDate.value,
  peopleNum: getPeopleNum.value,
});
const personalInfoSchema = zod.object({
  name: zod.string().min(1, { message: "姓名為必填" }),
  phone: zod.string().refine((value) => {
    const taiwanPhoneRegex = /^09\d{8}$/;
    return taiwanPhoneRegex.test(value);
  }, "請輸入有效的台灣電話號碼"),
  email: zod.string().email({ message: "請輸入有效的電子郵件地址" }),
  // year: zod.string().min(1, { message: "請選取正確日期" }),
  // month: zod.string().min(1, { message: "請選取正確日期" }),
  // day: zod.string().min(1, { message: "請選取正確日期" }),
  city: zod.string().min(1, { message: "請填入和選取正確地址" }),
  county: zod.string().min(1, { message: "請填入和選取正確地址" }),
  detailAddress: zod.string().min(1, { message: "請填入和選取正確地址" }),
  // agreeToTerms: zod.boolean().refine((value) => value === true, {
  //   message: "必須同意條款才能註冊",
  // }),
});
const { handleSubmit: handlePersonForm, resetForm: resetPersonForm } = useForm({
  validationSchema: toTypedSchema(personalInfoSchema),
  initialValues: {
    name: "",
    phone: "",
    email: "",
    // year: "",
    // month: "",
    // day: "",
    city: "",
    county: "",
    detailAddress: "",
    // agreeToTerms: false,
  },
});
// const { value: email, errorMessage: emailError } = useField("email");
// const { value: name, errorMessage: nameError } = useField("name");
// const { value: phone, errorMessage: phoneError } = useField("phone");
// const { value: city, errorMessage: cityError } = useField("city");
// const { value: county, errorMessage: countyError } = useField("county");
// const { value: detailAddress, errorMessage: detailAddressError } = useField("detailAddress");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: phone, errorMessage: phoneError } = useField<string>("phone");
const { value: city, errorMessage: cityError } = useField<string>("city");
const { value: county, errorMessage: countyError } = useField<string>("county");
const { value: detailAddress, errorMessage: detailAddressError } = useField<string>("detailAddress");

// 添加一個計算屬性來整合地址錯誤訊息
const addressErrorMessage = computed(() => {
  const hasError = [cityError.value, countyError.value, detailAddressError.value].some((error) => error !== undefined);
  return hasError ? "請填入和選取正確地址" : undefined;
});
const handleBooking = handlePersonForm(
  async (values) => {
    const cityData = taiwanCity.find((cityItem) => cityItem.name === city.value);
    const districtsData = cityData?.districts.find((districtItem) => districtItem.name === county.value);
    const zipcode: number = Number(districtsData?.zip);

    bookingForm.value.name = name.value as string;
    bookingForm.value.phone = phone.value as string;
    bookingForm.value.email = email.value as string;
    bookingForm.value.address.city = city.value as string;
    bookingForm.value.address.county = county.value as string;
    bookingForm.value.address.detail = detailAddress.value as string;
    bookingForm.value.address.zipcode = zipcode;
    // console.log("表單提交成功", bookingForm.value);
    isLoading.value = true;
    try {
      const response = await $fetch<ResponseOrder>(`${config.public.apiBase}/api/v1/orders`, {
        method: "POST",
        headers: {
          Authorization: `${useCookie(config.public.cookieAuth).value}`,
        },
        body: {
          roomId: getRoomId.value,
          checkInDate: bookingForm.value.checkInDate,
          checkOutDate: bookingForm.value.checkOutDate,
          peopleNum: getPeopleNum.value,
          userInfo: {
            address: {
              ...bookingForm.value.address,
            },
            name: bookingForm.value.name,
            phone: bookingForm.value.phone,
            email: bookingForm.value.email,
          },
        },
      });
      if (response.status) {
        isLoading.value = false;
        router.push(`/order/${response.result._id}`);
      }
      console.log("訂房回傳", response);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
    // const data = {
    //   roomId: getRoomId.value,
    //   checkInDate: bookingForm.value.checkInDate,
    //   checkOutDate: bookingForm.value.checkOutDate,
    //   peopleNum: getPeopleNum.value,
    //   userInfo: {
    //     address: {
    //       ...bookingForm.value.address,
    //     },
    //     name: bookingForm.value.name,
    //     phone: bookingForm.value.phone,
    //     email: bookingForm.value.email,
    //   },
    // };
    // console.log(data);
  },
  (errors) => {
    console.log("表單驗證失敗", errors);
    // if (windowWidthSize.value < 768) {
    // Scroll to form with smooth behavior
    formRef.value?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    // }
  }
);
//處理城市地區
const cityOptions = computed(() => taiwanCity.map((city) => city.name));
const countyOptions = computed(() => {
  const cityData = taiwanCity.find((cityItem) => cityItem.name === city.value);
  return cityData ? cityData.districts : []; // 如果找不到城市，返回空陣列
});

const isHandleMemberInfo = ref<boolean>(false);
watch([() => city.value, () => isHandleMemberInfo.value], ([newCity, newIsHandleMemberInfo], [oldCity, oldIsHandleMemberInfo]) => {
  if (newCity === "") return;

  if (newIsHandleMemberInfo) {
    isHandleMemberInfo.value = false;
  } else if (newCity !== oldCity) {
    county.value = "";
  }
});

const handleMemberInfo = async () => {
  const isAuth = await authStore.checkAuthBoolen();
  if (!isAuth) {
    $swal.fire({
      position: "center",
      icon: "warning",
      title: "系統警告",
      text: "請重新登入",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    isHandleMemberInfo.value = true;
    name.value = authStore.getAuthData?.name as string;
    email.value = authStore.getAuthData?.email as string;
    phone.value = authStore.getAuthData?.phone as string;
    city.value = authStore.getAuthData?.address.city as string;
    county.value = authStore.getAuthData?.address.county as string;
    detailAddress.value = authStore.getAuthData?.address.detail as string;
  }

  // console.log("獲取會員資料，並填入");
  // isHandleMemberInfo.value = true;
  // name.value = "Jack";
  // email.value = "e@gmail.com";
  // phone.value = "0911111111";
  // city.value = "高雄市";
  // county.value = "三民區";
  // detailAddress.value = "測試地址";
};
</script>
<template>
  <LoadingOverlay :is-loading="isLoading" />
  <main class="py-10 md:py-[120px] bg-primary-Tint" :style="marginTopStyle">
    <section class="container flex items-center gap-x-2">
      <NuxtLink class="p-1 w-fit flex items-center justify-center" :to="`/room-detail/${getRoomId}`">
        <Icon class="text-xl" name="fluent:chevron-left-24-filled" />
      </NuxtLink>
      <h2 class="text-3xl font-bold">確認訂房資訊</h2>
    </section>
    <section class="py-10 container flex flex-col gap-x-6 gap-y-10 md:flex-row">
      <div class="w-full flex flex-col gap-y-10 md:w-7/12">
        <div>
          <h3 class="mb-8 text-2xl font-bold md:mb-10">確認訂房資訊</h3>
          <ul class="flex flex-col gap-y-6">
            <li class="relative flex flex-col gap-y-2">
              <h4 class="px-3 font-bold border-s-4 border-primary-base">選擇房型</h4>
              <p class="font-medium">{{ roomDetail?.result.name }}</p>
              <button class="absolute right-0 top-1/2 font-bold -translate-y-1/2">編輯</button>
            </li>
            <li class="relative flex flex-col gap-y-2">
              <h4 class="px-3 font-bold border-s-4 border-primary-base">訂房日期</h4>
              <ul class="flex flex-col gap-y-2 font-medium">
                <li>{{ `入住: ${getCheckInWeek}` }}</li>
                <li>{{ `退房: ${getCheckOutWeek}` }}</li>
              </ul>
              <button class="absolute right-0 top-1/2 font-bold -translate-y-1/2">編輯</button>
            </li>
            <li class="relative flex flex-col gap-y-2">
              <h4 class="px-3 font-bold border-s-4 border-primary-base">房客人數</h4>
              <p class="font-medium">{{ getPeopleNum }}人</p>
              <button class="absolute right-0 top-1/2 font-bold -translate-y-1/2">編輯</button>
            </li>
          </ul>
        </div>
        <div>
          <div class="mb-8 flex items-center justify-between md:mb-10">
            <h3 class="text-2xl font-bold">訂房人資訊</h3>
            <button class="text-primary-base underline hover:text-primary-120" @click="handleMemberInfo">套用會員資料</button>
          </div>
          <form ref="formRef" class="w-full flex flex-col items-center gap-y-4">
            <div class="relative w-full flex flex-col gap-y-2">
              <label class="font-bold">姓名</label>
              <input v-model="name" type="text" class="p-4 text-black font-bold rounded-lg" placeholder="請輸入姓名" />
              <Transition name="error-mes-anime">
                <span v-if="nameError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ nameError }}</span>
              </Transition>
            </div>
            <div class="relative w-full flex flex-col gap-y-2">
              <label class="font-bold">手機號碼</label>
              <input v-model="phone" type="phone" class="p-4 text-black font-bold rounded-lg" placeholder="請輸入手機號碼" />
              <Transition name="error-mes-anime">
                <span v-if="phoneError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ phoneError }}</span>
              </Transition>
            </div>
            <div class="relative w-full flex flex-col gap-y-2">
              <label class="font-bold">電子信箱</label>
              <input v-model="email" type="email" class="p-4 text-black font-bold rounded-lg" placeholder="請輸入電子信箱" />
              <Transition name="error-mes-anime">
                <span v-if="emailError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ emailError }}</span>
              </Transition>
            </div>
            <div class="relative w-full flex flex-col gap-y-2">
              <label class="font-bold">地址</label>
              <div class="relative flex items-center gap-x-2">
                <div class="relative flex-1 w-full">
                  <select v-model="city" class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                    <option disabled value="">城市</option>
                    <option v-for="cityItem in cityOptions" :key="cityItem" :value="cityItem">{{ cityItem }}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
                  </div>
                </div>
                <div class="relative flex-1 w-full">
                  <select v-model="county" class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                    <option disabled value="">地區</option>
                    <option v-for="countyItem in countyOptions" :key="countyItem.zip" :value="countyItem.name">{{ countyItem.name }}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
                  </div>
                </div>
              </div>
              <input v-model="detailAddress" type="text" class="p-4 text-black fond-bold rounded-lg" placeholder="請輸入詳細地址" />
              <Transition name="error-mes-anime">
                <span v-if="addressErrorMessage !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">
                  {{ addressErrorMessage }}
                </span>
              </Transition>
            </div>
          </form>
        </div>
        <div>
          <h3 class="mb-8 text-2xl font-bold md:mb-10">房間資訊</h3>
          <ul class="flex flex-col gap-y-6">
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
          </ul>
        </div>
      </div>

      <!-- 側欄-價格確認 -->
      <aside class="relative w-full md:w-5/12">
        <div class="p-10 flex flex-col gap-y-10 bg-white rounded-[20px] md:sticky md:top-40">
          <div>
            <img :src="getRoomDetailImg" alt="房型圖片1" class="rounded-lg" />
          </div>
          <div class="flex flex-col gap-y-6">
            <h4 class="font-bold text-[28px]">價格詳情</h4>
            <ul class="pb-6 flex flex-col gap-y-3 border-b border-neutral-300">
              <li class="flex">
                <div class="flex items-center gap-x-1">
                  <p class="font-medium" v-number-format="getRoomDetailPrice"></p>
                  <p>x</p>
                  <p>{{ getTotalNights }}晚</p>
                </div>
                <p class="ms-auto font-medium" v-number-format="getTotalPrice"></p>
              </li>
              <li class="flex">
                <p>住宿折扣</p>
                <p class="ms-auto text-primary-base">-NT$0</p>
              </li>
            </ul>
            <div class="flex items-center">
              <p class="font-bold">總價</p>
              <p class="ms-auto font-bold" v-number-format="getTotalPrice"></p>
            </div>
          </div>
          <div>
            <button class="w-full py-4 bg-primary-base text-white rounded-lg" @click="handleBooking">確認訂房</button>
          </div>
        </div>
      </aside>
    </section>
  </main>
</template>
<style scoped lang="scss">
.error-mes-anime-enter-active,
.error-mes-anime-leave-active {
  transition: opacity 0.2s ease;
}

.error-mes-anime-enter-from,
.error-mes-anime-leave-to {
  opacity: 0;
}
</style>
