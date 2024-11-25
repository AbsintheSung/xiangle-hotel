// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@vueuse/nuxt'],
  css: ['~/assets/scss/index.scss', '~/assets/tailwind.css',],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;'
        }
      }
    }
  },
  vue: {
    compilerOptions: {
      //所有以 "swiper-" 開頭標籤（如 <swiper-container>, <swiper-slide> 等）都將被視為自定義元素，而非未知的HTML元素。
      isCustomElement: (tag) => tag.startsWith("swiper-"),
    },
  },
})