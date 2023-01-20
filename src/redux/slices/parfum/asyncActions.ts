import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Parfum, SearchParfumParams } from './types'

export const fetchParfums = createAsyncThunk<Parfum[], SearchParfumParams>(
  'parfum/fetchParfumsStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params
    const { data } = await axios.get<Parfum[]>(
      `https://6384b2983fa7acb14ffdb723.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )

    return data
  },
)
