import { AppRoute } from 'const/const';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Link } from 'react-router-dom';
import { logoutAction } from 'store/api-actions';

export default function UserAuth():JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const handleLogoutClick = () => dispatch(logoutAction());

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
            <span className="header__favorite-count">{favoriteOffers.length}</span>
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
