import MainScreen from 'pages/main/main-screen';
import FavoritesScreen from 'pages/favorites/favorites-screen';
import LoginScreen from 'pages/login/login-screen';
import PropertyScreen from 'pages/property/property-screen';
import NotFoundScreen from 'pages/not-found/not-found-screen';
import LoadingScreen from 'pages/loading-screen/loading-screen';
import PrivateRoute from 'components/private-route/private-route';
import ScrollToTop from 'components/scroll-to-top/scroll-to-top';
import HistoryRouter from 'components/history-route/history-route';
import browserHistory from 'components/browser-history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from 'const/const';
import { useAppSelector } from 'hooks';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export default function App(): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
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
