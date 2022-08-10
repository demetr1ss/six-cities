import { AuthorizationStatus } from 'const/const';
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
  isOffersLoaded: boolean;
};

export type OfferDataType = {
  offer?: OfferType;
  isOfferLoaded: boolean;
};

export type OffersNearbyDataType = {
  offersNearby: OfferType[];
};

export type ReviewsDataType = {
  reviews: ReviewType[];
  isReviewSending: boolean;
};

export type AppProcessType = {
  city: string;
  activeCardId: number;
  sortType: string;
}
