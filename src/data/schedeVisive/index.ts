/**
 * Registry of inline schede visive (Dispensa embeds `{{scheda-visiva:<id>}}`).
 */

import { SCHEDA_VISIVA_IL_BAGATTO } from './ilBagatto';
import { SCHEDA_VISIVA_IL_MATTO } from './ilMatto';
import type { SchedaVisivaContent } from './types';

export type { SchedaVisivaContent } from './types';
export { SCHEDA_VISIVA_IL_MATTO } from './ilMatto';
export { SCHEDA_VISIVA_IL_BAGATTO } from './ilBagatto';

const BY_ID: Record<string, SchedaVisivaContent> = {
  'il-matto': SCHEDA_VISIVA_IL_MATTO,
  'il-bagatto': SCHEDA_VISIVA_IL_BAGATTO,
};

export function getSchedaVisiva(id: string): SchedaVisivaContent | undefined {
  return BY_ID[id];
}
