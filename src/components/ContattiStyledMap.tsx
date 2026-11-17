import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsApi } from '../lib/loadGoogleMaps';
import { SITE_MAP_CENTER, TAROT_ITALIA_MAP_STYLES } from '../lib/mapStyles';
import {
  NEARBY_PARKING,
  SITE_MAPS_OPEN_URL,
  SITE_MAPS_QUERY,
  SITE_PARKING_SEARCH_URL,
  hasGoogleMapsApiKey,
  mapsParkingEmbedSrc,
  mapsPlaceEmbedSrc,
} from '../lib/siteContacts';

type Mode = 'place' | 'parking';

type Props = {
  mode: Mode;
  title: string;
  className?: string;
};

const DIRECTIONALE_COORDS = { lat: 43.2972841, lng: 13.4546689 } as const;

/** Soften legacy iframe when Maps JS key is absent (last-resort, brand-aligned). */
const FALLBACK_IFRAME_FILTER =
  'invert(0.92) hue-rotate(180deg) brightness(0.78) contrast(0.95) saturate(0.55) sepia(0.28)';

export function ContattiStyledMap({ mode, title, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [jsFailed, setJsFailed] = useState(false);
  const usingJs = hasGoogleMapsApiKey() && !jsFailed;

  useEffect(() => {
    if (!usingJs || !containerRef.current) return;

    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY!.trim();
    let cancelled = false;
    const markers: Array<{ setMap: (map: unknown) => void }> = [];

    void (async () => {
      try {
        const maps = await loadGoogleMapsApi(key);
        if (cancelled || !containerRef.current) return;

        const map = new maps.Map(containerRef.current, {
          center: SITE_MAP_CENTER,
          zoom: mode === 'place' ? 16 : 15,
          styles: TAROT_ITALIA_MAP_STYLES,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          backgroundColor: '#151311',
        });

        if (mode === 'place') {
          const marker = new maps.Marker({
            position: SITE_MAP_CENTER,
            map,
            title: SITE_MAPS_QUERY,
            icon: {
              path: maps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: '#d4af37',
              fillOpacity: 1,
              strokeColor: '#12100e',
              strokeWeight: 2,
            },
          });
          markers.push(marker);
          const info = new maps.InfoWindow({
            content: `<div style="font:13px/1.4 system-ui,sans-serif;color:#12100e;padding:2px 4px"><strong>Tarot Italia</strong><br/>${SITE_MAPS_QUERY}</div>`,
          });
          marker.addListener('click', () => info.open(map, marker));
        } else {
          const bounds = new maps.LatLngBounds();
          bounds.extend(SITE_MAP_CENTER);
          bounds.extend(DIRECTIONALE_COORDS);

          const studio = new maps.Marker({
            position: SITE_MAP_CENTER,
            map,
            title: 'Via Crispi 37',
            icon: {
              path: maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#d4af37',
              fillOpacity: 1,
              strokeColor: '#12100e',
              strokeWeight: 2,
            },
          });
          markers.push(studio);

          const direzionale = new maps.Marker({
            position: DIRECTIONALE_COORDS,
            map,
            title: 'Parcheggio Direzionale',
            icon: {
              path: maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#e6c65c',
              fillOpacity: 1,
              strokeColor: '#12100e',
              strokeWeight: 2,
            },
          });
          markers.push(direzionale);

          for (const spot of NEARBY_PARKING) {
            if (!spot.latLng) continue;
            if (
              Math.abs(spot.latLng.lat - DIRECTIONALE_COORDS.lat) < 1e-5 &&
              Math.abs(spot.latLng.lng - DIRECTIONALE_COORDS.lng) < 1e-5
            ) {
              continue;
            }
            bounds.extend(spot.latLng);
            const m = new maps.Marker({
              position: spot.latLng,
              map,
              title: spot.name,
              icon: {
                path: maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: '#a39b93',
                fillOpacity: 0.95,
                strokeColor: '#12100e',
                strokeWeight: 1.5,
              },
            });
            markers.push(m);
          }

          map.fitBounds(bounds);
        }
      } catch {
        if (!cancelled) setJsFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      for (const m of markers) m.setMap(null);
    };
  }, [mode, usingJs]);

  if (usingJs) {
    return (
      <div
        ref={containerRef}
        role="region"
        aria-label={title}
        className={className}
        style={{ backgroundColor: '#151311' }}
      />
    );
  }

  const embedSrc =
    mode === 'place' ? mapsPlaceEmbedSrc() : mapsParkingEmbedSrc();

  const openHref = mode === 'place' ? SITE_MAPS_OPEN_URL : SITE_PARKING_SEARCH_URL;
  const openLabel =
    mode === 'place' ? 'Apri su Google Maps' : 'Cerca parcheggi su Maps';

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      <iframe
        title={title}
        src={embedSrc}
        className="contatti-map-fallback absolute inset-0 h-full w-full border-0"
        style={{ filter: FALLBACK_IFRAME_FILTER }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#D4AF37]/15"
        aria-hidden
      />
      <a
        href={openHref}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 left-3 z-[1] inline-flex items-center rounded-md border border-[#D4AF37]/35 bg-[#12100E]/92 px-2.5 py-1.5 text-[11px] font-medium text-[#D4AF37] shadow-sm backdrop-blur-sm transition-colors hover:border-[#D4AF37] hover:text-[#E6C65C]"
      >
        {openLabel}
      </a>
    </div>
  );
}
