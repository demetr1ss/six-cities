import { NameSpace } from 'const/const';
import { StateType } from 'types/state';
import { ReviewType } from 'types/review';

export const getReviews = (state: StateType): ReviewType[] =>
  state[NameSpace.Reviews].reviews;

export const getReviewSendingStatus = (state: StateType): boolean =>
  state[NameSpace.Reviews].isReviewSending;
