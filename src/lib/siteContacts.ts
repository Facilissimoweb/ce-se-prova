/** Contatti pubblici Tarot Italia (allineati a v2 / Maria). */
export const SITE_EMAIL = 'info@tarotitalia.com';
export const SITE_PHONE_DISPLAY = '379 103 82 53';
export const SITE_PHONE_E164 = '393791038253';
export const SITE_PHONE_TEL = '+393791038253';
export const SITE_ADDRESS = 'Via Crispi 37, 62100 Macerata';
export const SITE_WHATSAPP_HREF = `https://wa.me/${SITE_PHONE_E164}`;

export function whatsappHref(prefill: string): string {
  return `${SITE_WHATSAPP_HREF}?text=${encodeURIComponent(prefill)}`;
}
