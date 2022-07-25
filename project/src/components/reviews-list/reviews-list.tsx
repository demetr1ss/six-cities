import { Review } from 'types/review';
import ReviewItem from 'components/review-item/review-item';

type CommentListType = {
  reviews: Review[];
}

export default function CommentList({reviews}: CommentListType): JSX.Element {
  return(
    <>
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          {reviews.length}
        </span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) =>
          <ReviewItem key={review.id} review={review}/>
        )}
      </ul>
    </>
  );
}
