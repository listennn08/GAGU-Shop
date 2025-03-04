// @ts-ignore
import AOS from 'aos'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.AOS = AOS.init()
  }
})
