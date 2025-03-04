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

export const useProductStore = defineStore('product', () => {
  const route = useRoute()
  const state: IProductStore = {
    loading: false,
    category: 'all',
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
  }

  const filterProducts = computed(() => {
    const category = route.query.category as string
    if (!category || category === 'all') {
      return state.products
    }

    return state.products.filter(
      (el: IProduct) => el.category.toLowerCase().indexOf(category) > -1,
    )
  })

  function setProducts(data: IProduct[]) {
    state.products = [...data]
  }

  function addProducts(data: IProduct) {
    state.products.unshift(data)
  }

  function editProduct({ id, data }: { id: string; data: IProduct }) {
    state.products.forEach((prod, index) => {
      if (prod.id === id) state.products[index] = data
    })
  }

  function delProduct(index: number) {
    state.products.splice(index, 1)
  }

  function setTempProduct(data: IProduct) {
    state.tempProduct = { ...data }
  }

  function clearTempProduct() {
    state.tempProduct = {
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
  }

  return {
    ...toRefs(state),
    filterProducts,
    setProducts,
    addProducts,
    editProduct,
    delProduct,
    setTempProduct,
    clearTempProduct,
  }
})
