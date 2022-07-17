import { Offer } from 'types/offer';
import Card from 'components/card/card';

type OfferListProps = {
 offers: Offer[];
}

export default function OffersList({offers}: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item, index) => <Card key={item.id} offer={item} />)}
    </div>
  );
}
