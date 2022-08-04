import { configureStore } from '@reduxjs/toolkit';
import { createApi } from 'services/api';
import { reducer } from './reducer';

export const api = createApi();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware ({
      thunk: {
        extraArgument: api,
      },
    }),
});
