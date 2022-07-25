import { URL_MARKER_DEFAULT } from 'const/const';
import { useEffect, useRef } from 'react';
import { Icon, Marker } from 'leaflet';
import { City, Offer } from '../../types/offer';
import useMap from 'hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City,
  offers: Offer[],
  // selectedOfferId?: number | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

// const activeCustomIcon = new Icon({
//   iconUrl: URL_MARKER_ACTIVE,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40]
// });


export default function Map({city, offers}: MapProps)
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

  return <section className="cities__map map" ref={mapRef}></section>;
}
