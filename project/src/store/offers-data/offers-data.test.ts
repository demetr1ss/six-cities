import { offersData, OffersDataType } from './offers-data';
import { changeFavoriteStatusAction, fetchOffersAction } from 'store/api-actions';
import { LoadingStatus } from 'const/const';
import { createRandomOffer } from 'utils/mocks';
import { OfferType } from 'types/offer-type';

const mockOffers = [createRandomOffer(), createRandomOffer(), createRandomOffer()];

describe('Reducer: offers-data', () => {
  let state: OffersDataType;

  beforeEach(() => {
    state = {
      offers: [],
      offersLoadingStatus: LoadingStatus.Idle,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchOffersAction test', () => {
    it('should update offers and offersLoadingStatus by load offers', () => {
      expect(offersData.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: mockOffers}))
        .toEqual({
          offers: mockOffers,
          offersLoadingStatus: LoadingStatus.Fulfilled
        });
    });

    it('should update offersLoadingStatus to pending if fetchOffersAction pending', () => {
      expect(offersData.reducer(state, {type: fetchOffersAction.pending.type}))
        .toEqual({
          offers: [],
          offersLoadingStatus: LoadingStatus.Pending
        });
    });

    it('should update offersLoadingStatus to rejected if fetchOffersAction rejected', () => {
      expect(offersData.reducer(state, {type: fetchOffersAction.rejected.type}))
        .toEqual({
          offers: [],
          offersLoadingStatus: LoadingStatus.Rejected
        });
    });
  });

  describe('changeFavoriteStatusAction test', () => {
    it('should update the favorite status of the offers if changeFavoriteStatusAction fullfilled', () => {
      expect(offersData.reducer(state, {type: changeFavoriteStatusAction.fulfilled.type, payload: createRandomOffer()}))
        .toEqual({
          offers: [] as OfferType[],
          offersLoadingStatus: LoadingStatus.Idle
        });
    });
  });});
