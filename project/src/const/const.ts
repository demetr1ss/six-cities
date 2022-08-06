export const MAX_RATING = 5;
export const LIMIT_IMAGE = 6;
export const MAX_NEAR_OFFERS = 3;
export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_ACTIVE = 'img/pin-active.svg';

export const TileLayerSettings = {
  Url: 'https://tile.jawg.io/29936624-dcc1-4dea-8432-ee1b96c13d66/{z}/{x}/{y}{r}.png?access-token=Bg8KJU3TOwwvS9GXChrWr8ahgMRQXFN4k9UFsLF0acsR07lM9LZKLdkkes4ZDLzd',
  Attribution:`&copy; <a href="https://www.openstreetmap.org/copyright">
OpenStreetMap</a> contributors &copy; <a href="https://www.jawg.io" target=_blank>Jawg</a>`,
  accessToken: 'Bg8KJU3TOwwvS9GXChrWr8ahgMRQXFN4k9UFsLF0acsR07lM9LZKLdkkes4ZDLzd'
} as const;

export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CardClassNames = {
  Sities: 'cities__card  place-card',
  Favorites: 'favorites__card place-card',
  NearPlaces: 'near-places__card place-card'
} as const;

export const HumanDateOptions = {
  year: 'numeric',
  month: 'long'
} as const;

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


export const PremiumMarkClassNames = {
  PLACE: 'place-card',
  PROPERTY: 'property'
} as const;

export const ProMarkClassNames = {
  REVIEW: 'reviews',
  PROPERTY: 'property'
} as const;

export const MapClassNames = {
  CITIES: 'cities',
  PROPERTY: 'property'
} as const;

export const Cities = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'
} as const;

export const cityList = Object.keys(Cities);

export const SortingOptions = {
  Default: 'Popular',
  AscendingPrice: 'Price: low to high',
  DescendingPrice: 'Price: high to low',
  Rating: 'Top rated first'
} as const;

export const APIRoute = {
  Offers: '/hotels',
  Login: '/login',
  Logout: '/logout',

  fetchReviews(offerId: number) {
    return (`/comments/${offerId}`);
  },

  fetchById(offerId: number) {
    return (`${this.Offers}/${offerId}`);
  },

  fetchOffersNearby(offerId: number) {
    return (`${this.Offers}/${offerId}/nearby`);
  },
} as const;

export const formFiedls = {
  email: 'E-mail',
  password: 'password'
} as const;

export const emailRegExp = new RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu);

export const passwordRegExp = new RegExp(/^(?=.*[a-z])(?=.*[0-9]).+$/);
