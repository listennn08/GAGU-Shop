import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { checkCoupon } from '~~/services/frontend'

export const useDiscount = defineStore('discount', () => {
  const toast = useToast()
  const { t } = useI18n()
  const state = reactive<{
    isLoading: boolean
    code?: string
    discountPercent: number
    discountType: boolean
    discountMsg: string
  }>({
    isLoading: false,
    code: '',
    discountPercent: 0,
    discountType: false,
    discountMsg: '',
  })
  watch(
    () => state.code,
    () => {
      console.log('state.code', state.code)
    },
  )
  async function handleCheckCoupon() {
    try {
      if (!state.code) return
      state.isLoading = true
      const resp = await checkCoupon(state.code)
      if (dayjs(resp.data.data.deadline.datetime).isAfter(new Date())) {
        state.discountPercent = resp.data.data.percent
        state.discountType = true
        state.discountMsg = t('coupon.discount', {
          percent: resp.data.data.percent,
        })
        state.isLoading = false
      } else {
        throw new Error(t('coupon.expired'))
      }
    } catch (err: any) {
      let errorMessage = ''
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data.message
      } else {
        errorMessage = err.message
      }

      toast.add({
        severity: 'error',
        summary: t('toast.error'),
        detail: errorMessage,
      })

      state.discountPercent = 0
      state.discountType = false
      state.discountMsg = errorMessage
    } finally {
      state.isLoading = false
    }
  }

  return {
    ...toRefs(state),
    handleCheckCoupon,
  }
})
