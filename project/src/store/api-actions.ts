import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from 'const/const';
import { toast } from 'react-toastify';
import { dropToken, saveToken } from 'services/token';
import { AuthData } from 'types/auth-data';
import { Offer } from 'types/offer';
import { Review } from 'types/review';
import { AppDispatch, State } from 'types/state';
import { UserData } from 'types/user-data';
import { showNofity } from 'utils/utils';
import { loadOffers,
  loadOffersNearby,
  loadProperty,
  loadReviews,
  redirectToRoute,
  requireAuthorization,
  setOfferLoadedStatus,
  setOffersLoadedStatus
} from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersLoadedStatus(true));
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
      dispatch(setOffersLoadedStatus(false));
    } catch {
      showNofity({type: 'error', message: 'Failed to get offers'});
    }
  },
);

export const fetchPropertyAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchProperty',
  async (offerId, {dispatch, extra: api}) => {
    try {
      dispatch(setOfferLoadedStatus(true));
      const {data} = await api.get<Offer>(APIRoute.fetchById(offerId));
      dispatch(loadProperty(data));
      dispatch(setOfferLoadedStatus(false));
    } catch {
      showNofity({type: 'error', message: 'Failed to get an offer'});
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Review[]>(APIRoute.fetchReviews(offerId));
      dispatch(loadReviews(data));
    } catch {
      showNofity({type: 'error', message: 'Failed to get reviews'});
    }
  },
);

export const fetchOffersNearby = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffersNearby',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.fetchOffersNearby(offerId));
      dispatch(loadOffersNearby(data));
    } catch {
      showNofity({type: 'error', message: 'Failed to get offers nearby'});
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  },
);
