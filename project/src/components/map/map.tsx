import useMap from 'hooks/use-map';
import { URL_MARKER_ACTIVE, URL_MARKER_DEFAULT } from 'const/const';
import { useEffect, useRef } from 'react';
import { Icon, Marker } from 'leaflet';
import { City, Offer } from '../../types/offer';
import { useAppSelector } from 'hooks';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City,
  offers: Offer[],
  mapClassName: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const activeCustomIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});


export default function Map({city, offers, mapClassName}: MapProps)
: JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const selectedOfferId = useAppSelector((state) => state.activeCardId);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        if (offer.id === selectedOfferId) {
          marker.setIcon(activeCustomIcon);
        } else {
          marker.setIcon(defaultCustomIcon);
        }
        marker.addTo(map);
      });
    }
  }, [map, offers, selectedOfferId]);

  return <section className={`${mapClassName}__map map`} ref={mapRef} />;
}
