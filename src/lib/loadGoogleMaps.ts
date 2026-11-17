type GoogleMapsNs = {
  maps: {
    Map: new (
      el: HTMLElement,
      opts: Record<string, unknown>
    ) => {
      setOptions: (opts: Record<string, unknown>) => void;
      fitBounds: (bounds: unknown) => void;
    };
    Marker: new (opts: Record<string, unknown>) => {
      setMap: (map: unknown) => void;
      addListener: (event: string, handler: () => void) => void;
    };
    InfoWindow: new (opts: Record<string, unknown>) => {
      open: (map: unknown, anchor?: unknown) => void;
    };
    LatLngBounds: new () => {
      extend: (latLng: { lat: number; lng: number }) => void;
    };
    SymbolPath: { CIRCLE: unknown };
  };
};

declare global {
  interface Window {
    google?: GoogleMapsNs;
    __tarotItaliaMapsPromise?: Promise<GoogleMapsNs['maps']>;
  }
}

/**
 * Lazily load Maps JavaScript API (shared promise).
 * Requires Maps JavaScript API enabled on the Google Cloud key.
 */
export function loadGoogleMapsApi(apiKey: string): Promise<GoogleMapsNs['maps']> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps richiede il browser'));
  }
  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }
  if (window.__tarotItaliaMapsPromise) {
    return window.__tarotItaliaMapsPromise;
  }

  window.__tarotItaliaMapsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-tarot-italia-maps="1"]'
    );
    if (existing) {
      existing.addEventListener('load', () => {
        if (window.google?.maps) resolve(window.google.maps);
        else reject(new Error('Google Maps non disponibile dopo lo script'));
      });
      existing.addEventListener('error', () =>
        reject(new Error('Caricamento Google Maps fallito'))
      );
      return;
    }

    const script = document.createElement('script');
    script.dataset.tarotItaliaMaps = '1';
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=it&v=weekly`;
    script.onload = () => {
      if (window.google?.maps) resolve(window.google.maps);
      else reject(new Error('Google Maps non disponibile dopo lo script'));
    };
    script.onerror = () => {
      window.__tarotItaliaMapsPromise = undefined;
      reject(new Error('Caricamento Google Maps fallito'));
    };
    document.head.appendChild(script);
  });

  return window.__tarotItaliaMapsPromise;
}
