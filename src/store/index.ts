import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './productsSlice';
import filterSlice from './filterSlice';
import categoriesSlice from './categoriesSlice';

const store = configureStore({
  reducer: {
    productsSlice,
    filterSlice,
    categoriesSlice,
  },
});

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch;

export default store;