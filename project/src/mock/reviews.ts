import { Reviews } from 'types/reviews';

export const reviews: Reviews[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Sun Jul 17 2022 11:47:22 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/1.png',
      id: 1,
      isPro: false,
      name: 'Oliver.conner'
    }
  },
  {
    comment: 'test test test',
    date: 'Sun Jul 16 2022 10:47:22 GMT+0300 (Москва, стандартное время)',
    id: 2,
    rating: 3,
    user: {
      avatarUrl: 'img/2.png',
      id: 2,
      isPro: false,
      name: 'Qwerty'
    }
  },
  {
    comment: 'test test',
    date: 'Sun Jul 15 2022 09:47:22 GMT+0300 (Москва, стандартное время)',
    id: 3,
    rating: 5,
    user: {
      avatarUrl: 'img/3.png',
      id: 3,
      isPro: true,
      name: 'Asdfgh'
    }
  },
];
