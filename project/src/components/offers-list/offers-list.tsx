import Card from 'components/card/card';
import { Offer } from 'types/offer';
import { CardClassNames } from 'const/const';
import { useAppDispatch } from 'hooks';
import { setActiveCardOnMap } from 'store/action';

type OfferListProps = {
 offers: Offer[];
}

export default function OffersList({offers}: OfferListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (
          <Card
            key={offer.id}
            className={CardClassNames.Sities}
            offer={offer}
            onMouseOver={() => dispatch(setActiveCardOnMap(offer.id))}
            onMouseOut={() => dispatch(setActiveCardOnMap(0))}
          />
        )
      )}
    </div>
  );
}
