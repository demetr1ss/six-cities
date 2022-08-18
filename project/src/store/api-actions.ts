import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute, City } from 'const/const';
import { generatePath } from 'react-router';
import { dropToken, saveToken } from 'services/token';
import { AuthDataType } from 'types/auth-data-type';
import { FavorteStatusType } from 'types/favorite-status-type';
import { OfferType } from 'types/offer-type';
import { ReviewDataType } from 'types/review-data-type';
import { ReviewType } from 'types/review-type';
import { AppDispatchType, StateType } from 'types/state-type';
import { UserDataType } from 'types/user-data-tyoe';
import { showNotify } from 'utils/utils';
import { redirectToRoute } from './action';
import { changeCity } from './app-process/app-process';

export const fetchOffersAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<OfferType[]>(ApiRoute.Offers);

      return data;

    }
    catch(e) {
      showNotify({
        type: 'error',
        message: 'Failed to load offers',
      });
      throw e;
    }});

export const fetchOfferAction = createAsyncThunk<OfferType, string, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchProperty',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<OfferType>(generatePath(ApiRoute.Offer, {id}));
      dispatch(fetchReviewsAction(id));
      dispatch(fetchOffersNearby(id));

      return data;
    } catch(e) {
      showNotify({
        type: 'error',
        message: `Offer id ${id} dosn't exist`,
      });
      dispatch(redirectToRoute(AppRoute.NotFound));
      throw e;
    }});

export const fetchReviewsAction = createAsyncThunk<ReviewType[], string, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (id, {extra: api}) => {
    try {
      const {data} = await api.get<ReviewType[]>(generatePath(ApiRoute.Reviews, {id}));

      return data;
    }
    catch(e) {
      showNotify({
        type: 'warn',
        message: 'Failed to load reviews'
      });
      throw e;
    }});

export const sendReviewAction = createAsyncThunk<ReviewType[], ReviewDataType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/sendReview',
  async ({id, comment, rating}, {extra: api}) => {
    try {
      const {data} = await api.post<ReviewType[]>(generatePath(ApiRoute.Reviews, {id}), {comment, rating});

      return data;
    }
    catch(e) {
      showNotify({
        type: 'warn',
        message: 'Failed to send a review'
      });
      throw e;
    }});

export const fetchOffersNearby = createAsyncThunk<OfferType[], string, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchOffersNearby',
  async (id, {extra: api}) => {
    try {
      const {data} = await api.get<OfferType[]>(generatePath(ApiRoute.OffersNearby, {id}));

      return data;
    }
    catch(e) {
      showNotify({
        type: 'warn',
        message: 'Failed to load offers nearby'
      });
      throw e;
    }});

export const checkAuthAction = createAsyncThunk<UserDataType, undefined, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserDataType>(ApiRoute.Login);
    dispatch(fetchFavoriteOffersAction());

    return data;
  }
);

export const loginAction = createAsyncThunk<UserDataType, AuthDataType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserDataType>(ApiRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(changeCity(City.Paris));

      return data;
    }
    catch(e) {
      showNotify({
        type: 'warn',
        message: 'Failed login',
      });
      throw(e);
    }});

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(ApiRoute.Logout);
      dropToken();
      dispatch(fetchOffersAction());
    }
    catch {
      dispatch(redirectToRoute(AppRoute.Main));
      showNotify({
        type: 'warn',
        message: 'Failed logout'
      });
    }});

export const fetchFavoriteOffersAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<OfferType[]>(ApiRoute.Favorites);

      return data;
    }
    catch(e) {
      showNotify({
        type: 'error',
        message: 'Failed load favorite offers'
      });
      throw e;
    }});

export const changeFavoriteStatusAction = createAsyncThunk<OfferType, FavorteStatusType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/changeFavoriteStatus',
  async ({id, status}, {extra: api}) => {
    try {
      const {data} = await api.post<OfferType>(generatePath(ApiRoute.FavoriteStatus, {
        id: String(id),
        status: String(status)
      }));

      return data;
    }
    catch(e) {
      showNotify({
        type: 'warn',
        message: 'Failed to add to favorites'
      });
      throw e;
    }});
