
import { Cities } from 'const/const';
import { MouseEvent } from 'react';

type LocationsType = {
  activeCity: string;
  onClick: (evt: MouseEvent<HTMLAnchorElement>) => void;
}

export default function Locations({activeCity, onClick}: LocationsType): JSX.Element {
  const addActiveClassName = (city: string) => activeCity === city && 'tabs__item--active';

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.keys(Cities).map((city) =>
            (
              <li key={city} className="locations__item">
                <a
                  className={`locations__item-link tabs__item ${addActiveClassName(city)}`}
                  onClick={onClick}
                  href='#/'
                >
                  <span>{city}</span>
                </a>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
