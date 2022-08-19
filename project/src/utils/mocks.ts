import { internet, datatype, address, name, image } from 'faker';
import { OfferType } from 'types/offer-type';
import { UserDataType } from 'types/user-data-tyoe';

export const createRandomUser = (): UserDataType => ({
  email: internet.email(),
} as UserDataType);

export const createRandomOffer = (): OfferType => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(),
    },
    name: address.cityName(),
  },
  description: datatype.string(),
  goods: datatype.array() as string[],
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.number(),
  images: datatype.array() as string[],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: image.abstract(),
  price: datatype.number(),
  rating: datatype.number(),
  title: datatype.string(),
  type: datatype.string(),
});
