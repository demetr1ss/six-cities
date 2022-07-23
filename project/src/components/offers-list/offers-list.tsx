import { useState } from 'react';
import { Offer } from 'types/offer';
import { CardClassNames } from 'const/const';
import Card from 'components/card/card';

type OfferListProps = {
 offers: Offer[];
}

export default function OffersList({offers}: OfferListProps): JSX.Element {
  const [, setActiveCardId] = useState(0);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (
          <Card
            key={offer.id}
            className={CardClassNames.Sities}
            offer={offer}
            onMouseOver={() => setActiveCardId(offer.id)}
            onMouseOut={() => setActiveCardId(0)}
          />
        )
      )}
    </div>
  );
}
