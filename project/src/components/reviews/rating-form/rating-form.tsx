import { rating, RatingTitle } from 'const/const';
import { ChangeEvent, Fragment } from 'react';

type RatingFormPropsType = {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  activeRating: number;
  disabled: boolean;
}

export default function RatingForm({onChange, activeRating, disabled}: RatingFormPropsType) {
  return(
    <div className="reviews__rating-form form__rating">
      {rating.map((item) => {
        const isChecked = Number(activeRating) === item;

        return (
          <Fragment key={item}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={item}
              id={`${item}-stars`}
              type="radio"
              onChange={onChange}
              checked={isChecked}
              disabled={disabled}
            />
            <label
              htmlFor={`${item}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RatingTitle[item]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        );
      })}
    </div>
  );
}
