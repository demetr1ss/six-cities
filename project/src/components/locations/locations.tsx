import { Cities } from 'const/const';
import { useAppDispatch } from 'hooks';
import { changeCity } from 'store/action';
import cn from 'classnames';

type LocationsType = {
  activeCity: string;
}

export default function Locations({activeCity}: LocationsType): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.keys(Cities).map((city) => {
            const postCls = cn('locations__item-link tabs__item', {
              'tabs__item--active': activeCity === city
            });
            return (
              <li key={city} className="locations__item">
                <a
                  className={postCls}
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(changeCity(city));
                  }}
                  href='/'
                >
                  <span>{city}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
