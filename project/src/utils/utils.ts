import { MAX_RATING, SortingOption, ToastType } from 'const/const';
import { toast, Zoom } from 'react-toastify';
import { OfferType } from 'types/offer-type';
import { ReviewType } from 'types/review-type';

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
    case SortingOption.Default:
      return filteredOffers;
    case SortingOption.AscendingPrice:
      return filteredOffers.slice().sort(sortOffersByAscendingPrice);
    case SortingOption.DescendingPrice:
      return filteredOffers.slice().sort(sortOffersByDescendingPrice);
    case SortingOption.Rating:
      return filteredOffers.slice().sort(sortOffersByRating);
    default:
      throw new Error(`${currentSortType} not exist`);
  }
};

type showNotifyPropsType = {
  type: string;
  message: string;
}

export const showNotify = (options: showNotifyPropsType) => {
  switch(options.type) {
    case ToastType.Error:
      toast.error(options.message, {
        toastId: 1,
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
        transition: Zoom,
        pauseOnHover: false,
      });
      break;
    case ToastType.Warn:
      toast.warn(options.message, {
        toastId: 2,
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
        transition: Zoom,
        pauseOnHover: false,
      });
      break;
    default:
      throw new Error(`toast type "${options.type}" not exist`);
  }};

export const sortReviewFromNewToOld = (reviews: ReviewType[]) =>
  reviews.sort((a: ReviewType, b: ReviewType) =>
    Date.parse(b.date) - Date.parse(a.date)
  );

