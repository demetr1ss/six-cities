import MainScreen from 'pages/main/main-screen';
import FavoritesScreen from 'pages/favorites/favorites-screen';
import LoginScreen from 'pages/login/login-screen';
import PropertyScreen from 'pages/property/property-screen';
import NotFoundScreen from 'pages/not-found/not-found-screen';
import LoadingScreen from 'pages/loading-screen/loading-screen';
import PrivateRoute from 'components/private-route/private-route';
import ScrollToTop from 'components/scroll-to-top/scroll-to-top';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoute } from 'const/const';
import { useAppSelector } from 'hooks';


export default function App(): JSX.Element {
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
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
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesScreen />
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
