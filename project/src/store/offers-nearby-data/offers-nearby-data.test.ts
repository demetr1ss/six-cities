import { changeFavoriteStatusAction, fetchOffersNearbyAction } from 'store/api-actions';
import { OfferType } from 'types/offer-type';
import { createRandomOffer } from 'utils/mocks';
import { offersNearbyData, OffersNearbyDataType } from './offers-nearby-data';

const mockOffersNearby = [createRandomOffer(), createRandomOffer(), createRandomOffer()];

describe('Reducer: offers-nearby-data', () => {
  let state: OffersNearbyDataType;

  beforeEach(() => {
    state = {
      offersNearby: [],
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offersNearbyData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchOffersNearby test', () => {
    it('should update offers nearby by load offers nearby', () => {
      expect(offersNearbyData.reducer(state, {type: fetchOffersNearbyAction.fulfilled.type, payload: mockOffersNearby}))
        .toEqual({offersNearby: mockOffersNearby});
    });

    it('should return initial state if fetchOffersNearby rejected', () => {
      expect(offersNearbyData.reducer(state, {type: fetchOffersNearbyAction.rejected.type}))
        .toEqual(state);
    });
  });

  describe('changeFavoriteStatusAction test', () => {
    it('should update the favorite status of the offers nearby if changeFavoriteStatusAction fullfilled', () => {
      expect(offersNearbyData.reducer(state, {type: changeFavoriteStatusAction.fulfilled.type, payload: createRandomOffer()}))
        .toEqual({offersNearby: [] as OfferType[]});
    });
  });
});
