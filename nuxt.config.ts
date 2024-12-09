// https://nuxt.com/docs/api/configuration/nuxt-config
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// 添加這個型別擴充( TypeScript 不知道 headlessui 是 Nuxt 配置的有效屬性)
declare module 'nuxt/schema' {
  interface NuxtConfig {
    headlessui?: {
      prefix?: string
    }
  }
}
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'nuxt-headlessui',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@vee-validate/nuxt',
    '@samk-dev/nuxt-vcalendar',
  ],
  css: ['~/assets/scss/index.scss', '~/assets/tailwind.css',],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;'
        }
      }
    },
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/svg')],
        symbolId: '[dir]/[name]',
        customDomId: '__svg__icons__dom__',
      }),
    ],
  },
  vue: {
    compilerOptions: {
      //所有以 "swiper-" 開頭標籤（如 <swiper-container>, <swiper-slide> 等）都將被視為自定義元素，而非未知的HTML元素。
      isCustomElement: (tag) => tag.startsWith("swiper-"),
    },
  },
  headlessui: {
    prefix: 'Headless'
  }
})