import { FavoriteIconSizes } from 'const/const';

type FavoriteButtonType = {
  isFavorite: boolean;
  isBig?: boolean;
}

export default function FavoriteButton({isFavorite, isBig}: FavoriteButtonType): JSX.Element {
  const bookMarkClassName = isBig
    ? 'property'
    : 'place-card';

  const favoriteClassName = isFavorite && 'place-card__bookmark-button--active';

  const favoriteIconSize = isBig
    ? FavoriteIconSizes.big
    : FavoriteIconSizes.small;

  return(
    <button className={`${bookMarkClassName}__bookmark-button ${favoriteClassName} button`} type="button">
      <svg className="place-card__bookmark-icon" width={favoriteIconSize.width} height={favoriteIconSize.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
