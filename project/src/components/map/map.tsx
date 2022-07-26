import { URL_MARKER_DEFAULT } from 'const/const';
import { useEffect, useRef } from 'react';
import { Icon, Marker } from 'leaflet';
import { City, Offer } from '../../types/offer';
import useMap from 'hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City,
  offers: Offer[],
  mapClassName: string;
  // selectedOfferId?: number | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

// const activeCustomIcon = new Icon({
//   iconUrl: URL_MARKER_ACTIVE,
//   iconSize: [27, 39],
//   iconAnchor: [27, 39]
// });


export default function Map({city, offers, mapClassName}: MapProps)
: JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(defaultCustomIcon)
          .addTo(map);
      });
    }
  }, [map, offers]);

  return <section className={`${mapClassName}__map map`} ref={mapRef} />;
}
