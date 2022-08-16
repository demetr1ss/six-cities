import cn from 'classnames';
import { AppRoute, AuthorizationStatus, FavoriteIconSizes } from 'const/const';
import { useAppDispatch, useAppSelector } from 'hooks';
import { redirectToRoute } from 'store/action';
import { changeFavoriteStatusAction } from 'store/api-actions';
import { getAuthorizationStatus } from 'store/user-process/selectors';
import { showNotify } from 'utils/utils';

type FavoriteButtonPropsType = {
  isFavorite: boolean;
  isBig?: boolean;
  id: number;
}

export default function FavoriteButton({isFavorite, isBig, id}: FavoriteButtonPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      dispatch(redirectToRoute(AppRoute.Login));
      showNotify({
        type: 'warn',
        message: 'To add the offer to favorites please log in'
      });
      return;
    }

    dispatch(changeFavoriteStatusAction({
      id,
      status: Number(!isFavorite),
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
