export const useAppStore = defineStore('myapp', {
  state: () => ({
    msg: {
      text: '',
      type: false,
    },
    page: {
      open: false,
    },
    loading: false,
    pagination: {
      current_page: 1,
    },
    sticky: false,
    currentStep: 1,
    menuToggle: false,
  }),
  actions: {
    setMsg({ msg, type }: { msg: string; type: boolean }) {
      this.msg = {
        text: msg,
        type,
      }
      setTimeout(this.clearMsg, 2000)
    },
    clearMsg() {
      this.msg = { text: '', type: false }
    },
    setPagination(data: any) {
      this.pagination = { ...data }
    },
    togglePage() {
      this.page.open = !this.page.open
    },
    toggleLoading(loading?: boolean) {
      if (typeof loading === 'boolean') this.loading = loading
      else this.loading = !this.loading
    },
    toggleSticky(data: boolean) {
      this.sticky = data
    },
    setCurrentStep(step: number) {
      this.currentStep = step
    },
    toggleMenuOpen(toggle: boolean) {
      this.menuToggle = toggle
    },
  },
})
