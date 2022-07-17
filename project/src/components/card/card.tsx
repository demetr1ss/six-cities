import { MAX_RATING } from 'const/const';
import { Link } from 'react-router-dom';
import { Offer } from 'types/offer';
import styles from './card.module.css';

type CardProps = {
  offer: Offer;
}

function convertRatingToPercent(rating: number) {
  return `${Math.ceil((100 * rating / MAX_RATING))}%`;
}

export default function Card ({offer}: CardProps): JSX.Element {
  const setFavoriteClassName = () => offer.isFavorite
    ? 'place-card__bookmark-button place-card__bookmark-button--active button'
    : 'place-card__bookmark-button button';


  return (
    <article className="cities__card place-card">
      {offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ' '}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to="/offer/01">
          <img className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={setFavoriteClassName()} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: convertRatingToPercent(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/">{offer.title}</a>
        </h2>
        <p className={`place-card__type ${styles.placCard__type}`}>{offer.type}</p>
      </div>
    </article>
  );
}
