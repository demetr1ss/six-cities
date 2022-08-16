import Header from 'components/header/header';
import Navigation from 'components/header/navigation';
import Locations from 'components/locations/locations';
import MainEmpty from 'components/main-empty/main-empty';
import Map from 'components/map/map';
import OffersList from 'components/offers-list/offers-list';
import Sorting from 'components/sorting/sorting';
import { MapClassName } from 'const/const';
import { useAppSelector } from 'hooks';
import { useState } from 'react';
import { getCity } from 'store/app-process/selectors';
import { selectFilteredOffers, selectSortedOffers } from 'store/offers-data/selectors';

export default function MainScreen(): JSX.Element {
  const combineState = useAppSelector((state) => state);
  const city = useAppSelector(getCity);
  const filteredOffers = selectFilteredOffers(combineState);
  const sortedOffers = selectSortedOffers(combineState);

  const [selectedOfferId, setSelectedOfferId] = useState(0);

  return (
    <div className="page page--gray page--main">
      <Header>
        <Navigation />
      </Header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations activeCity={city} />
        <div className="cities">
          {filteredOffers.length > 0 ?
            (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">
                    {`${filteredOffers.length} places to stay in ${city}`}
                  </b>
                  <Sorting />
                  <OffersList
                    offers={sortedOffers}
                    setSelectedOfferId={setSelectedOfferId}
                  />
                </section>
                <div className="cities__right-section">
                  <Map
                    city={filteredOffers[0].city}
                    offers={filteredOffers}
                    mapClassName={MapClassName.CITIES}
                    selectedOfferId={selectedOfferId}
                  />
                </div>
              </div>
            )
            : <MainEmpty city={city} />}
        </div>
      </main>
    </div>
  );
}
