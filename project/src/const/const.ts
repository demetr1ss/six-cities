export const MAX_RATING = 5;
export const MAX_REVIEWS = 10;
export const LIMIT_IMAGE = 6;
export const MAX_NEAR_OFFERS = 3;

export const MarkerUrl = {
  Default: 'img/pin.svg',
  Active: 'img/pin-active.svg'
} as const;

export const ReviewLength = {
  Min: 50,
  Max: 300,
} as const;

export const ToastType = {
  Error: 'error',
  Warn: 'warn',
} as const;

export const TileLayerSetting = {
  Url: 'https://tile.jawg.io/29936624-dcc1-4dea-8432-ee1b96c13d66/{z}/{x}/{y}{r}.png?access-token=Bg8KJU3TOwwvS9GXChrWr8ahgMRQXFN4k9UFsLF0acsR07lM9LZKLdkkes4ZDLzd',
  Attribution:`&copy; <a href="https://www.openstreetmap.org/copyright">
OpenStreetMap</a> contributors &copy; <a href="https://www.jawg.io" target=_blank>Jawg</a>`,
};

export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '*',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const enum LoadingStatus {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
}

export const CardClassName = {
  Сities: 'cities__card  place-card',
  Favorites: 'favorites__card place-card',
  NearPlaces: 'near-places__card place-card'
} as const;

type RatingTitlesType = {
  [key: number]: string
}

export const RatingTitle: RatingTitlesType = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect'
} as const;

export const rating = Object.keys(RatingTitle).reverse().map(Number);

export const FavoriteIconSize = {
  BIG: {
    width: 31,
    height: 33
  },
  SMALL: {
    width: 18,
    height: 19
  }
} as const;

export const ImageSize = {
  BIG: {
    width: 260,
    height: 200
  },
  SMALL: {
    width: 150,
    height: 100
  }
} as const;


export const PremiumMarkClassName = {
  PLACE: 'place-card',
  PROPERTY: 'property'
} as const;

export const MapClassName = {
  CITIES: 'cities',
  PROPERTY: 'property'
} as const;

export const City = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'
} as const;

export const cityList = Object.keys(City);

export const SortingOption = {
  Default: 'Popular',
  AscendingPrice: 'Price: low to high',
  DescendingPrice: 'Price: high to low',
  Rating: 'Top rated first'
} as const;

export const APIRoute = {
  Offers: '/hotels',
  Login:  '/login',
  Logout:  '/logout',
  Reviews: '/comments/:id',
  Offer: '/hotels/:id',
  OffersNearby: '/hotels/:id/nearby',
  Favorites: '/favorite',
  FavoriteStatus: '/favorite/:id/:status'
} as const;

export const emailRegExp = new RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu);

export const passwordRegExp = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/);

export const NameSpace = {
  App: 'APP',
  User: 'USER',
  Offers: 'OFFERS',
  Offer: 'OFFER',
  OffersNearby: 'OFFERS_NEARBY',
  FavoriteOffers: 'FAVORITE_OFFERS',
  Reviews: 'REVIEWS',
} as const;
