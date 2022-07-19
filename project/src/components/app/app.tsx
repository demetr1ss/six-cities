import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainScreen from 'pages/main/main-screen';
import FavoritesScreen from 'pages/favorites/favorites-screen';
import LoginScreen from 'pages/login/login-screen';
import PropertyScreen from 'pages/property/property-screen';
import NotFoundScreen from 'pages/not-found/not-found-screen';
import PrivateRoute from 'components/private-route/private-route';
import ScrollToTop from 'components/scroll-to-top/scroll-to-top';
import { Offer } from 'types/offer';
import { AppRoute, AuthorizationStatus } from 'const/const';

type AppScreenProps = {
  offers: Offer[];
}

export default function App({offers}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen offers={offers} />}
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
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesScreen offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}
