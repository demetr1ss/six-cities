import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Offer } from 'types/offer';
import { Review } from 'types/review';
import { convertRatingToPercent } from 'utils/utils';
import { CardClassNames, HumanDateOptions, MAX_NEAR_OFFERS } from 'const/const';
import Header from 'components/header/header';
import NotFoundScreen from 'pages/not-found/not-found-screen';
import Form from 'components/form/form';
import Card from 'components/card/card';

type PropertyScreenProps = {
  offers: Offer[];
  reviews: Review[];
  limit?: number;
}

export default function PropertyScreen({offers, reviews, limit}: PropertyScreenProps): JSX.Element {
  const [,setActiveCardId] = useState(0);
  const params = useParams();
  const offer = offers.find((item) => item.id === Number(params.id));

  if (!offer) {
    return (<NotFoundScreen />);
  }

  const {isPremium, host, description, goods, price, maxAdults, bedrooms, rating, title, type, images} = offer;

  function ProMark (): JSX.Element {
    return (
      <span className="property__user-status">
        Pro
      </span>
    );
  }

  function PremiumMark(): JSX.Element {
    return (
      <div className="property__mark">
        <span>Premium</span>
      </div>
    );
  }

  function setProMark (person: {isPro: boolean}) {
    return (
      person.isPro
        ? <ProMark />
        : ''
    );
  }

  function setPremiumMark () {
    return (
      isPremium
        ? <PremiumMark />
        : ''
    );
  }

  return(
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.slice(0, limit).map((img) => (
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
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
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
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
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
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {reviews.map((review) => {
                    const {user, comment, date} = review;
                    const humanDate = new Date(date).toLocaleDateString('en-US', HumanDateOptions);
                    const dateTime = new Date(date).toISOString();
                    return (
                      <li key={`review-${review.id}`} className="reviews__item">
                        <div className="reviews__user user">
                          <div className="reviews__avatar-wrapper user__avatar-wrapper">
                            <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                          </div>
                          <span className="reviews__user-name">
                            {user.name}
                          </span>
                          {setProMark(user)}
                        </div>
                        <div className="reviews__info">
                          <div className="reviews__rating rating">
                            <div className="reviews__stars rating__stars">
                              <span style={{width: convertRatingToPercent(review.rating)}}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <p className="reviews__text">
                            {comment}
                          </p>
                          <time className="reviews__time" dateTime={dateTime}>{humanDate}</time>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <Form />
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {offers.slice(0, MAX_NEAR_OFFERS).map((card) =>
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
