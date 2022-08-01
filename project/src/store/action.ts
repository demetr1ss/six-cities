import {createAction} from '@reduxjs/toolkit';

export const changeCity = createAction('changeCity', (value) => ({
  payload: value
}));
