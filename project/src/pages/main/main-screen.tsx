import Header from 'components/header/header';
import Navigation from 'components/header/navigation';
import Locations from 'components/locations/locations';
import MainEmpty from 'components/main-empty/main-empty';
import Map from 'components/map/map';
import OffersList from 'components/offers-list/offers-list';
import Sorting from 'components/sorting/sorting';
import { MapClassNames } from 'const/const';
import { useAppSelector } from 'hooks';
import { useState } from 'react';
import { getCity, getSortType } from 'store/app-process/selectors';
import { getOffers } from 'store/offers-data/selectors';
import { sortOffers } from 'utils/utils';

export default function MainScreen(): JSX.Element {
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const currentSortType = useAppSelector(getSortType);

  const [selectedOfferId, setSelectedOfferId] = useState(0);

  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  const sortedOffers = sortOffers(filteredOffers, currentSortType);

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
                  <b className="places__found">{`${filteredOffers.length} places to stay in ${city}`}</b>
                  <Sorting />
                  <OffersList offers={sortedOffers} setSelectedOfferId={setSelectedOfferId}/>
                </section>
                <div className="cities__right-section">
                  <Map
                    city={filteredOffers[0].city}
                    offers={filteredOffers}
                    mapClassName={MapClassNames.CITIES}
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
