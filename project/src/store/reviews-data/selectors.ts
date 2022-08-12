import { LoadingStatus, NameSpace } from 'const/const';
import { ReviewType } from 'types/review';
import { StateType } from 'types/state';

export const getReviews = (state: StateType): ReviewType[] =>
  state[NameSpace.Reviews].reviews;

export const getReviewSendingStatus = (state: StateType): LoadingStatus =>
  state[NameSpace.Reviews].reviewSendingStatus;
