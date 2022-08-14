import cn from 'classnames';
import { SortingOptions } from 'const/const';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { changeSort } from 'store/app-process/app-process';
import { getSortType } from 'store/app-process/selectors';

export default function Sorting(): JSX.Element {
  const [isOpen, setOpenStatus] = useState(false);

  const placesOptionsClassName = cn('places__options places__options--custom', {
    'places__options--opened': isOpen,
    'places__options': !isOpen
  });

  const handleToggleFormClick = () => {
    setOpenStatus(!isOpen);
  };

  const dispatch = useAppDispatch();
  const currentSortType = useAppSelector(getSortType);

  return (
    <ClickAwayListener onClickAway={() => setOpenStatus(false)}>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span className="places__sorting-type" tabIndex={0} onClick={handleToggleFormClick}>
          {currentSortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={placesOptionsClassName}>
          {Object.values(SortingOptions).map((option) => {
            const placesOptionClassName = cn('places__option', {
              'places__option--active': option === currentSortType
            });

            return (
              <li
                key={option}
                className={placesOptionClassName}
                tabIndex={0}
                onClick={() => {
                  dispatch(changeSort(option));
                  setOpenStatus(false);
                }}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </form>
    </ClickAwayListener>
  );
}
