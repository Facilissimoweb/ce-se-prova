/**
 * ENN-159 — Critical short CTAs that Google Translate often mistranslates
 * (e.g. «Prenota» → Chinese «书» = tome, not “book a session”).
 *
 * Policy:
 * 1. Italian DOM source uses contextual phrases (not bare «Prenota»).
 * 2. When googtrans is a curated target, render `notranslate` + explicit label.
 * 3. Other GT langs keep the longer Italian source so the gadget has context.
 * Never blanket-notranslate Nina chrome — only these CTA keys.
 */

import { normalizeGoogTransLang } from './gtLangCodes';
import { GT_PAGE_LANG } from './googleTranslateRuntime';

export type GtCriticalKey =
  | 'bookConsult'
  | 'bookSession'
  | 'welcomeMode'
  | 'bookNow'
  | 'sendBooking'
  | 'whatsappContact';

/** Contextual Italian source (preferred over bare «Prenota» / «Book»). */
export const GT_CRITICAL_IT: Record<GtCriticalKey, string> = {
  bookConsult: 'Prenota consulto',
  bookSession: 'Prenota una sessione',
  welcomeMode: 'Accoglienza',
  bookNow: 'Prenota un consulto',
  sendBooking: 'Invia prenotazione',
  whatsappContact: 'Contatto WhatsApp',
};

/**
 * Tiny curated map — only GT-critical buttons, only langs where short CTAs
 * are known to break (zh-CN / ja / ar / hi). Expand sparingly.
 */
export const GT_CRITICAL_OVERRIDES: Record<
  string,
  Partial<Record<GtCriticalKey, string>>
> = {
  'zh-CN': {
    bookConsult: '预订咨询',
    bookSession: '预订一次咨询',
    welcomeMode: '网站接待',
    bookNow: '立即预订咨询',
    sendBooking: '发送预约请求',
    whatsappContact: 'WhatsApp 联系',
  },
  ja: {
    bookConsult: '鑑定を予約',
    bookSession: 'セッションを予約',
    welcomeMode: 'サイト案内',
    bookNow: '今すぐ予約',
    sendBooking: '予約を送信',
    whatsappContact: 'WhatsAppで連絡',
  },
  ar: {
    bookConsult: 'احجزي استشارة',
    bookSession: 'احجزي جلسة',
    welcomeMode: 'استقبال الموقع',
    bookNow: 'احجزي استشارة الآن',
    sendBooking: 'أرسلي طلب الحجز',
    whatsappContact: 'تواصل عبر واتساب',
  },
  hi: {
    bookConsult: 'परामर्श बुक करें',
    bookSession: 'सत्र बुक करें',
    welcomeMode: 'साइट स्वागत',
    bookNow: 'अभी परामर्श बुक करें',
    sendBooking: 'बुकिंग भेजें',
    whatsappContact: 'WhatsApp संपर्क',
  },
};

export type GtCriticalResolved = {
  text: string;
  /** When true, wrap with notranslate so GT cannot overwrite the curated label. */
  useCurated: boolean;
};

export function resolveGtCriticalLabel(
  lang: string | null | undefined,
  key: GtCriticalKey
): GtCriticalResolved {
  const code = normalizeGoogTransLang(lang);
  const italian = GT_CRITICAL_IT[key];
  if (code === GT_PAGE_LANG) {
    return { text: italian, useCurated: false };
  }
  const curated = GT_CRITICAL_OVERRIDES[code]?.[key];
  if (curated) {
    return { text: curated, useCurated: true };
  }
  // Non-curated GT lang: longer Italian source for better machine translation.
  return { text: italian, useCurated: false };
}
