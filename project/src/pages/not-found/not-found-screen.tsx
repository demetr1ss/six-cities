import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from 'const/const';
import styles from './not-found-screen.module.css';
import Header from 'components/header/header';

export default function NotFoundScreen(): JSX.Element {
  useEffect(() => {
    document.title = '404 page not found';
  });

  return (
    <main className="page__main page__main--not-found">
      <div className="page__not-found-container container">
        <Header />
        <section className={styles.container}>
          <h1 className={styles.error404}>404</h1>
          <h2>Page not found</h2>
          <Link className={styles.link}to={AppRoute.Main}>Вернуться на главную</Link>
        </section>
      </div>
    </main>
  );
}
