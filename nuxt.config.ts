import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
      title: 'GAGU Shop',
      meta: [
        {
          charset: 'utf-8',
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge',
        },
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0',
        },
        {
          name: 'description',
          content: '精選優質傢俱',
        },
        {
          name: 'keywords',
          content: 'GAGU, gagu, 傢俱, 桌子, 椅子, 床',
        },
        {
          name: 'author',
          content: 'Matt',
        },
        {
          property: 'og:title',
          content: 'GAGU傢俱',
        },
        {
          property: 'og:description',
          content: '精選優質傢俱',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: 'https://listennn08.github.io/GAGU-Shop',
        },
      ],
      link: [
        {
          rel: 'icon',
          href: 'favicon.ico',
        },
      ],
    },
  },
  modules: [
    '@nuxt/image-edge',
    '@unocss/nuxt',
    [
      'unplugin-icons/nuxt',
      {
        /* options */
      },
    ],
    ['@pinia/nuxt', { autoImports: ['defineStore', 'useStore'] }],
  ],
  css: [
    'reset-css/reset.css',
    '@/assets/main.scss',
    'wow.js/css/libs/animate.css',
    'aos/dist/aos.css',
    'vue-simple-confirm/dist/index.css',
  ],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,
  },
  image: {
    domains: ['hexschool-api.s3.us-west-2.amazonaws.com', 'randomuser.me/'],
  },
  plugins: [
    {
      src: '@/plugins/animate.client.ts',
      ssr: false,
      mode: 'client',
    },
    {
      src: '@/plugins/vee-validate.ts',
      ssr: false,
      mode: 'client',
    },
  ],
  runtimeConfig: {
    public: {
      apiBASE: process.env.NUXI_API_BASE,
      apiUUID: process.env.NUXI_API_UUID,
      baseURL: process.env.NUXI_BASE_URL,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/_colors.scss" as *;
            @use "@/assets/_mixins.scss" as *;
          `,
        },
      },
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json'),
        ],
      }),
    ],
  },
})
