import { createAction } from '@reduxjs/toolkit';
import { Offer } from 'types/offer';
import { Review } from 'types/review';
import { AuthorizationStatus, AppRoute } from 'const/const';

export const changeCity = createAction('offerList/changeCity', (value) => ({
  payload: value
}));

export const setActiveCardOnMap = createAction('offerList/setActiveCardOnMap', (value) => ({
  payload: value
}));

export const sorting = createAction('offerList/sorting', (value) => ({
  payload: value
}));

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadReviews = createAction<Review[]>('data/loadReviews');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');
