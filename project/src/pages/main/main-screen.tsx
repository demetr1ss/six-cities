import Header from 'components/header/header';
import Locations from 'components/locations/locations';
import MainEmpty from 'components/main-empty/main-empty';
import Map from 'components/map/map';
import OffersList from 'components/offers-list/offers-list';
import Sorting from 'components/sorting/sorting';
import { MapClassNames, SortingOptions } from 'const/const';
import { useAppSelector } from 'hooks';
import {
  sortOffersByAscendingPrice,
  sortOffersByDescendingPrice,
  sortOffersByRating
} from 'utils/utils';

export default function MainScreen(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const currentSortType = useAppSelector((state) => state.sortType);

  const filteredOffers = offers.filter((offer) => offer.city.name === city);

  const sortedOffers = () => {
    switch(currentSortType) {
      case SortingOptions.Default:
        return filteredOffers;
      case SortingOptions.AscendingPrice:
        return filteredOffers.sort(sortOffersByAscendingPrice);
      case SortingOptions.DescendingPrice:
        return filteredOffers.sort(sortOffersByDescendingPrice);
      case SortingOptions.Rating:
        return filteredOffers.sort(sortOffersByRating);
      default:
        throw new Error(`${currentSortType} not exist`);
    }
  };

  return (
    <div className="page page--gray page--main">
      <Header />
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
                  <OffersList offers={sortedOffers()}/>
                </section>
                <div className="cities__right-section">
                  <Map city={filteredOffers[0].city} offers={filteredOffers} mapClassName={MapClassNames.CITIES}/>
                </div>
              </div>
            )
            : <MainEmpty city={city} />}
        </div>
      </main>
    </div>
  );
}
