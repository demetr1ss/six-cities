import { favoriteOffersData, FavoriteOffersDataType } from './favorite-offers-data';
import { changeFavoriteStatusAction, fetchFavoriteOffersAction, loginAction } from 'store/api-actions';
import { createRandomOffer } from 'utils/mocks';
import { OfferType } from 'types/offer-type';

const mockFavoriteOffers = [createRandomOffer(), createRandomOffer(), createRandomOffer()];

describe('Reducer: favorite-offers-data', () => {
  let state: FavoriteOffersDataType;

  beforeEach(() => {
    state = {
      favoriteOffers: [],
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(favoriteOffersData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchFavoriteOffersAction test', () => {
    it('should update favorite offers by load favorite offers', () => {
      expect(favoriteOffersData.reducer(state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: mockFavoriteOffers}))
        .toEqual({favoriteOffers: mockFavoriteOffers});
    });
  });

  describe('changeFavoriteStatusAction test', () => {
    it('should update the favorite offers if changeFavoriteStatusAction fullfilled', () => {
      expect(favoriteOffersData.reducer(state, {type: changeFavoriteStatusAction.fulfilled.type, payload: {} as OfferType}))
        .toEqual({favoriteOffers: [] as OfferType[]});
    });
  });

  describe('loginAction test', () => {
    it('should reset to initial state if loginAction fullfilled', () => {
      expect(favoriteOffersData.reducer(state, {type: loginAction.fulfilled.type}))
        .toEqual(state);
    });
  });

});
