import styles from './error-screen.module.css';

export default function ErrorScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src="img/logo.svg" alt="6 cities logo"/>
      <h1 className={styles.h1}>We are sorry &#129302;</h1>
    </div>
  );
}
