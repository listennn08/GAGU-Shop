import VueSimpleConfirm from 'vue-simple-confirm'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueSimpleConfirm)
})
