import { createI18n } from 'vue-i18n'
import { en, tw } from '../locale'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'tw',
    messages: {
      en,
      tw,
    },
  })

  nuxtApp.vueApp.use(i18n)
})
