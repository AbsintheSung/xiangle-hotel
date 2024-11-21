<script setup lang="ts">
//使用 TheSvg 組件的 svg deco-line-group-horizontal-sm系列的會異常，這類型使用 css backackgroundImage方式處理
import homeHeroImg from "@/assets/images/desktop/home-hero.png";
import homeHeroImgSm from "@/assets/images/mobile/home-hero-sm.png";
import decoDotGroupSvg from "@/assets/svg/sprite/deco-dot-group.svg";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, EffectCreative, Pagination, Autoplay } from "swiper/modules";
// 引入所需的 Swiper 樣式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
// const roomSwiper = ref(null);
const roomSwiper: Ref<typeof Swiper | null> = ref(null);
const HomeHeroImgList = ref([
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-1" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-2" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-3" },
  { imgSrc: homeHeroImgSm, imgSrcset: homeHeroImg, alt: "hero banner-4" },
]);
const swiperConfig = {
  modules: [Navigation, EffectCreative, Pagination],
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    dynamicBullets: true,
    clickable: true,
  },
};
const swiperConfig2 = {
  modules: [Navigation, EffectCreative, Pagination, Autoplay],
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    dynamicBullets: true,
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
};
const slidePrev = () => {
  roomSwiper.value?.$el.swiper.slidePrev();
};

const slideNext = () => {
  roomSwiper.value?.$el.swiper.slideNext();
};
</script>

<template>
  <main>
    <section class="relative">
      <Swiper v-bind="swiperConfig" class="h-full">
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
              <RouterLink to="/" class="test w-full flex items-center justify-end gap-x-4 bg-white md:bg-primary-base p-5 md:p-[40px] rounded-md">
                <p class="text-base text-black md:text-2xl md:text-white font-bold">立即訂房</p>
                <p class="h-[1px] bg-black md:bg-white w-28"></p>
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
              <li class="flex flex-col items-center gap-6 sm:flex-row">
                <div class="w-full sm:w-2/5 flex-shrink-0 sm:self-stretch">
                  <picture>
                    <source srcset="@/assets/images/desktop/home-news-1.png 474w, @/assets/images/mobile/home-news-sm-1.png 351w" media="(min-width: 576px)" />
                    <img src="@/assets/images/mobile/home-news-sm-1.png" class="w-full max-h-[294px] h-full rounded-xl" alt="可看見海景及泳池的套房" />
                  </picture>
                </div>
                <div class="flex flex-col gap-y-6">
                  <h3 class="text-2xl md:text-3xl font-bold">秋季旅遊，豪華享受方案</h3>
                  <p class="font-medium">秋天就是要來場豪華的旅遊！我們為您準備了一系列的秋季特別方案，包括舒適的住宿、美食饗宴，以及精彩的活動。不論您是想來一趟浪漫之旅，還是想和家人共度美好時光，都能在這裡找到最適合的方案。</p>
                </div>
              </li>
              <li class="flex flex-col items-center gap-6 sm:flex-row">
                <div class="w-full sm:w-2/5 flex-shrink-0 sm:self-stretch">
                  <picture>
                    <source srcset="@/assets/images/desktop/home-news-2.png 474w, @/assets/images/mobile/home-news-sm-2.png 351w" media="(min-width: 576px)" />
                    <img src="@/assets/images/mobile/home-news-sm-2.png" class="w-full max-h-[294px] h-full rounded-xl" alt="可看見海景及泳池的套房" />
                  </picture>
                </div>
                <div class="flex flex-col gap-y-6">
                  <h3 class="text-2xl md:text-3xl font-bold">輕鬆住房專案</h3>
                  <p class="font-medium">我們知道，有時候您只是需要一個舒適的地方放鬆心情。因此，我們推出了「輕鬆住房專案」，讓您無壓力地享受住宿。不管是短期的休息，還是長期的住宿，我們都會以最貼心的服務，讓您感到賓至如歸。</p>
                </div>
              </li>
              <li class="flex flex-col items-center gap-6 sm:flex-row">
                <div class="w-full sm:w-2/5 flex-shrink-0 sm:self-stretch">
                  <picture>
                    <source srcset="@/assets/images/desktop/home-news-3.png 474w, @/assets/images/mobile/home-news-sm-3.png 351w" media="(min-width: 576px)" />
                    <img src="@/assets/images/mobile/home-news-sm-3.png" class="w-full max-h-[294px] h-full rounded-xl" alt="可看見海景及泳池的套房" />
                  </picture>
                </div>
                <div class="flex flex-col gap-y-6">
                  <h3 class="text-2xl md:text-3xl font-bold">耶誕快樂，住房送禮</h3>
                  <p class="font-medium">聖誕節來臨，我們為您準備了特別的禮物！在聖誕期間訂房，不僅有特別優惠，還會送上我們精心準備的聖誕禮物。讓我們一起慶祝這個溫馨的節日吧！</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <TheSvg :class="'hidden absolute top-[100px] right-3  w-[200px] h-[200px] lg:block 3xl:translate-x-24 4xl:translate-x-32'" :svgSrc="decoDotGroupSvg" svgId="deco-dot-group" />
        <TheSvg :class="'hidden absolute bottom-0 translate-y-20 w-[200px] h-[200px] lg:block 3xl:-translate-x-24 4xl:-translate-x-32'" :svgSrc="decoDotGroupSvg" svgId="deco-dot-group" />
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
    <section class="relative bg-black py-10 md:py-[120px]">
      <div class="horizontal hidden xl:block 2xl:top-40"></div>
      <div class="px-3 flex flex-col md:flex-row items-center gap-x-20 gap-y-6">
        <Swiper ref="roomSwiper" v-bind="swiperConfig2" class="room-sweiper w-full lg:w-1/2">
          <SwiperSlide v-for="(num, index) in 5" :key="index">
            <picture>
              <source srcset="@/assets/images/desktop/home-room-1.png" media="(min-width:768px)" />
              <img class="w-full object-cover" src="@/assets/images/mobile/home-room-sm-1.png" alt="room-a" />
            </picture>
          </SwiperSlide>
        </Swiper>
        <div class="me-auto flex flex-col gap-y-10 text-white mt-auto">
          <div class="flex flex-col gap-y-4">
            <h2 class="text-4xl lg:text-5xl font-bold">尊爵雙人房</h2>
            <p>享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
          </div>
          <p class="text-3xl font-bold">NT$ 10,000</p>
          <RouterLink to="/" class="w-full flex items-center justify-end gap-x-4 bg-white p-5 lg:p-[40px] rounded-md">
            <p class="text-base text-nowrap text-black md:text-2xl font-bold">查看更多</p>
            <p class="h-[1px] bg-black w-28"></p>
          </RouterLink>
          <div class="flex items-center justify-end text-primary-base">
            <button class="p-4" @click="slidePrev"><Icon name="material-symbols:arrow-back-rounded"></Icon></button>
            <button class="p-4" @click="slideNext"><Icon name="material-symbols:arrow-forward"></Icon></button>
          </div>
        </div>
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
.room-sweiper {
  // width: 50%;
  margin-left: 0px;
  margin-right: 0px;
}
.horizontal {
  position: absolute;
  width: 60%;
  height: 150px;
  right: 0;
  z-index: 10;
  background-image: url("@/assets/svg/deco-line-group-horizontal-full.svg");
}
</style>
