import { LoadingStatus, ReviewLength } from 'const/const';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendReviewAction } from 'store/api-actions';
import { getReviewSendingStatus } from 'store/reviews-data/selectors';
import RatingForm from '../rating-form/rating-form';
import styles from './form.module.css';

export default function Form(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const sendingStatus = useAppSelector(getReviewSendingStatus);
  const [comment, setComment] = useState({
    rating: 0,
    review: ''
  });

  const [isFormDisabled, setFormDisabled] = useState(false);

  const {rating, review} = comment;

  const isFormValid = rating > 0 && review.length >= ReviewLength.MIN && review.length <= ReviewLength.MAX;

  useEffect(() => {
    switch(sendingStatus) {
      case LoadingStatus.Fulfilled:
        setComment({
          rating: 0,
          review: ''
        });
        setFormDisabled(false);
        break;
      case LoadingStatus.Pending:
        setFormDisabled(true);
        break;
      case LoadingStatus.Rejected:
        setFormDisabled(false);
        break;
      case LoadingStatus.Idle:
        setFormDisabled(false);
        break;
      default:
        throw new Error(`sendingStatus-${sendingStatus} dosn't exist`);
    }
  }, [sendingStatus]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isFormValid) {
      dispatch(sendReviewAction({
        id: `${params.id}`,
        comment: review,
        rating
      }));
    }
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    setComment({
      ...comment,
      [name]: value
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingForm onChange={handleInputChange} activeRating={rating} disabled={isFormDisabled}/>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleInputChange}
        value={review}
        minLength={ReviewLength.MIN}
        maxLength={ReviewLength.MAX}
        disabled={isFormDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating </span>
          and describe your stay with at least
          <b className={styles.textAmount}> {ReviewLength.MIN} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isFormDisabled}
        >
          {isFormDisabled ? 'Submiting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
