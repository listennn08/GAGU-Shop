import { configure, defineRule } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import tw from '@vee-validate/i18n/dist/locale/zh_TW.json'
import rules from '@vee-validate/rules'

export default defineNuxtPlugin((nuxtApp) => {
  /** 表單驗證 */
  Object.keys(rules).forEach((rule) => {
    defineRule(rule, rules[rule])
  })
  configure({
    generateMessage: localize({
      tw,
    }),

    // classes: {
    //   valid: 'is-success',
    //   invalid: 'is-danger',
    //   dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    // },
  })
  localize('tw', tw)
})
