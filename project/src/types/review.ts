type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};
