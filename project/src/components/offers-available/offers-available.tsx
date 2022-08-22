import OffersList from 'components/offers-list/offers-list';
import Sorting from 'components/sorting/sorting';
import Map from 'components/map/map';
import { MapClassName } from 'const/const';
import { OfferType } from 'types/offer-type';
import { useCallback, useState } from 'react';

type OfferAvailibleType = {
  filteredOffers: OfferType[];
  sortedOffers: OfferType[];
  city: string;
}

export default function OffersAvailable ({filteredOffers, sortedOffers, city}: OfferAvailibleType): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState(0);
  const onCardMouseOver = useCallback((id:number) => setSelectedOfferId(id), []);
  const onCardMouseOut = useCallback(() => setSelectedOfferId(0), []);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {`${filteredOffers.length} places to stay in ${city}`}
        </b>
        <Sorting />
        <OffersList
          offers={sortedOffers}
          onCardMouseOver={onCardMouseOver}
          onCardMouseOut={onCardMouseOut}
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
  );
}

