import Card from 'components/card/card';
import { CardClassNames } from 'const/const';
import { OfferType } from 'types/offer-type';

type OfferListPropsType = {
 offers: OfferType[];
 setSelectedOfferId: (id: number) => void;
}

export default function OffersList({offers, setSelectedOfferId}: OfferListPropsType): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (
          <Card
            key={offer.id}
            className={CardClassNames.Sities}
            offer={offer}
            onMouseOver={() => setSelectedOfferId(offer.id)}
            onMouseOut={() => setSelectedOfferId(0)}
          />
        )
      )}
    </div>
  );
}
