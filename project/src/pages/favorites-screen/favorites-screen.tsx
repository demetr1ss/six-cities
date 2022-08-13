import Card from 'components/card/card';
import FavoritesEmpty from 'components/favorites-empty/favorites-empty';
import Header from 'components/header/header';
import Navigation from 'components/header/navigation';
import { AppRoute, CardClassNames } from 'const/const';
import { useAppSelector } from 'hooks';
import { Link } from 'react-router-dom';
import { getFavoriteOffers } from 'store/favorite-offers-data/selectors';
import { OfferType } from 'types/offer-type';

type GroupedCitiesType = {
  [key: string]: OfferType[]
};

export default function FavoritesScreen(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const groupedCities = favoriteOffers.reduce<GroupedCitiesType>((prev, curr) => {
    if (!prev[curr.city.name]) {
      prev[curr.city.name] = [];
    }

    prev[curr.city.name].push(curr);

    return prev;
  }, {});

  const citiesList = Object.keys(groupedCities);

  if (favoriteOffers.length > 0) {
    return (
      <>
        <Header>
          <Navigation />
        </Header>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {citiesList.map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={AppRoute.Main}>
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {groupedCities[city].map((offer) => (
                        <Card key={offer.id} offer={offer} className={CardClassNames.Favorites} isSmall />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.Main}>
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </Link>
        </footer>
      </>
    );
  }

  return <FavoritesEmpty />;
}
