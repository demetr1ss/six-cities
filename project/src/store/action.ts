import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('offerList/changeCity', (value) => ({
  payload: value
}));

export const setActiveCardOnMap = createAction('map/setActiveCardOnMap', (value) => ({
  payload: value
}));

export const sorting = createAction('offerList/sorting', (value) => ({
  payload: value
}));
