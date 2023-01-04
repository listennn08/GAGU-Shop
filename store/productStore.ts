export interface IProduct {
  id: string
  title: string
  category: string
  content: string
  imageUrl: string[]
  enabled: boolean
  origin_price: number
  price: number
  unit: string
  quantity: number
  isLoading: boolean
  description?: string
  store: number
  feedback?: IFeedback[]
}

export interface IFeedback {
  id: string
  pic: string
  star: number
  comment: string
}

interface IProductStore {
  loading: boolean
  category: string
  products: IProduct[]
  tempProduct: IProduct
  pagination: Partial<Service.IPagination>
}

export const useProductStore = defineStore('product', {
  state: (): IProductStore => ({
    loading: false,
    category: '',
    products: [],
    tempProduct: {
      id: '',
      title: '',
      category: '',
      content: '',
      imageUrl: [],
      enabled: false,
      origin_price: 0,
      price: 0,
      unit: '',
      store: 0,
      quantity: 0,
      isLoading: false,
    },
    pagination: {
      current_page: 1,
      total_pages: 0,
    },
  }),
  getters: {
    filterProducts: (state) =>
      state.products.filter(
        (el: IProduct) =>
          el.category.toLowerCase().indexOf(state.category) > -1,
      ),
  },
  actions: {
    setProducts(data: IProduct[]) {
      this.products = [...data]
    },
    addProducts(data: IProduct) {
      this.products.unshift(data)
    },
    editProduct({ id, data }: { id: string; data: IProduct }) {
      this.products.forEach((prod, index) => {
        if (prod.id === id) this.products[index] = data
      })
    },
    delProduct(index: number) {
      this.products.splice(index, 1)
    },
    setTempProduct(data: IProduct) {
      this.tempProduct = { ...data }
    },
    clearTempProduct() {
      this.tempProduct = {
        id: '',
        title: '',
        category: '',
        content: '',
        imageUrl: [],
        enabled: false,
        origin_price: 0,
        price: 0,
        unit: '',
        store: 0,
        quantity: 0,
        isLoading: false,
      }
    },
    setCategory(category: string) {
      this.category = category
    },
  },
})
