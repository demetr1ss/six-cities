import { TileLayerSetting } from 'const/const';
import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CityType } from 'types/offer-type';

export default function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityType
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const {latitude, longitude, zoom} = city.location;
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom
      });

      const layer = new TileLayer(
        TileLayerSetting.Url,
        {
          attribution: TileLayerSetting.Attribution
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, map, city]);

  return map;
}
