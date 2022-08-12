import { AuthorizationStatus, LoadingStatus } from 'const/const';
import { store } from 'store';
import { OfferType } from './offer';
import { ReviewType } from './review';

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

export type ReviewsDataType = {
  reviews: ReviewType[];
  reviewSendingStatus: LoadingStatus;
};

export type AppProcessType = {
  city: string;
  sortType: string;
}
