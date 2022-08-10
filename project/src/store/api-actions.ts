import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute, Cities } from 'const/const';
import { dropToken, saveToken } from 'services/token';
import { AuthDataType } from 'types/auth-data';
import { OfferType } from 'types/offer';
import { ReviewType } from 'types/review';
import { ReviewDataType } from 'types/review-data';
import { AppDispatchType, StateType } from 'types/state';
import { UserDataType } from 'types/user-data';
import { showNofity } from 'utils/utils';
import { redirectToRoute } from './action';
import { changeCity } from './app-process/app-process';

export const fetchOffersAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(ApiRoute.offers());
    return data;
  },
);

export const fetchPropertyAction = createAsyncThunk<OfferType | undefined, number, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchProperty',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<OfferType>(ApiRoute.fetchOfferById(offerId));
      dispatch(fetchReviewsAction(Number(offerId)));
      dispatch(fetchOffersNearby(Number(offerId)));
      return data;
    } catch {
      showNofity({
        type: 'error',
        message: `Offer id ${offerId} dosn't exist`,
      });
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<ReviewType[], number, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<ReviewType[]>(ApiRoute.reviews(offerId));

    return data;
  }
);

export const sendReviewAction = createAsyncThunk<ReviewType[], ReviewDataType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/sendReview',
  async ({offerId, comment, rating}, {extra: api}) => {
    const {data} = await api.post<ReviewType[]>(ApiRoute.reviews(offerId), {comment, rating});

    return data;
  },
);

export const fetchOffersNearby = createAsyncThunk<OfferType[], number, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchOffersNearby',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(ApiRoute.fetchOffersNearby(offerId));

    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserDataType | undefined, undefined, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<UserDataType>(ApiRoute.login());

      return data;
    }
    catch {
      showNofity({
        type: 'error',
        message: 'Authentication check failed'
      });
    }
  },
);

export const loginAction = createAsyncThunk<UserDataType | undefined, AuthDataType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserDataType>(ApiRoute.login(), {email, password});
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(changeCity(Cities.Paris));

      return data;
    }
    catch {
      showNofity({
        type: 'error',
        message: 'Failed login'
      });
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    try {
      await api.delete(ApiRoute.logout());
      dropToken();
    }
    catch {
      showNofity({
        type: 'error',
        message: 'Failed logout'
      });
    }
  },
);
