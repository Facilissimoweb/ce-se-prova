/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  readonly VITE_TELEGRAM_URL?: string;
  /** Public site origin for canonical / OG / sitemap. Production: https://tarotitalia.com */
  readonly VITE_SITE_ORIGIN?: string;
  readonly VITE_WHATSAPP_ASSIST_URL?: string;
  /**
   * ENN-239 — Maggiori Stripe checkout. Default off (in aggiornamento).
   * Set `true` + server `MAGGIORI_PURCHASE_ENABLED=true` → Redeploy to re-enable.
   */
  readonly VITE_MAGGIORI_PURCHASE_ENABLED?: string;
  /**
   * ENN-247 — Firebase Auth custom domain (e.g. auth.tarotitalia.com).
   * Set only after Hosting DNS Connected + OAuth redirect URI; else leave unset.
   */
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
