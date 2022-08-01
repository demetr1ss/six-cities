import { MAX_RATING } from 'const/const';
import { Offer } from 'types/offer';

export function convertRatingToPercent(rating: number): string {
  return `${Math.ceil((100 * rating / MAX_RATING))}%`;
}

export const sortOffersByAscendingPrice = (a: Offer, b: Offer) =>
  a.price - b.price;

export const sortOffersByDescendingPrice = (a: Offer, b: Offer) =>
  b.price - a.price;

export const sortOffersByRating = (a: Offer, b: Offer) =>
  b.rating - a.rating;
