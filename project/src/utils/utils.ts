import { Cities, MAX_RATING, SortingOptions } from 'const/const';
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


export const sortOffers = (filteredOffers: Offer[], currentSortType: string) => {
  switch(currentSortType) {
    case SortingOptions.Default:
      return filteredOffers;
    case SortingOptions.AscendingPrice:
      return filteredOffers.sort(sortOffersByAscendingPrice);
    case SortingOptions.DescendingPrice:
      return filteredOffers.sort(sortOffersByDescendingPrice);
    case SortingOptions.Rating:
      return filteredOffers.sort(sortOffersByRating);
    default:
      throw new Error(`${currentSortType} not exist`);
  }
};

export const cities = Object.keys(Cities);
export const randomCity = cities[Math.floor(Math.random() * cities.length)];
