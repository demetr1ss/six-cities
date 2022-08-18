import { createSlice } from '@reduxjs/toolkit';
import { City, NameSpace, SortingOption } from 'const/const';

export type AppProcessType = {
  city: string;
  sortType: string;
}

const initialState: AppProcessType = {
  city: City.Paris,
  sortType: SortingOption.Default,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
      state.sortType = SortingOption.Default;
    },
    changeSort: (state, action) => {
      state.sortType = action.payload;
    }
  },
});

export const {changeCity, changeSort} = appProcess.actions;
