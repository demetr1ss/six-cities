import { Review } from 'types/review';

export const reviews: Review[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Sun Jul 17 2022 11:47:22 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1,
      isPro: false,
      name: 'Max Conner'
    }
  },
  {
    comment: 'test test test',
    date: 'Sun Jun 16 2022 10:47:22 GMT+0300 (Москва, стандартное время)',
    id: 2,
    rating: 3,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 2,
      isPro: false,
      name: 'Kate Smith'
    }
  },
  {
    comment: 'test test',
    date: 'Sun May 15 2022 09:47:22 GMT+0300 (Москва, стандартное время)',
    id: 3,
    rating: 5,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 3,
      isPro: true,
      name: 'Max Smith'
    }
  },
];
