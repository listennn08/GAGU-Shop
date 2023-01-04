export interface IOrderStore {
  orders: any[]
  order: any
}

export const useOrderStore = defineStore('order', {
  state: (): IOrderStore => ({
    orders: [],
    order: {},
  }),
  actions: {
    setOrders(data: any[]) {
      this.orders = data
    },
    setOrder(data: any) {
      this.order = data
    },
  },
})
