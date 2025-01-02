import { createSlice } from '@reduxjs/toolkit';

import type { RootStateType } from './index';

export interface IFilterState {
  isFavoriteChosen: boolean;
  searchString: string;
  category: string | undefined;
}

const initialState: IFilterState = {
  isFavoriteChosen: false,
  searchString: '',
  category: undefined,
};

const filterSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleIsFavoriteChosen: (state) => {
      state.isFavoriteChosen = state.isFavoriteChosen ? false : true;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    clearFilter: () => initialState,
  },
});

export const { toggleIsFavoriteChosen, setSearchString, setCategoryFilter, clearFilter } = filterSlice.actions;

export const getFilters = (state: RootStateType): IFilterState => {
  return state.filterSlice;
};

export default filterSlice.reducer;