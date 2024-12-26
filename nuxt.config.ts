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
    ],
    'nuxt-easy-lightbox'
  ],
  css: ['~/assets/scss/index.scss', '~/assets/css/tailwind.css', '~/assets/css/page-transitions.css'],
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
  },
  app: {
    head: {
      title: '享樂酒店',
      htmlAttrs: {
        lang: 'zh-TW'
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        { charset: 'utf-8' }, // 字符編碼
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '這是一個關於享樂酒店的豪華住宿預訂網站，提供獨特的房型選擇。'
        },
        { name: 'keywords', content: '享樂酒店, 酒店預訂, 豪華住宿, 房型' }, // 關鍵字
        { name: 'author', content: 'Sung' },
        { name: 'robots', content: 'index, follow' }, // 搜尋引擎索引
        { name: 'theme-color', content: '#bf9d7d' }, // 網站主題色
        { property: 'og:title', content: '享樂酒店' }, // Open Graph 標題
        {
          property: 'og:description',
          content: '這是一個關於享樂酒店的豪華住宿預訂網站，提供獨特的房型選擇。'
        }, // Open Graph 描述
        { property: 'og:type', content: 'website' }, // Open Graph 類型
        { property: 'og:url', content: '網站的url' },
        { property: 'og:image', content: '網站封面的url' }
      ]
    },
    pageTransition: { name: 'page', mode: 'default' }
  }
})