import browserHistory from 'components/browser-history';
import HistoryRouter from 'components/history-route/history-route';
import PrivateRoute from 'components/private-route/private-route';
import ScrollToTop from 'components/scroll-to-top/scroll-to-top';
import { AppRoute, AuthorizationStatus, LoadingStatus } from 'const/const';
import { useAppSelector } from 'hooks';
import FavoritesScreen from 'pages/favorites-screen/favorites-screen';
import LoadingScreen from 'pages/loading-screen/loading-screen';
import ErrorScreen from 'pages/error-screen/error-screen';
import LoginScreen from 'pages/login-screen/login-screen';
import MainScreen from 'pages/main-screen/main-screen';
import NotFoundScreen from 'pages/not-found-screen/not-found-screen';
import PropertyScreen from 'pages/property-screen/property-screen';
import { Route, Routes } from 'react-router-dom';
import { getOffersDataLoadedStatus } from 'store/offers-data/selectors';
import { getAuthorizationStatus } from 'store/user-process/selectors';

export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offersLoadingStatus = useAppSelector(getOffersDataLoadedStatus);

  if (
    authorizationStatus === AuthorizationStatus.Unknown ||
    offersLoadingStatus === LoadingStatus.Idle ||
    offersLoadingStatus === LoadingStatus.Pending
  ) {
    return <LoadingScreen />;

  } else if (offersLoadingStatus === LoadingStatus.Rejected) {
    return <ErrorScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Room}
          element={<PropertyScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}
