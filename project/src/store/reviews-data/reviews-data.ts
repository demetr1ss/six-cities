import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from 'const/const';
import { fetchReviewsAction, sendReviewAction } from 'store/api-actions';
import { ReviewType } from 'types/review-type';

export type ReviewsDataType = {
  reviews: ReviewType[];
  reviewSendingStatus: LoadingStatus;
};

const initialState: ReviewsDataType = {
  reviews: [],
  reviewSendingStatus: LoadingStatus.Idle,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviews = [];
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.reviewSendingStatus = LoadingStatus.Pending;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewSendingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.reviewSendingStatus = LoadingStatus.Rejected;
      });
  }});
