import { createSlice } from '@reduxjs/toolkit';
import { Cities, NameSpace, SortingOptions } from 'const/const';
import { AppProcessType } from 'types/state-type';

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
    sorting: (state, action) => {
      state.sortType = action.payload;
    }
  },
});

export const {changeCity, sorting} = appProcess.actions;
