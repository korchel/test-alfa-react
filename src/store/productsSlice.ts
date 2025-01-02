import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICreateProduct, IProduct } from '../interfaces/product';
import { RootStateType } from ".";
import { IFilterState } from "./filterSlice";
import { fetchProducts } from "../api/products";

export const fetchAll = createAsyncThunk(
  'fetchAll',
  async () => {
    const products = await fetchProducts();
    return products;
  },
);

type LoadingState = 'idle' | 'loading' | 'failed';
interface IState {
  loadingState: LoadingState,
  loadingError: string | null,
  products: IProduct[],
}

const initialState: IState = {
  loadingState: 'idle',
  loadingError: null,
  products: [],
}

const productsSlice = createSlice({
  name: 'all products',
  initialState,
  reducers: {
    remove: (state, { payload }: { payload: {id: number} }) => {
      state.products = state.products.filter((product) => product.id !== payload.id);
    },
    toggleFavorite: (state, { payload }: { payload: {id: number} }) => {
      state.products = state.products.map((product) => {
        if (product.id === payload.id) {
          product.isFavorite = product.isFavorite ? false : true;
        }
        return product;
      });
    },
    add: (state, action: PayloadAction<IProduct>) => {
      const newProduct = action.payload;
      state.products = [...state.products, newProduct];
    },
    edit: (state, action: PayloadAction<{data: ICreateProduct; id: number}>) => {
      const {data, id} = action.payload;
      state.products = state.products.map((product) => {
        if (product.id === id) {
          return { ...product, ...data };
        }
        return product;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loadingState = 'loading';
        state.loadingError = null;
      })
      .addCase(fetchAll.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.loadingState = 'idle';
        state.products = action.payload.map(product => {
          product.isFavorite = false;
          return product;
        });
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loadingState = 'failed';
        state.loadingError = action.error.message ?? 'Error';
      });
  },
});

export const { toggleFavorite, remove, add, edit } = productsSlice.actions;

export const getloadingProductsState = (state: RootStateType): string => state.productsSlice.loadingState;
export const getLoadingProductsError = (state: RootStateType): string | null => state.productsSlice.loadingError;
export const getProducts = (state: RootStateType): IProduct[] => state.productsSlice.products;
export const getProduct = (id: number) => createSelector(
  [getProducts],
  (products: IProduct[]) => products.find((product) => product.id === id),
);
export const getFilteredProducts = (searchParams: IFilterState) => createSelector(
  [getProducts],
  (products: IProduct[]) => products.filter((product) => {
    const { isFavoriteChosen, category, searchString } = searchParams;
    let favoritePass = true;
    let categoryPass = true;
    let searchPass = true;
    if (category) {
      categoryPass = product.category === category;
    }
    if (isFavoriteChosen) {
      favoritePass = product.isFavorite;
    }
    if (searchString) {
      searchPass = product.title.toLowerCase().includes(searchString.toLocaleLowerCase());
    }
    return favoritePass && categoryPass && searchPass;
  }),
);

export default productsSlice.reducer;