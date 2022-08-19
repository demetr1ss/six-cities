import { reviewsData, ReviewsDataType } from './reviews-data';
import { ReviewType } from 'types/review-type';
import { LoadingStatus } from 'const/const';
import { fetchReviewsAction, sendReviewAction } from 'store/api-actions';

const reviews = [] as ReviewType[];


describe('Reducer: reviews-data', () => {
  let state: ReviewsDataType;

  beforeEach(() => {
    state = {
      reviews: [],
      reviewSendingStatus: LoadingStatus.Idle,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        reviews: [],
        reviewSendingStatus: LoadingStatus.Idle
      });
  });

  describe('fetchReviewsAction test', () => {
    it('should update review by load reviews', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
        .toEqual({
          reviews,
          reviewSendingStatus: LoadingStatus.Idle
        });
    });

    it('should return initial state if fetchReviewsAction rejected', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.rejected.type}))
        .toEqual(state);
    });
  });

  describe('sendReviewAction test', () => {
    it('should update reviewSendingStatus if sendReviewAction pending', () => {
      expect(reviewsData.reducer(state, {type: sendReviewAction.pending.type}))
        .toEqual({
          reviews,
          reviewSendingStatus: LoadingStatus.Pending
        });
    });

    it('should update reviewSendingStatus and reviews if sendReviewAction fullfilled', () => {
      expect(reviewsData.reducer(state, {type: sendReviewAction.fulfilled.type, payload: reviews}))
        .toEqual({
          reviews,
          reviewSendingStatus: LoadingStatus.Fulfilled
        });
    });

    it('should update reviewSendingStatus if sendReviewAction rejected', () => {
      expect(reviewsData.reducer(state, {type: sendReviewAction.rejected.type}))
        .toEqual({
          reviews,
          reviewSendingStatus: LoadingStatus.Rejected
        });
    });
  });
});
