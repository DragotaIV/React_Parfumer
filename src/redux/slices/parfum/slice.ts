import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchParfums } from './asyncActions'
import { ParfumSliceState, Status } from './types'

const initialState: ParfumSliceState = {
  items: [],
  status: Status.LOADING,
}

export const parfumSlice = createSlice({
  name: 'parfum',
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<[]>) {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => (
    builder.addCase(fetchParfums.pending, (state, action) => {
      state.status = Status.LOADING
      state.items = []
    }),
    builder.addCase(fetchParfums.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    }),
    builder.addCase(fetchParfums.rejected, (state, action) => {
      state.status = Status.ERROR
      state.items = []
    })
  ),
})

export const { setItems } = parfumSlice.actions

export default parfumSlice.reducer
