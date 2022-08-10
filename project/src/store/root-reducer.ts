import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from 'const/const';
import { appProcess } from './app-process/app-process';
import { offerData } from './offer-data/offer-data';
import { offersData } from './offers-data/offers-data';
import { offersNearbyData } from './offers-nearby-data/offers-nearby-data';
import { reviewsData } from './reviews-data/reviews-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.OffersNearby]: offersNearbyData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.User]: userProcess.reducer,
});
