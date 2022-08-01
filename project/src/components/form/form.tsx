import styles from './form.module.css';
import RatingForm from './rating-form/rating-form';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Form(): JSX.Element {
  const [comment, setComment] = useState({
    rating: 0,
    review: ''
  });

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
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
      <RatingForm onChange={handleInputChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleInputChange}
        value={comment.review}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className={styles.textAmount}> 50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!comment.review || !comment.rating}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
