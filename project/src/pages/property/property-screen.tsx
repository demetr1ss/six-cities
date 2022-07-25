import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Offer } from 'types/offer';
import { Review } from 'types/review';
import { convertRatingToPercent } from 'utils/utils';
import {
  CardClassNames,
  LIMIT_IMAGE,
  MapClassNames,
  MAX_NEAR_OFFERS,
  PremiumMarkClassNames,
  ProMarkClassNames
} from 'const/const';
import Card from 'components/card/card';
import FavoriteButton from 'components/favorite-button/favorite-button';
import Form from 'components/form/form';
import Header from 'components/header/header';
import PremiumMark from 'components/premium-mark/premium-mark';
import ProMark from 'components/pro-mark/pro-mark';
import CommentList from 'components/reviews-list/reviews-list';
import Map from 'components/map/map';
import NotFoundScreen from 'pages/not-found/not-found-screen';

type PropertyScreenProps = {
  offers: Offer[];
  reviews: Review[];
}

export default function PropertyScreen({offers, reviews}: PropertyScreenProps)
: JSX.Element {
  const [, setActiveCardId] = useState(0);
  const params = useParams();
  const offer = offers.find((item) => item.id === Number(params.id));
  const nearOffers = offers.slice(0, MAX_NEAR_OFFERS);

  if (!offer) {
    return (<NotFoundScreen />);
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
    images
  } = offer;

  function setPremiumMark () {
    return isPremium && <PremiumMark premiumCardClassName={PremiumMarkClassNames.PROPERTY}/>;
  }

  function setProMark (person: {isPro: boolean}) {
    return person.isPro && <ProMark proMarkClassName={ProMarkClassNames.PROPERTY}/>;
  }

  return(
    <div className="page">
      <Header />

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
              {setPremiumMark()}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <FavoriteButton isFavorite={isFavorite} isBig />
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
                  {setProMark(host)}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <CommentList reviews={reviews}/>
                <Form />
              </section>
            </div>
          </div>
          <Map city={nearOffers[0].city} offers={nearOffers} mapClassName={MapClassNames.PROPERTY}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((card) =>
                (
                  <Card
                    key={`card-${card.id}`}
                    className={CardClassNames.NearPlaces}
                    offer={card}
                    onMouseOver={() => setActiveCardId(card.id)}
                    onMouseOut={() => setActiveCardId(0)}
                  />
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
