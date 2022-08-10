import cn from 'classnames';
import FavoriteButton from 'components/favorite-button/favorite-button';
import PremiumMark from 'components/premium-mark/premium-mark';
import { AppRoute, CardClassNames, ImageSize, PremiumMarkClassNames } from 'const/const';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';
import { Offer } from 'types/offer';
import { convertRatingToPercent } from 'utils/utils';
import styles from './card.module.css';

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
      pageClass = 'cities__image-wrapper';
      break;

    case CardClassNames.Favorites:
      pageClass = 'favorites__image-wrapper';
      break;

    case CardClassNames.NearPlaces:
      pageClass = 'near-places__image-wrapper';
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
    ? ImageSize.SMALL
    : ImageSize.BIG;

  const infoClass = cn({'favorites__card-info': isSmall},
    'place-card__info'
  );

  const cardTypeClassName = cn('place-card__type', styles.placeCard__type);

  const pageClassName = cn(setPageClass(className), 'place-card__image-wrapper');

  return (
    <article className={className} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>

      {isPremium && <PremiumMark premiumCardClassName={PremiumMarkClassNames.PLACE}/>}

      <div className={pageClassName}>
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

      <div className={infoClass}>
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
        <p className={cardTypeClassName}>{type}</p>
      </div>
    </article>
  );
}

