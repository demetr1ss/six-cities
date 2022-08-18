import { LoadingStatus } from 'const/const';
import { changeFavoriteStatusAction, fetchOfferAction } from 'store/api-actions';
import { OfferType } from 'types/offer-type';
import { createRandomOffer } from 'utils/mocks';
import { offerData, OfferDataType } from './offer-data';

const mockOffer = createRandomOffer();

describe('Reducer: offer-data', () => {
  let state: OfferDataType;

  beforeEach(() => {
    state = {
      offer: {} as OfferType,
      offerLoadingStatus: LoadingStatus.Idle,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offerData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchOfferAction test', () => {
    it('should update offers by load offers and offerLoadingStatus', () => {
      expect(offerData.reducer(state, {type: fetchOfferAction.fulfilled.type, payload: mockOffer}))
        .toEqual({
          offer: mockOffer,
          offerLoadingStatus: LoadingStatus.Fulfilled
        });
    });

    it('should update offerLoadingStatus to pending if fetchOffersAction pending', () => {
      expect(offerData.reducer(state, {type: fetchOfferAction.pending.type}))
        .toEqual({
          offer: {} as OfferType,
          offerLoadingStatus: LoadingStatus.Pending
        });
    });

    it('should update offerLoading status to rejected if fetchOfferAction rejected', () => {
      expect(offerData.reducer(state, {type: fetchOfferAction.rejected.type}))
        .toEqual({
          offer: {} as OfferType,
          offerLoadingStatus: LoadingStatus.Rejected
        });
    });
  });

  describe('changeFavoriteStatusAction test', () => {
    it('the favorite status in the offer should be updated if changeFavoriteStatusAction fullfilled', () => {
      expect(offerData.reducer(state, {type: changeFavoriteStatusAction.fulfilled.type, payload: mockOffer}))
        .toEqual({
          offer: {} as OfferType,
          offerLoadingStatus: LoadingStatus.Idle
        });
    });
  });});
