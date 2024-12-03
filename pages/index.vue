<script setup lang="ts">
import homeHeroImg from "@/assets/images/desktop/home-hero.png";
import homeHeroImgSm from "@/assets/images/mobile/home-hero-sm.png";
import { Swiper, SwiperSlide } from "swiper/vue";
import { homeMain, homeRooms, homeCulinary } from "@/utils/swiperConfigs";
import type { ResponseNews, ResponseRooms, ResponseDelicacy } from "@/types/home";
// 引入所需的 Swiper 樣式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

// const windowScroll = useWindowScroll();
// const headerY = ref(windowScroll.y);
// const isScrolled = ref(false);
const roomsNum = ref(0);
// const isOpenMenu = ref(false);
const roomSwiper: Ref<typeof Swiper | null> = ref(null);
const HomeHeroImgList = ref([
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-1" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-2" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-3" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-4" },
]);
const { data: newsDataList } = await useFetch<ResponseNews>(`/api/new`);
const { data: culinaryDataList } = await useFetch<ResponseDelicacy>(`/api/culinary`);
const { data: roomsDataList } = await useFetch<ResponseRooms>(`/api/rooms`);
const getNewsDataList = computed(() => {
  return newsDataList.value?.result ?? [];
});

const getCulinaryDataList = computed(() => {
  const data = culinaryDataList.value?.result.map((item) => {
    const [month, time] = item.diningTime.split(" ");
    return {
      ...item,
      month,
      time,
    };
  });
  return data;
});

const getRoomsData = computed(() => {
  return roomsDataList.value?.result[roomsNum.value];
});

const getRoomsDataLength = computed(() => roomsDataList.value?.result.length || 0);

// const handleMenu = () => {
//   isOpenMenu.value = true;
// };
// const handleCloseMenu = () => {
//   isOpenMenu.value = false;
// };

const slidePrev = () => {
  roomSwiper.value?.$el.swiper.slideTo(0, 0); // 第二個參數是速度，設為 0 表示立即跳轉
  roomSwiper.value?.$el.swiper.autoplay?.start(); //執行上面，自動輪播失效，須重啟
  roomsNum.value = (roomsNum.value - 1 + getRoomsDataLength.value) % getRoomsDataLength.value;
};

const slideNext = () => {
  roomSwiper.value?.$el.swiper.slideTo(0, 0);
  roomSwiper.value?.$el.swiper.autoplay?.start();
  roomsNum.value = (roomsNum.value + 1) % getRoomsDataLength.value;
};

// onMounted(() => {
//   watch(
//     () => headerY.value,
//     (newHeaderY) => {
//       newHeaderY > 0 ? (isScrolled.value = true) : (isScrolled.value = false);
//     },
//     { immediate: true }
//   );
// });
</script>

<template>
  <!-- <header class="w-full fixed z-30 transition-all duration-300 ease-in-out" :class="{ 'bg-black': isScrolled }">
    <div class="px-3 py-6 flex items-center justify-between md:px-20">
      <h1>
        <RouterLink to="/">
          <TheSvgIcon class="w-[196px] h-[72px]" name="logo-white"></TheSvgIcon>
        </RouterLink>
      </h1>
      <ul class="hidden items-center gap-x-4 font-bold text-white md:flex">
        <li>
          <RouterLink class="block p-4" to="/">客房旅宿</RouterLink>
        </li>
        <li>
          <RouterLink class="block p-4" to="/">會員登入</RouterLink>
        </li>
        <li class="bg-primary-base rounded-xl">
          <RouterLink class="block py-4 px-8" to="/">立即訂房</RouterLink>
        </li>
      </ul>
      <div class="md:hidden">
        <button>
          <Icon class="text-white text-3xl" name="gridicons:menu" @click="handleMenu"></Icon>
        </button>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="isOpenMenu" class="p-5 fixed inset-0 w-full h-full z-50 bg-black flex flex-col items-center justify-center">
        <div class="absolute top-5 right-5">
          <button @click="handleCloseMenu">
            <Icon class="text-white text-3xl" name="gridicons:cross"></Icon>
          </button>
        </div>
        <div class="w-full">
          <ul class="flex flex-col items-center gap-y-4 font-bold text-white">
            <li class="w-full text-center">
              <RouterLink class="block p-4 w-full" to="/">客房旅宿</RouterLink>
            </li>
            <li class="w-full text-center">
              <RouterLink class="block p-4 w-full" to="/">會員登入</RouterLink>
            </li>
            <li class="w-full text-center bg-primary-base rounded-xl">
              <RouterLink class="block p-4 w-full" to="/">立即訂房</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </header> -->
  <main>
    <section class="relative">
      <Swiper ref="roomSwiper" v-bind="homeMain" class="h-full">
        <SwiperSlide v-for="heroItem in HomeHeroImgList" :key="heroItem.alt">
          <picture>
            <source :srcset="heroItem.imgSrcset" media="(min-width:576px)" />
            <img class="w-full h-screen object-cover brightness-50" :src="heroItem.imgSrc" :alt="heroItem.alt" />
          </picture>
        </SwiperSlide>
      </Swiper>

      <div class="absolute w-full top-1/2 z-20 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 md:px-20">
        <div class="w-full flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 class="basis-1/3 flex flex-col gap-y-2 font-bold text-primary-base">
              <span class="text-4xl text-center md:text-start">享樂酒店</span>
              <span class="text-2xl">Enjoyment Luxury Hotel</span>
            </h2>
            <div class="hidden mt-10 w-[30vw] h-[2px] bg-gradient-to-r from-[#BE9C7C] to-white md:block" />
          </div>

          <div class="mt-5 mb-10 h-20 w-[2px] bg-gradient-to-r from-[#BE9C7C] to-white md:hidden"></div>
          <div class="ms-auto sm:ms-0 w-[calc(100%-3rem)] sm:w-fit border-t border-r border-[#F5F7F9] rounded-[80px] py-24 backdrop-blur-sm shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
            <div class="-translate-x-12">
              <h3 class="flex flex-col gap-y-2 text-5xl lg:text-6xl 2xl:text-8xl text-white font-bold">
                <span>高雄</span>
                <span>豪華住宿之選</span>
              </h3>
              <p class="mt-6 mb-24 text-base lg:text-2xl 2xl:text-3xl text-white font-semibold">我們致力於為您提供無與倫比的奢華體驗與優質服務</p>
            </div>
            <div class="-translate-x-12">
              <RouterLink to="/" class="relative w-full flex items-center justify-end gap-x-4 bg-white p-5 md:p-[40px] rounded-md transition duration-300 ease-in-out group overflow-hidden">
                <p class="z-10 text-base text-black md:text-2xl font-bold group-hover:text-white">立即訂房</p>
                <p class="z-10 h-[1px] bg-black w-28 group-hover:bg-white"></p>
                <div class="absolute inset-0 bg-primary-base transform -translate-x-full transition-transform duration-300 group-hover:-translate-x-0"></div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-primary-Tint">
      <div class="relative container py-20 sm:py-32">
        <div class="flex flex-col md:flex-row gap-x-6 gap-y-10">
          <div class="md:w-1/6">
            <div class="w-fit">
              <h2 class="text-3xl md:text-4xl text-primary-base font-bold pe-10 pb-10">
                最新
                <br />
                消息
              </h2>
              <div class="w-full h-[2px] bg-gradient-to-r from-[#BE9C7C] to-white md:block" />
            </div>
          </div>
          <div class="md:w-5/6">
            <ul class="flex flex-col gap-y-10">
              <li class="flex flex-col items-center gap-6 sm:flex-row" v-for="newsItem in getNewsDataList" :key="newsItem._id">
                <div class="w-full sm:w-2/5 flex-shrink-0 sm:self-stretch">
                  <img :src="newsItem.image" class="w-full max-h-[294px] h-full rounded-xl" :alt="newsItem.title" />
                </div>
                <div class="flex flex-col gap-y-6">
                  <h3 class="text-2xl md:text-3xl font-bold">{{ newsItem.title }}</h3>
                  <p class="font-medium">{{ newsItem.description }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <TheSvgIcon class="hidden absolute top-[100px] right-3 w-[200px] h-[200px] lg:block 3xl:translate-x-24 4xl:translate-x-32" name="deco-dot-group"></TheSvgIcon>
        <TheSvgIcon class="hidden absolute bottom-0 translate-y-20 w-[200px] h-[200px] lg:block 3xl:-translate-x-24 4xl:-translate-x-32" name="deco-dot-group"></TheSvgIcon>
      </div>
    </section>
    <section class="bg-black pt-28 pb-32">
      <div class="bg-home-about bg-cover bg-center bg-no-repeat">
        <div class="container">
          <div class="text-white flex justify-end gap-x-6 translate-y-10 md:translate-y-20">
            <div class="w-full md:w-5/6 flex flex-col p-6 gap-y-10 md:gap-y-20 md:p-20 border-s border-b border-white bg-[linear-gradient(180deg,rgba(20,15,10,0.8)_0%,rgba(190,156,124,0.8)_100%)] rounded-[80px_80px_0px_80px] backdrop-blur-[10px]">
              <div class="p-2 flex items-center gap-x-10">
                <h2 class="font-bold text-3xl md:text-5xl text-nowrap">
                  關於
                  <br />
                  我們
                </h2>
                <div class="w-full md:w-40 h-[2px] bg-white"></div>
              </div>
              <div class="p-2 flex flex-col gap-y-4 md:gap-y-10">
                <p>享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。 我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。</p>
                <p>我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。 我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。</p>
                <p>在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。</p>
                <p>享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="relative bg-black py-10 md:py-[120px] overflow-x-hidden">
      <TheSvgIcon class="text-primary-base w-[1920px] static z-10 xl:absolute xl:left-1/3" name="deco-line-group-horizontal-full"></TheSvgIcon>
      <div class="px-3 flex flex-col md:flex-row items-stretch gap-x-20 gap-y-6">
        <Swiper ref="roomSwiper" v-bind="homeRooms" class="room-sweiper w-full lg:w-1/2">
          <SwiperSlide v-for="(imgItem, index) in getRoomsData?.imageUrlList" :key="index">
            <picture>
              <img class="w-full object-cover max-h-[900px]" :src="imgItem" :alt="imgItem + index" />
            </picture>
          </SwiperSlide>
        </Swiper>
        <div class="flex flex-col w-full lg:w-1/3 gap-y-10 text-white mt-auto">
          <div class="flex flex-col gap-y-4">
            <h2 class="text-4xl lg:text-5xl font-bold">{{ getRoomsData?.name }}</h2>
            <p>{{ getRoomsData?.description }}</p>
          </div>
          <p class="text-3xl font-bold">NT$ {{ getRoomsData?.price }}</p>
          <RouterLink to="/" class="relative w-full flex items-center justify-end gap-x-4 bg-white p-5 lg:p-[40px] rounded-md transition duration-300 ease-in-out group overflow-hidden">
            <p class="z-10 text-base text-nowrap text-black md:text-2xl font-bold group-hover:text-white">查看更多</p>
            <p class="z-10 h-[1px] bg-black w-28 group-hover:bg-white"></p>
            <div class="absolute inset-0 bg-primary-base transform -translate-x-full transition-transform duration-300 group-hover:-translate-x-0"></div>
          </RouterLink>
          <div class="flex items-center justify-end text-primary-base">
            <button class="p-4" @click="slidePrev"><Icon name="material-symbols:arrow-back-rounded"></Icon></button>
            <button class="p-4" @click="slideNext"><Icon name="material-symbols:arrow-forward"></Icon></button>
          </div>
        </div>
      </div>
    </section>
    <section class="relative bg-primary-Tint py-20 lg:py-[120px]">
      <TheSvgIcon class="hidden text-primary-base absolute left-10 z-10 w-[180px] h-[1068px] 4xl:block" name="deco-line-group-vertical"></TheSvgIcon>
      <div class="container">
        <div class="flex items-center mb-10 md:mb-20">
          <h2 class="flex flex-col text-nowrap gap-y-1 text-3xl md:text-4xl text-primary-base font-bold pe-10">
            <span>佳餚</span>
            <span>美饌</span>
          </h2>
          <div class="w-full h-[2px] bg-gradient-to-r from-[#BE9C7C] to-white sm:w-1/6" />
        </div>
        <Swiper v-bind="homeCulinary">
          <SwiperSlide v-for="(culinaryItem, index) in getCulinaryDataList" :key="culinaryItem._id">
            <div class="relative">
              <picture>
                <img class="w-full object-cover min-h-[400px] max-h-[600px] rounded-xl" :src="culinaryItem.image" :alt="culinaryItem.title" />
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
      </div>
    </section>
    <section class="relative bg-black py-20 md:py-28">
      <div class="container">
        <div class="flex items-center mb-10 md:mb-20">
          <h2 class="flex flex-col text-nowrap gap-y-1 text-3xl md:text-4xl text-primary-base font-bold pe-10">
            <span>交通</span>
            <span>方式</span>
          </h2>
          <div class="w-full h-[2px] bg-gradient-to-r from-[#BE9C7C] to-white sm:w-1/6" />
        </div>
        <div class="py-1 md:py-6">
          <p class="py-4 text-white">台灣高雄市新興區六角路123號</p>
          <picture>
            <source srcset="@/assets/images/desktop/home-map.png" media="(min-width: 576px)" />
            <img class="w-full" src="@/assets/images/mobile/home-map-sm.png" alt="描述地圖中酒店所在的位置" />
          </picture>
        </div>
        <ul class="text-white flex flex-col gap-6 flex-nowrap sm:flex-row">
          <li class="flex-1 flex flex-col gap-y-2 md:gap-y-6">
            <Icon class="text-primary-base text-2xl" name="material-symbols:directions-car"></Icon>
            <div class="flex flex-col gap-y-2">
              <h3 class="font-bold text-xl md:text-2xl">自行開車</h3>
              <p class="font-medium">如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。</p>
            </div>
          </li>
          <li class="flex-1 flex flex-col gap-y-2 md:gap-y-6">
            <Icon class="text-primary-base text-2xl" name="material-symbols:train"></Icon>
            <div class="flex flex-col gap-y-2">
              <h3 class="font-bold text-xl md:text-2xl">高鐵/火車</h3>
              <p class="font-medium">如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。</p>
            </div>
          </li>
          <li class="flex-1 flex flex-col gap-y-2 md:gap-y-6">
            <Icon class="text-primary-base text-2xl" name="gis:car"></Icon>
            <div class="flex flex-col gap-y-2">
              <h3 class="font-bold text-xl md:text-2xl">禮賓車服務</h3>
              <p class="font-medium">承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </main>
  <!-- <footer class="py-20 bg-black">
    <div class="container flex flex-col gap-y-10">
      <div class="flex flex-col gap-y-10 md:flex-row md:justify-between md:items-center">
        <div class="flex flex-col gap-y-10">
          <RouterLink to="/">
            <TheSvgIcon class="w-[196px] h-[72px]" name="logo-white"></TheSvgIcon>
          </RouterLink>
          <div class="flex gap-x-4">
            <RouterLink to="/">
              <Icon class="text-white text-2xl" name="lineicons:line"></Icon>
            </RouterLink>
            <RouterLink to="/">
              <Icon class="text-white text-2xl" name="lineicons:instagram-original"></Icon>
            </RouterLink>
          </div>
        </div>
        <ul class="text-white grid gap-x-20 gap-y-4 md:grid-cols-2 md:gap-y-10">
          <li>
            <p class="font-bold">TEL:</p>
            <p>
              <a href="tel:+886-7-1234567">+886-7-1234567</a>
            </p>
          </li>
          <li>
            <p class="font-bold">MAIL:</p>
            <p>
              <a href="mailto:elh@hexschool.com">elh@hexschool.com</a>
            </p>
          </li>
          <li>
            <p class="font-bold">FAX:</p>
            <p>+886-7-1234567</p>
          </li>
          <li>
            <p class="font-bold">WEB:</p>
            <p>
              <a href="https://www.elhhexschool.com.tw" target="_blank" rel="noopener noreferrer">www.elhhexschool.com.tw</a>
            </p>
          </li>
        </ul>
      </div>
      <div class="flex flex-col md:flex-row items-start md:items-center md:justify-between text-white">
        <address>806023 台灣高雄市新興區六角路123號</address>
        <p>&copy; 享樂酒店 2023 All Rights Reserved.</p>
      </div>
    </div>
  </footer> -->
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
.room-sweiper {
  margin-left: 0px;
  margin-right: 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
