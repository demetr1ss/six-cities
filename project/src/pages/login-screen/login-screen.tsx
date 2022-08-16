import Header from 'components/header/header';
import LoginForm from 'components/login-form/login-form';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus} from 'const/const';
import { changeCity } from 'store/app-process/app-process';
import { useAppDispatch, useAppSelector } from 'hooks';
import { cityList } from 'const/const';
import { getAuthorizationStatus } from 'store/user-process/selectors';
import MainScreen from 'pages/main-screen/main-screen';

export default function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const userAuthStatus = useAppSelector(getAuthorizationStatus);

  if (userAuthStatus === AuthorizationStatus.Auth) {
    return <MainScreen />;
  }

  const randomCity = cityList[Math.floor(Math.random() * cityList.length)];
  const handleRouteCityClick = () => dispatch(changeCity(randomCity));

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} onClick={handleRouteCityClick}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

