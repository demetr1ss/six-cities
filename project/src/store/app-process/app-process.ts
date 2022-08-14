import { createSlice } from '@reduxjs/toolkit';
import { Cities, NameSpace, SortingOptions } from 'const/const';

type AppProcessType = {
  city: string;
  sortType: string;
}

const initialState: AppProcessType = {
  city: Cities.Paris,
  sortType: SortingOptions.Default,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
      state.sortType = SortingOptions.Default;
    },
    changeSort: (state, action) => {
      state.sortType = action.payload;
    }
  },
});

export const {changeCity, changeSort} = appProcess.actions;
