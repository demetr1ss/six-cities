import Card from 'components/card/card';
import FavoriteButton from 'components/favorite-button/favorite-button';
import Header from 'components/header/header';
import Navigation from 'components/header/navigation';
import Map from 'components/map/map';
import PremiumMark from 'components/premium-mark/premium-mark';
import ProMark from 'components/pro-mark/pro-mark';
import Review from 'components/reviews/reviews';
import { CardClassNames, LIMIT_IMAGE, LoadingStatus, MapClassNames, PremiumMarkClassNames } from 'const/const';
import { useAppDispatch, useAppSelector } from 'hooks';
import LoadingScreen from 'pages/loading-screen/loading-screen';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyAction } from 'store/api-actions';
import { getOffer, getOfferLoadingStatus } from 'store/offer-data/selectors';
import { getOffersNearby } from 'store/offers-nearby-data/selectors';
import { convertRatingToPercent } from 'utils/utils';

export default function PropertyScreen(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPropertyAction(`${params.id}`));
  }, [dispatch, params.id]);

  const offer = useAppSelector(getOffer);
  const nearOffers = useAppSelector(getOffersNearby);
  const offerLoadingStatus = useAppSelector(getOfferLoadingStatus);

  if (
    offerLoadingStatus === LoadingStatus.Idle ||
    offerLoadingStatus === LoadingStatus.Pending ||
    !offer
  ) {
    return (
      <LoadingScreen />
    );
  }

  const {
    isFavorite,
    isPremium,
    host,
    description,
    goods,
    price,
    maxAdults,
    bedrooms,
    rating,
    title,
    type,
    images,
    id
  } = offer;

  return(
    <div className="page">
      <Header>
        <Navigation />
      </Header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.slice(0, LIMIT_IMAGE).map((img) => (
                  <div key={img} className="property__image-wrapper">
                    <img className="property__image" src={img} alt={type} />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <PremiumMark premiumCardClassName={PremiumMarkClassNames.PROPERTY}/>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <FavoriteButton isFavorite={isFavorite} isBig id={id}/>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: convertRatingToPercent(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((item) => (
                      <li key={item} className="property__inside-item">
                        {item}
                      </li>))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {host.isPro && <ProMark />}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <Review />
            </div>
          </div>
          <Map
            city={offer.city}
            offers={nearOffers.concat(offer)}
            mapClassName={MapClassNames.PROPERTY}
            selectedOfferId={offer.id}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers?.map((nearOffer) =>
                (
                  <Card
                    key={nearOffer?.id}
                    className={CardClassNames.NearPlaces}
                    offer={nearOffer}
                  />
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
