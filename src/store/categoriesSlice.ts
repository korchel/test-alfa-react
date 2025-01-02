import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootStateType } from ".";
import { fetchCategories } from "../api/products";

export const fetchCategoriesData = createAsyncThunk(
  'fetchCategories',
  async () => {
    const data = await fetchCategories();
    return data;
  },
);

type LoadingState = 'idle' | 'loading' | 'failed';
interface IState {
  loadingState: LoadingState,
  loadingError: string | null,
  categories: string[],
}

const initialState: IState = {
  loadingState: 'idle',
  loadingError: null,
  categories: [],
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesData.pending, (state) => {
        state.loadingState = 'loading';
        state.loadingError = null;
      })
      .addCase(fetchCategoriesData.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loadingState = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesData.rejected, (state, action) => {
        state.loadingState = 'failed';
        state.loadingError = action.error.message ?? 'Error';
      });
  },
});

export const getloadingCategoriesState = (state: RootStateType): string => state.categoriesSlice.loadingState;
export const getLoadingCategoriesError = (state: RootStateType): string | null => state.categoriesSlice.loadingError;
export const getCategories = (state: RootStateType): string[] => state.categoriesSlice.categories;

export default categoriesSlice.reducer;