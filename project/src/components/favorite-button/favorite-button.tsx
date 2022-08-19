import cn from 'classnames';
import { AppRoute, AuthorizationStatus, FavoriteIconSize } from 'const/const';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      showNotify({
        type: 'warn',
        message: 'To add the offer to favorites please log in'
      });

      navigate(AppRoute.Login);
      return;
    }

    dispatch(changeFavoriteStatusAction({
      id,
      status: Number(!isFavorite),
    }));
  };

  const favoriteIconSize = isBig
    ? FavoriteIconSize.BIG
    : FavoriteIconSize.SMALL;

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
