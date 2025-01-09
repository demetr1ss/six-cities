import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { APIRoute } from 'const/const';
import { generatePath } from 'react-router-dom';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from 'services/api';
import { AuthDataType } from 'types/auth-data-type';
import { OfferType } from 'types/offer-type';
import { ReviewType } from 'types/review-type';
import { StateType } from 'types/state-type';
import { UserDataType } from 'types/user-data-type';
import { createRandomOffer, createRandomReview, createRandomReviews } from 'utils/mocks';
import { redirectToRoute } from './action';
import { changeFavoriteStatusAction, checkAuthAction, fetchFavoriteOffersAction, fetchOfferAction, fetchOffersAction, fetchOffersNearbyAction, fetchReviewsAction, loginAction, logoutAction, sendReviewAction } from './api-actions';
import { changeCity } from './app-process/app-process';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      StateType,
      Action,
      ThunkDispatch<StateType, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, {} as UserDataType);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });
  it('should dispatch RequriedAuthorization, RedirectToRoute and changeCity when POST /login', async () => {
    const fakeUser: AuthDataType = {email: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'} as UserDataType);

    const store = mockStore();

    await store.dispatch(checkAuthAction());
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
      loginAction.pending.type,
      redirectToRoute.type,
      changeCity.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch fetchOffersAction when GET /hotels', async () => {
    const mockOffers = [createRandomOffer()];

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchOfferAction and start fetchReviewsAction, fetchOffersNearby when GET /hotels/:id', async () => {
    const mockOffer = createRandomOffer();

    mockAPI
      .onGet(generatePath(APIRoute.Offer, {id: String(mockOffer.id)}))
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(fetchOfferAction(String(mockOffer.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchReviewsAction.pending.type,
      fetchOffersNearbyAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchOffersNearbyAction when GET "/hotels/:id/nearby"', async () => {
    const mockOffer = createRandomOffer();
    const mockOffersNearby = [createRandomOffer()];

    mockAPI
      .onGet(generatePath(APIRoute.OffersNearby, {id: String(mockOffer.id)}))
      .reply(200, mockOffersNearby);

    const store = mockStore();

    await store.dispatch(fetchOffersNearbyAction(String(mockOffer.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersNearbyAction.pending.type,
      fetchOffersNearbyAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /comments/:id', async () => {
    const mockOffer = createRandomOffer();
    const mockReviews = createRandomReviews();

    mockAPI
      .onGet(generatePath(APIRoute.Reviews, {id: String(mockOffer.id)}))
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(String(mockOffer.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });

  it('should dispatch sendReviewAction when POST /comments/:id', async () => {
    const mockReview = createRandomReview();

    mockAPI
      .onPost(generatePath(APIRoute.Reviews, {id: String(mockReview.id)}))
      .reply(200, [] as ReviewType[]);

    const store = mockStore();

    await store.dispatch(sendReviewAction(mockReview));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type,
    ]);
  });

  it('should dispatch Logout and fetchOffers when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      fetchOffersAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('should dispatch fetchFavoriteOffersAction when GET /favorite', async () => {
    const mockOffers = [createRandomOffer()];

    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoriteOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteOffersAction.pending.type,
      fetchFavoriteOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch changeFavoriteStatusAction when POST /favorite/:id/:status', async () => {
    const mockOffer = createRandomOffer();

    mockAPI
      .onPost(generatePath(APIRoute.FavoriteStatus, {
        id: String(mockOffer.id),
        status: String(Number(!mockOffer.isFavorite))
      }))
      .reply(200, {} as OfferType);

    const store = mockStore();

    await store.dispatch(changeFavoriteStatusAction({
      id: mockOffer.id,
      status: Number(!mockOffer.isFavorite),
    }));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFavoriteStatusAction.pending.type,
      changeFavoriteStatusAction.fulfilled.type
    ]);
  });
});
