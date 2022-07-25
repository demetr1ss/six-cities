import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';
import { AppRoute, CardClassNames, ImageSize } from 'const/const';
import { Offer } from 'types/offer';
import { convertRatingToPercent } from 'utils/utils';
import styles from './card.module.css';
import PremiumMark from 'components/premium-mark/premium-mark';
import FavoriteButton from 'components/favorite-button/favorite-button';

type CardProps = {
  offer: Offer;
  className: string;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  isSmall?: boolean;
}

const setPageClass = (className: string): string => {
  let pageClass = '';

  switch (className) {
    case CardClassNames.Sities:
      pageClass = 'cities';
      break;

    case CardClassNames.Favorites:
      pageClass = 'favorites';
      break;

    case CardClassNames.NearPlaces:
      pageClass = 'near-places';
      break;

    default:
      throw new Error(`class "${className}" not recognized`);
  }

  return pageClass;
};

export default function Card ({offer, className, onMouseOver, onMouseOut, isSmall}: CardProps)
: JSX.Element {
  const {
    isPremium,
    isFavorite,
    previewImage,
    price,
    rating,
    title,
    type,
    id
  } = offer;

  const imageSize = isSmall
    ? ImageSize.small
    : ImageSize.big;

  const infoClass = isSmall && 'favorites__card-info';

  return (
    <article className={className} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>

      {isPremium && <PremiumMark />}

      <div className={`${setPageClass(className)}__image-wrapper place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Room, {
          id: String(id)
        })}
        >
          <img className="place-card__image"
            src={previewImage}
            width={imageSize.width}
            height={imageSize.height}
            alt={title}
          />
        </Link>
      </div>

      <div className={`${infoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton isFavorite={isFavorite}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: convertRatingToPercent(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={generatePath(AppRoute.Room, {
              id: String(id)
            })}
          >
            {title}
          </Link>
        </h2>
        <p className={`place-card__type ${styles.placeCard__type}`}>{type}</p>
      </div>
    </article>
  );
}
