import { Link } from 'react-router-dom';
import { Offer } from 'types/offer';
import { AppRoute } from 'const/const';
import Header from 'components/header/header';
import Map from 'components/map/map';
import OffersList from 'components/offers-list/offers-list';
import Sorting from 'components/sorting/sorting';

type MainScreenProps = {
  offers: Offer[]
}

export default function MainScreen({offers}: MainScreenProps): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to={AppRoute.Main}>
                  <span>Paris</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to={AppRoute.Main}>
                  <span>Cologne</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to={AppRoute.Main}>
                  <span>Brussels</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item tabs__item--active" to={AppRoute.Main}>
                  <span>Amsterdam</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to={AppRoute.Main}>
                  <span>Hamburg</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to={AppRoute.Main}>
                  <span>Dusseldorf</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <Sorting />
              <OffersList offers={offers}/>
            </section>
            <div className="cities__right-section">
              <Map city={offers[0].city} offers={offers}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
