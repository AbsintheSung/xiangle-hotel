import { Navigation, EffectCreative, Pagination, Autoplay } from "swiper/modules";
export const homeMain = {
  modules: [Navigation, EffectCreative, Pagination],
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    dynamicBullets: true,
    clickable: true,
  },
};

export const homeRooms = {
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

export const homeCulinary = {
  modules: [Navigation, EffectCreative, Pagination, Autoplay],
  slidesPerView: 1.2,
  spaceBetween: "24px",
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    375: {
      slidesPerView: 1.2,
    },
    768: {
      slidesPerView: 2.2,
    },
    1024: {
      slidesPerView: 3.2,
    },
  },
};