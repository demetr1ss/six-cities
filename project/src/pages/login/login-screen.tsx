import Header from 'components/header/header';
import LoginForm from 'components/login-form/login-form';
import { Link } from 'react-router-dom';
import { AppRoute} from 'const/const';
import { changeCity } from 'store/action';
import { useAppDispatch } from 'hooks';
import { cityList } from 'const/const';

export default function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
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

