import { createI18n } from 'vue-i18n'
import { en, tw } from '../locale'

export default defineNuxtPlugin((nuxtApp) => {
  const localLocale = useLocalStorage('locale', '')

  if (!localLocale.value && window) {
    localLocale.value = window.navigator.language.includes('en') ? 'en' : 'tw'
  }

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localLocale.value,
    messages: {
      en,
      tw,
    },
  })

  watch(localLocale, (newLocale) => {
    i18n.global.locale.value = newLocale as 'tw' | 'en'
  })

  nuxtApp.vueApp.use(i18n)
})
