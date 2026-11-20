/**
 * Open Nina FAB from outside (e.g. Area Riservata → Nina Studio).
 * ChatFab listens for this CustomEvent on window.
 */

export type NinaChatOpenDetail = {
  mode?: 'welcome' | 'studio';
};

export const NINA_CHAT_OPEN_EVENT = 'tarot-italia:open-nina';

export function openNinaChat(detail: NinaChatOpenDetail = {}): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<NinaChatOpenDetail>(NINA_CHAT_OPEN_EVENT, { detail })
  );
}
