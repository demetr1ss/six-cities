import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from 'const/const';
import { Offer } from 'types/offer';
import { Review } from 'types/review';

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

export const loadProperty = createAction<Offer>('data/loadProperty');

export const loadReviews = createAction<Review[]>('data/loadReviews');

export const loadOffersNearby = createAction<Offer[]>('data/loadOffersNearby');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setOffersLoadedStatus = createAction<boolean>('data/setOffersLoadedStatus');

export const setOfferLoadedStatus = createAction<boolean>('data/setOfferLoadedStatus');

export const setUserEmail = createAction<string | null>('data/setUserEmail');

export const redirectToRoute = createAction<AppRoute>('login/redirectToRoute');
