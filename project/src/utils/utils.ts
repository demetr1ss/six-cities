import { MAX_RATING } from 'const/const';

export function convertRatingToPercent(rating: number): string {
  return `${Math.ceil((100 * rating / MAX_RATING))}%`;
}
