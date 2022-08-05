import Logo from 'components/logo/logo';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { AppRoute, formFiedls, emailRegExp, passwordRegExp } from 'const/const';
import { randomCity } from 'utils/utils';
import { changeCity } from 'store/action';
import styles from './login-screen.module.css';
import { AuthData } from 'types/auth-data';
import { loginAction } from 'store/api-actions';
import { useAppDispatch } from 'hooks';

type FieldProps = {
  value: string,
  error: boolean,
  errorText: string,
  regex: RegExp;
}

type FormStateProps = {
  [key: string]: FieldProps
}

export default function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRouteCityClick = () => dispatch(changeCity(randomCity));
  const [formState, setFormState] = useState<FormStateProps>({
    email: {
      value: '',
      error: false,
      errorText: 'Invalid email',
      regex: emailRegExp
    },
    password: {
      value: '',
      error: false,
      errorText: 'Password must contain at least 1 digit and 1 letter',
      regex: passwordRegExp
    }
  });

  const {email, password} = formState;

  const disabled = (email.error || password.error);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
    navigate(AppRoute.Main);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (email.value !== null && password.value !== null) {
      onSubmit({
        email: email.value,
        password: password.value,
      });
    }
  };

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    const rule = formState[name].regex;

    setFormState({
      ...formState,
      [name]: {
        ...formState[name],
        value,
        error: !rule.test(value)
      }
    });
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              {Object.entries(formFiedls).map(([name, label]) => {
                const inputClassName = cn('login__input form__input', {
                  [styles.error]: formState[name].error
                });
                return (
                  <div className="login__input-wrapper form__input-wrapper" key={name}>
                    <label className="visually-hidden">{label}</label>
                    <input
                      className={inputClassName}
                      type={name}
                      name={name}
                      placeholder={label}
                      required
                      value={formState[name].value}
                      onChange={handleInputChange}
                    />
                    {formState[name].error && <p className={styles.errorText}>{formState[name].errorText}</p>}
                  </div>
                );
              })}
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={disabled}
              >
                Sign in
              </button>
            </form>
          </section>
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

