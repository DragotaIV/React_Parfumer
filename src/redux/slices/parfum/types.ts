export type SearchParfumParams = {
  sortBy: string
  order: string
  category: string
  search: string
  currentPage: string
}

export type Parfum = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ParfumSliceState {
  items: Parfum[]
  status: 'loading' | 'success' | 'error'
}
