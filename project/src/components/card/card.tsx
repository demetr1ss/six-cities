import { CardClassNames, ImageHeight, ImageWidth } from 'const/const';
import { Link } from 'react-router-dom';
import { Offer } from 'types/offer';
import { convertRatingToPercent } from 'utils/utils';
import styles from './card.module.css';

type CardProps = {
  offer: Offer;
  className: string;
  onMouseOver?: () => void;
  onMouseOut?:() => void;
}

export default function Card ({offer, className, onMouseOver, onMouseOut}: CardProps): JSX.Element {
  const {isPremium, isFavorite, previewImage, price, rating, title, type, id} = offer;

  const setFavoriteClassName = () => isFavorite
    ? 'place-card__bookmark-button place-card__bookmark-button--active button'
    : 'place-card__bookmark-button button';

  return (
    <article className={className} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ' '}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image"
            src={previewImage}
            width={className === CardClassNames.Sities ? ImageWidth.Sities : ImageWidth.Favorites}
            height={className === CardClassNames.Sities ? ImageHeight.Sities : ImageHeight.Favorites}
            alt="Place"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
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
            <span style={{width: convertRatingToPercent(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${id}`}>{title}</Link>
        </h2>
        <p className={`place-card__type ${styles.placeCard__type}`}>{type}</p>
      </div>
    </article>
  );
}
