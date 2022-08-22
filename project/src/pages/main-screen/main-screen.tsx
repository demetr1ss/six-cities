import Header from 'components/header/header';
import Navigation from 'components/header/navigation/navigation';
import Locations from 'components/locations/locations';
import MainEmpty from 'components/main-empty/main-empty';
import OffersAvailible from 'components/offers-available/offers-available';
import { useAppSelector } from 'hooks';
import { getCity } from 'store/app-process/selectors';
import { selectFilteredOffers, selectSortedOffers } from 'store/offers-data/selectors';

export default function MainScreen(): JSX.Element {
  const city = useAppSelector(getCity);
  const filteredOffers = useAppSelector(selectFilteredOffers);
  const sortedOffers = useAppSelector(selectSortedOffers);

  return (
    <div className="page page--gray page--main">
      <Header>
        <Navigation />
      </Header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations activeCity={city} />
        <div className="cities">
          {filteredOffers.length > 0
            ? <OffersAvailible filteredOffers={filteredOffers} sortedOffers={sortedOffers} city={city}/>
            : <MainEmpty city={city} />}
        </div>
      </main>
    </div>
  );
}
