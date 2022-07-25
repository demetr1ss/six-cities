import { HumanDateOptions, ProMarkClassNames } from 'const/const';
import { Review } from 'types/review';
import { convertRatingToPercent } from 'utils/utils';
import ProMark from 'components/pro-mark/pro-mark';

type ReviewItemType = {
  review: Review
}

function setProMark (person: {isPro: boolean}) {
  return person.isPro && <ProMark proMarkClassName={ProMarkClassNames.REVIEW}/>;
}

export default function ReviewItem({review}: ReviewItemType) {
  const humanDate = new Date(review.date).toLocaleDateString('en-US', HumanDateOptions);
  const dateTime = new Date(review.date).toISOString();

  return (
    <li key={`review-${review.id}`} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
        {setProMark(review.user)}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: convertRatingToPercent(review.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={dateTime}>{humanDate}</time>
      </div>
    </li>
  );
}
