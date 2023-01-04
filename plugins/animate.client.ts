// @ts-ignore
import WOW from 'wow.js'
// @ts-ignore
import AOS from 'aos'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.AOS = AOS.init()
    nuxtApp.WOW = new WOW().init()
  }
})
