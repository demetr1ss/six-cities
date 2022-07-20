export const MAX_RATING = 5;

export const LIMIT_IMAGE = 6;

export const MAX_NEAR_OFFERS = 3;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


export enum CardClassNames {
  Sities = 'cities__card  place-card',
  Favorites = 'favorites__card place-card',
  NearPlaces = 'near-places__card place-card'
}

export enum ImageWidth {
  Default = 260,
  Favorites = 150
}

export enum ImageHeight {
  Default = 200,
  Favorites = 110
}

export enum HumanDateOptions {
  year = 'numeric',
  month = 'long'
}
