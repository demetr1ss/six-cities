import { MarkerUrl } from 'const/const';
import useMap from 'hooks/use-map';
import { Icon, LayerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { CityType, OfferType } from '../../types/offer-type';

type MapPropsType = {
  city: CityType,
  offers: OfferType[],
  mapClassName: string;
  selectedOfferId: number;
}

const defaultCustomIcon = new Icon({
  iconUrl: MarkerUrl.Default,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const activeCustomIcon = new Icon({
  iconUrl: MarkerUrl.Active,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});


export default function Map({city, offers, mapClassName, selectedOfferId}: MapPropsType)
: JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const layerGroupe = new LayerGroup();

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(offer.id === selectedOfferId ? activeCustomIcon : defaultCustomIcon)
          .addTo(layerGroupe);
      });

      layerGroupe.addTo(map);

      return () => {
        layerGroupe.clearLayers();
      };
    }
  }, [map, offers, selectedOfferId]);

  useEffect(() => {
    const {latitude, longitude, zoom} = city.location;
    map?.setView(
      {
        lat: latitude,
        lng: longitude,
      },
      zoom
    );
  }, [city.location, map]);


  return <section className={`${mapClassName}__map map`} ref={mapRef} />;
}
