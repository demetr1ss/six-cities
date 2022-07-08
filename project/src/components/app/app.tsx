import MainScreen from '../../pages/main/main-screen';
// import FavoritesScreen from '../../pages/favorites/favorites-screen';
// import LoginScreen from '../../pages/login/login-screen';
// import PropertyScreen from '../../pages/property/property-screen';
// import NotFoundScreen from '../../pages/not-found/not-found-screen';

type AppScreenProps = {
    cardsCount: number;
}

export default function App({cardsCount}: AppScreenProps): JSX.Element {
  return <MainScreen cardsCount= {cardsCount} />;
}
