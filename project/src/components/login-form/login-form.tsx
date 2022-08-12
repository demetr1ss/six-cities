import cn from 'classnames';
import { emailRegExp, passwordRegExp } from 'const/const';
import { useAppDispatch } from 'hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import { loginAction } from 'store/api-actions';
import styles from './login-form.module.css';

type FieldPropsType = {
  value: string,
  error: boolean,
  errorText: string,
  regex: RegExp;
}

type FormStatePropsType = {
  [key: string]: FieldPropsType
}

const Formfiedls = {
  email: 'E-mail',
  password: 'password'
} as const;

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState<FormStatePropsType>({
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


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (email.value !== null && password.value !== null) {
      dispatch(loginAction({
        email: email.value,
        password: password.value,
      }));
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
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
        {Object.entries(Formfiedls).map(([name, label]) => {
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
  );
}
