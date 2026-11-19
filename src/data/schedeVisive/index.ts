/**
 * Registry of inline schede visive (Dispensa embeds `{{scheda-visiva:<id>}}`).
 * Add new carte here when Maria’s wording + Waite asset are ready.
 */

import { SCHEDA_VISIVA_IL_MATTO } from './ilMatto';
import type { SchedaVisivaContent } from './types';

export type { SchedaVisivaContent } from './types';
export { SCHEDA_VISIVA_IL_MATTO } from './ilMatto';

/** ENN-115 — Il Bagatto: blocked until Maria re-uploads scheda MD (not Matto paste). */

const BY_ID: Record<string, SchedaVisivaContent> = {
  'il-matto': SCHEDA_VISIVA_IL_MATTO,
};

export function getSchedaVisiva(id: string): SchedaVisivaContent | undefined {
  return BY_ID[id];
}
