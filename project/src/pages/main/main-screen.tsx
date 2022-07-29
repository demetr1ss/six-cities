import { MouseEvent } from 'react';
import { Offer } from 'types/offer';
import { MapClassNames } from 'const/const';
import { useAppDispatch, useAppSelector } from 'hooks';
import { changeCity } from 'store/action';
import Header from 'components/header/header';
import Map from 'components/map/map';
import OffersList from 'components/offers-list/offers-list';
import Sorting from 'components/sorting/sorting';
import Locations from 'components/locations/locations';
import MainEmpty from 'components/main-empty/main-empty';

type MainScreenProps = {
  offers: Offer[]
}


export default function MainScreen({offers}: MainScreenProps): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  const changeCityHandler = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const cityName = evt.currentTarget.innerText;
    dispatch(changeCity(cityName));
  };
  const filteredOffers = offers.filter((offer) => offer.city.name === city);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations activeCity={city} onClick={changeCityHandler}/>
        <div className="cities">
          {filteredOffers.length ?
            (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{`${filteredOffers.length} places to stay in ${city}`}</b>
                  <Sorting />
                  <OffersList offers={filteredOffers}/>
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
