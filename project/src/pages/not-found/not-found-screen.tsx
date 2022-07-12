import Header from '../../components/header/header';
import {Link} from 'react-router-dom';

export default function NotFoundScreen(): JSX.Element {
  return (
    <main className="page__main page__main--not-found">
      <div className="page__not-found-container container">
        <Header />
        <section className='page-not-found__screen'>
          <h1>404. Page not found</h1>
          <Link to="/">Вернуться на главную</Link>
        </section>
      </div>
    </main>
  );
}
