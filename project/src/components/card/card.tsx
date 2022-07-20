import { CardClassNames, ImageHeight, ImageWidth } from 'const/const';
import { Link } from 'react-router-dom';
import { Offer } from 'types/offer';
import { convertRatingToPercent} from 'utils/utils';
import styles from './card.module.css';
import PremiumMark from 'components/premium-mark/premium-mark';

type CardProps = {
  offer: Offer;
  className: string;
  onMouseOver?: () => void;
  onMouseOut?:() => void;
}

export default function Card ({offer, className, onMouseOver, onMouseOut}: CardProps)
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

  const setFavoriteClassName = () => isFavorite
    ? 'place-card__bookmark-button place-card__bookmark-button--active button'
    : 'place-card__bookmark-button button';

  const imageWidth = className === CardClassNames.Favorites
    ? ImageWidth.Favorites
    : ImageWidth.Default;

  const imageHeight = className === CardClassNames.Favorites
    ? ImageHeight.Favorites
    : ImageHeight.Default;

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

  const infoClass = className === CardClassNames.Favorites
    ? 'favorites__card-info'
    : '';

  return (
    <article className={className} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>

      {isPremium ? <PremiumMark /> : ''}

      <div className={`${pageClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image"
            src={previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place"
          />
        </Link>
      </div>

      <div className={`${infoClass}place-card__info`}>
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
