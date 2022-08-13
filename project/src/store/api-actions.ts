import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute, Cities } from 'const/const';
import { generatePath } from 'react-router';
import { dropToken, saveToken } from 'services/token';
import { AuthDataType } from 'types/auth-data-type';
import { OfferType } from 'types/offer-type';
import { ReviewType } from 'types/review-type';
import { ReviewDataType } from 'types/review-data-type';
import { UserDataType } from 'types/user-data-tyoe';
import { showNofity } from 'utils/utils';
import { redirectToRoute } from './action';
import { changeCity } from './app-process/app-process';
import { AppDispatchType, StateType } from 'types/state-type';
import { FavorteStatusType } from 'types/favorite-status-type';

export const fetchOffersAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(ApiRoute.Offers);

    return data;
  },
);

export const fetchPropertyAction = createAsyncThunk<OfferType | undefined, string, {
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
    } catch {
      showNofity({
        type: 'error',
        message: `Offer id ${id} dosn't exist`,
      });
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<ReviewType[], string, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<ReviewType[]>(generatePath(ApiRoute.Reviews, {id}));

    return data;
  }
);

export const sendReviewAction = createAsyncThunk<ReviewType[], ReviewDataType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/sendReview',
  async ({id, comment, rating}, {extra: api}) => {
    const {data} = await api.post<ReviewType[]>(generatePath(ApiRoute.Reviews, {id}), {comment, rating});

    return data;
  },
);

export const fetchOffersNearby = createAsyncThunk<OfferType[], string, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchOffersNearby',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(generatePath(ApiRoute.OffersNearby, {id}));

    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserDataType | undefined, undefined, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserDataType>(ApiRoute.Login);
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
      const {data} = await api.post<UserDataType>(ApiRoute.Login, {email, password});
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
      await api.delete(ApiRoute.Logout);
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

export const fetchFavoriteOffersAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(ApiRoute.Favorites);

    return data;
  }
);

export const changeFavoriteStatusAction = createAsyncThunk<OfferType, FavorteStatusType, {
  dispatch: AppDispatchType,
  state: StateType,
  extra: AxiosInstance
}>(
  'data/changeFavoriteStatus',
  async ({id, status}, {dispatch, extra: api}) => {
    const {data} = await api.post<OfferType>(generatePath(ApiRoute.FavoriteStatus, {
      id: String(id),
      status: String(status)
    }));
    dispatch(fetchFavoriteOffersAction());

    return data;
  }
);
