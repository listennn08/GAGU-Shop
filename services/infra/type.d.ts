namespace Service {
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
    options: string
  }

  export interface ITime {
    diff: string
    datetime: string
    timestamp: number
  }

  export interface IProductDetail {
    description: string
    created: ITime
    updated: ITime
  }

  export interface IPagination {
    total: number
    count: number
    per_page: number
    current_page: number
    total_pages: number
    links: {}
  }

  export interface IMeta {
    pagination: IPagination
  }

  export interface IProductResponse {
    data: IProduct[]
    meta: IMeta
  }

  export interface IProductDetailResponse {
    data: IProduct & IProductDetail
  }
}
