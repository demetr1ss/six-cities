import ReviewItem from '../review-item/review-item';
import { useAppSelector } from 'hooks';
import { sortReviewFromNewToOld } from 'utils/utils';
import { MAX_REVIEWS } from 'const/const';

export default function ReviewsList(): JSX.Element {
  const reviews = useAppSelector((state) => state.reviews);
  const sortedReviews = sortReviewFromNewToOld([...reviews]);

  return(
    <>
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          {reviews.length}
        </span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.slice(0, MAX_REVIEWS).map((review) =>
          <ReviewItem key={review.id} review={review}/>
        )}
      </ul>
    </>
  );
}
