import { appProcess, changeCity, changeSort } from './app-process';
import { City, SortingOption } from 'const/const';

describe('Reducer: appProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        city: City.Paris,
        sortType: SortingOption.Default,
      });
  });

  it('should update the city and reset sortType to default value when the city is changed', () => {
    const state = {
      city: City.Paris,
      sortType: SortingOption.Rating,
    };
    expect(appProcess.reducer(state, changeCity(City.Amsterdam)))
      .toEqual({
        city: City.Amsterdam,
        sortType: SortingOption.Default,
      });
  });

  it('should update sortType to the given value', () => {
    const state = {
      city: City.Paris,
      sortType: SortingOption.Default,
    };
    expect(appProcess.reducer(state, changeSort(SortingOption.DescendingPrice)))
      .toEqual({
        city: City.Paris,
        sortType: SortingOption.DescendingPrice,
      });
  });
});
