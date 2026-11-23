import type {
  FirebaseAuthContract,
  WhatsAppWebhookContract,
} from '../types/handoff';

/**
 * DEV-only architecture notes for HandoffDrawer.
 * Imported solely by that drawer so production bundles can drop the module.
 */
export const handoffArchitectureSpec: {
  auth: FirebaseAuthContract;
  whatsapp: WhatsAppWebhookContract;
  runtimeEnvVars: string[];
} = {
  auth: {
    provider: 'firebase_auth',
    strategy: 'google_sign_in_id_token',
    tables: [
      'users',
      'courses',
      'dispense',
      'course_purchases',
      'dispensa_progress',
      'bookings',
      'dialogue_sessions',
      'dialogue_purchases',
    ],
    accessPolicyNote:
      'Le API riservate verificano il Firebase ID token con Admin SDK (requireAuth / optionalAuth). I dati applicativi vivono su Postgres tramite Drizzle; non c’è Supabase RLS.',
  },
  whatsapp: {
    provider: 'whatsapp_cloud_api',
    direction: 'outbound_bridge_and_inbound_webhook',
    webhookEndpoint: '/api/webhooks/whatsapp',
    deepLinkTemplate:
      'https://wa.me/393791038253?text=Buongiorno%20Maria%20Teresa%2C%20vorrei%20informazioni%20per%20un%20consulto%20Tarot%20Italia.',
  },
  runtimeEnvVars: [
    'APP_URL',
    'SQL_HOST',
    'SQL_DB_NAME',
    'SQL_USER',
    'SQL_PASSWORD',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'ALLOW_DIRECT_UNLOCK',
    'STRIPE_PRICE_ID_DIALOGO_5M',
    'STRIPE_PRICE_ID_DIALOGO_10M',
    'STRIPE_PRICE_ID_DIALOGO_15M',
    'STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI',
    'STRIPE_PRICE_ID_CORSO_ARCANI_MINORI',
    'STRIPE_PRICE_ID_CORSO_METODI_STESURA',
    'STRIPE_PRICE_ID_CONSULTO_20M',
    'STRIPE_PRICE_ID_CONSULTO_45M',
    'STRIPE_PRICE_ID_CONSULTO_60M',
    'STRIPE_PRICE_ID_CONSULTO_90M',
    'WHATSAPP_VERIFY_TOKEN',
    'WHATSAPP_ACCESS_TOKEN',
  ],
};
