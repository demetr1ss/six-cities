import cn from 'classnames';
import { AppRoute, AuthorizationStatus, FavoriteIconSizes } from 'const/const';
import { useAppDispatch, useAppSelector } from 'hooks';
import { redirectToRoute } from 'store/action';
import { changeFavoriteStatusAction } from 'store/api-actions';
import { getAuthorizationStatus } from 'store/user-process/selectors';

type FavoriteButtonPropsType = {
  isFavorite: boolean;
  isBig?: boolean;
  id: number;
}

export default function FavoriteButton({isFavorite, isBig, id}: FavoriteButtonPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const isUserAuth = useAppSelector(getAuthorizationStatus);

  const handleButtonClick = () => {
    if (isUserAuth === AuthorizationStatus.NoAuth) {
      dispatch(redirectToRoute(AppRoute.Login));
    }

    dispatch(changeFavoriteStatusAction({
      id,
      status: +(!isFavorite),
    }));
  };

  const favoriteIconSize = isBig
    ? FavoriteIconSizes.BIG
    : FavoriteIconSizes.SMALL;

  const bookMarkClassName = cn({
    'property__bookmark-button': isBig,
    'place-card__bookmark-button': !isBig,
    'place-card__bookmark-button--active': isFavorite,
  }, 'button');

  return(
    <button className={bookMarkClassName} type="button" onClick={handleButtonClick}>
      <svg className="place-card__bookmark-icon" width={favoriteIconSize.width} height={favoriteIconSize.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
