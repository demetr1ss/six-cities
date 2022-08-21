import cn from 'classnames';
import styles from './user-auth.module.css';
import { AppRoute } from 'const/const';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Link } from 'react-router-dom';
import { logoutAction } from 'store/api-actions';
import { getFavoriteOffers } from 'store/favorite-offers-data/selectors';
import { getUserEmail } from 'store/user-process/selectors';

export default function UserAuth():JSX.Element {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(getUserEmail);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const handleLogoutClick = () => dispatch(logoutAction());
  const countClassNames = cn('header__favorite-count', {
    [styles.hiddenCount] : favoriteOffers.length === 0
  });

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userEmail}</span>
            <span className={countClassNames}>{favoriteOffers.length > 0 ? favoriteOffers.length : ''}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to={AppRoute.Login}>
            <span className="header__signout" onClick={handleLogoutClick}>Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
