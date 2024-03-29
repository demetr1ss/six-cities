import styles from './not-found-screen.module.css';
import Header from 'components/header/header';
import Navigation from 'components/header/navigation/navigation';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from 'const/const';
import { showNotify } from 'utils/utils';

export default function NotFoundScreen(): JSX.Element {
  const location = useLocation();
  showNotify({
    type: 'error',
    message: `Page "${location.pathname.slice(1)}" not found`
  });

  return (
    <main className="page__main page__main--not-found">
      <div className="page__not-found-container container">
        <Header>
          <Navigation />
        </Header>
        <section className={styles.container}>
          <h1 className={styles.error404}>404</h1>
          <h2>Page not found</h2>
          <Link className={styles.link}to={AppRoute.Main}>Вернуться на главную</Link>
        </section>
      </div>
    </main>
  );
}
