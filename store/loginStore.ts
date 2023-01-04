export const useLoginStore = defineStore('login', {
  state: () => ({
    checking: false,
    token: '',
    isLogin: false,
  }),
  actions: {
    toggleChecking() {
      this.checking = !this.checking
    },
    setLoginInfo(token: string) {
      this.token = token
      this.isLogin = !!token
    },
    clearLoginInfo() {
      this.token = ''
      this.isLogin = false
    },
  },
})
