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
    [
      '@pinia/nuxt',
      {
        'autoImports': ['defineStore', 'acceptHMRUpdate'],
      },
    ]
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
  pinia: {
    storesDirs: ['./stores/**'], // 自動匯入 /stores 目錄下的所有 store
  },
  runtimeConfig: {
    // 私有
    // apiSecret: process.env.NUXT_API_SECRET, // 可以被 NUXT_API_SECRET 覆蓋

    // 公開
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL || 'https://nuxr3.zeabur.app',
      cookieUser: process.env.NUXT_PUBLIC_COOKIE_USER,
      cookieAuth: process.env.NUXT_PUBLIC_COOKIE_AUTH,
    }
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