import cn from 'classnames';
import { FavoriteIconSizes } from 'const/const';

type FavoriteButtonPropsType = {
  isFavorite: boolean;
  isBig?: boolean;
}

export default function FavoriteButton({isFavorite, isBig}: FavoriteButtonPropsType): JSX.Element {
  const favoriteIconSize = isBig
    ? FavoriteIconSizes.BIG
    : FavoriteIconSizes.SMALL;

  const bookMarkClassName = cn({
    'property__bookmark-button': isBig,
    'place-card__bookmark-button': !isBig,
    'place-card__bookmark-button--active': isFavorite,
  }, 'button');

  return(
    <button className={bookMarkClassName} type="button">
      <svg className="place-card__bookmark-icon" width={favoriteIconSize.width} height={favoriteIconSize.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
