import { MAX_RATING, SortingOptions } from 'const/const';
import { toast } from 'react-toastify';
import { OfferType } from 'types/offer';
import { ReviewType } from 'types/review';

export function convertRatingToPercent(rating: number): string {
  return `${Math.ceil((100 * Math.round(rating) / MAX_RATING))}%`;
}

export const sortOffersByAscendingPrice = (a: OfferType, b: OfferType) =>
  a.price - b.price;

export const sortOffersByDescendingPrice = (a: OfferType, b: OfferType) =>
  b.price - a.price;

export const sortOffersByRating = (a: OfferType, b: OfferType) =>
  b.rating - a.rating;


export const sortOffers = (filteredOffers: OfferType[], currentSortType: string) => {
  switch(currentSortType) {
    case SortingOptions.Default:
      return filteredOffers;
    case SortingOptions.AscendingPrice:
      return filteredOffers.slice().sort(sortOffersByAscendingPrice);
    case SortingOptions.DescendingPrice:
      return filteredOffers.slice().sort(sortOffersByDescendingPrice);
    case SortingOptions.Rating:
      return filteredOffers.slice().sort(sortOffersByRating);
    default:
      throw new Error(`${currentSortType} not exist`);
  }
};

type showNofityPropsType = {
  type: string;
  message: string;
}

export const showNofity = (options: showNofityPropsType) => {
  switch(options.type) {
    case 'error':
      toast.error(options.message, {
        toastId: 1,
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
      break;
    case 'warn':
      toast.warn(options.message, {
        toastId: 2,
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
      break;
  }};

export const sortReviewFromNewToOld = (reviews: ReviewType[]) =>
  reviews.sort((a: ReviewType, b: ReviewType) =>
    Date.parse(b.date) - Date.parse(a.date)
  );

