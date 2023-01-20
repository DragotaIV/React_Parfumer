import { configureStore } from '@reduxjs/toolkit';
import filter from '../slices/filter/slice';
import cart from '../slices/cart/slice';
import parfum from '../slices/parfum/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    parfum,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();