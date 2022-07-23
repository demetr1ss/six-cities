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

export enum HumanDateOptions {
  year = 'numeric',
  month = 'long'
}

export const rating: readonly [number, number, number, number, number] = [5, 4, 3, 2, 1];

type RatingTitlesType = {
  [key: number]: string
}

export const RatingTitles: RatingTitlesType = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect'
} as const;


export const FavoriteIconSizes = {
  big: {
    width: 31,
    height: 33
  },
  small: {
    width: 18,
    height: 19
  }
} as const;

export const ImageSize = {
  big: {
    width: 260,
    height: 200
  },
  small: {
    width: 150,
    height: 100
  }
} as const;
