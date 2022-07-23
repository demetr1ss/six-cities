import { rating, RatingTitles } from 'const/const';
import { ChangeEvent, Fragment } from 'react';

type RatingFormProps = {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export default function RatingForm({onChange}: RatingFormProps) {
  return(
    <div className="reviews__rating-form form__rating">
      {rating.map((item) => (
        <Fragment key={`${item}-star`}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={item}
            id={`${item}-stars`}
            type="radio"
            onChange={onChange}
          />
          <label
            htmlFor={`${item}-stars`}
            className="reviews__rating-label form__rating-label"
            title={RatingTitles[item]}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>
      )
      )}
    </div>
  );
}
