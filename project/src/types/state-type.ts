import { AuthorizationStatus, LoadingStatus } from 'const/const';
import { store } from 'store';
import { OfferType } from './offer-type';
import { ReviewType } from './review-type';

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;

export type UserProcessType = {
  authorizationStatus: AuthorizationStatus;
  userEmail: undefined | string;
};

export type OffersDataType = {
  offers: OfferType[];
  offersLoadingStatus: LoadingStatus;
};

export type OfferDataType = {
  offer?: OfferType;
  offerLoadingStatus: LoadingStatus;
};

export type OffersNearbyDataType = {
  offersNearby: OfferType[];
};

export type FavoriteOffersDataType = {
  offer?: OfferType;
  favoriteOffers: OfferType[];
}

export type ReviewsDataType = {
  reviews: ReviewType[];
  reviewSendingStatus: LoadingStatus;
};

export type AppProcessType = {
  city: string;
  sortType: string;
}
