import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import MyTheme from './theme'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW ',
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
          content:
            'GAGU, gagu, 傢俱, 桌子, 椅子, 床, furniture, table, chair, bed',
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
    '@nuxt/image',
    '@unocss/nuxt',
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
    [
      'unplugin-icons/nuxt',
      {
        /* options */
      },
    ],
    ['@pinia/nuxt', { autoImports: ['defineStore', 'useStore'] }],
  ],

  primevue: {
    options: {
      theme: {
        preset: MyTheme,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    },
    components: {
      prefix: 'P',
    },
    directives: {
      prefix: 'P',
    },
  },

  css: [
    'reset-css/reset.css',
    // '@/assets/main.scss',
    // 'aos/dist/aos.css',
    'primeicons/primeicons.css',
  ],

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
      apiBASE: process.env.NUXT_API_BASE,
      apiUUID: process.env.NUXT_API_UUID,
      baseURL: process.env.NUXT_BASE_URL,
    },
  },
  ssr: false,

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: `
            @use "@/assets/_colors.scss" as *;
          `,
        },
      },
    },
    plugins: [
      VueI18nVitePlugin({
        runtimeOnly: false,
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json'),
        ],
      }),
    ],
  },

  compatibilityDate: '2024-10-10',
})
