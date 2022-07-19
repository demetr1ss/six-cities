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

export const MAX_RATING = 5;

export enum CardClassNames {
  Sities = 'cities__card  place-card',
  Favorites = 'favorites__card place-card'
}

export enum ImageWidth {
  Sities = 260,
  Favorites = 150
}

export enum ImageHeight {
  Sities = 200,
  Favorites = 110
}
