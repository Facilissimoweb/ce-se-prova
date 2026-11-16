/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  readonly VITE_TELEGRAM_URL?: string;
  /** Public site origin for canonical / OG / sitemap. Cutover: https://www.tarotitalia.com */
  readonly VITE_SITE_ORIGIN?: string;
  readonly VITE_WHATSAPP_ASSIST_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
