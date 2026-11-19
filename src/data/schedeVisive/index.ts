/**
 * Registry of inline schede visive (Dispensa embeds `{{scheda-visiva:<id>}}`).
 */

import { SCHEDA_VISIVA_IL_BAGATTO } from './ilBagatto';
import { SCHEDA_VISIVA_IL_MATTO } from './ilMatto';
import { SCHEDA_VISIVA_IL_PAPA } from './ilPapa';
import { SCHEDA_VISIVA_L_IMPERATORE } from './lImperatore';
import { SCHEDA_VISIVA_L_IMPERATRICE } from './lImperatrice';
import { SCHEDA_VISIVA_LA_PAPESSA } from './laPapessa';
import type { SchedaVisivaContent } from './types';

export type { SchedaVisivaContent } from './types';
export { SCHEDA_VISIVA_IL_MATTO } from './ilMatto';
export { SCHEDA_VISIVA_IL_BAGATTO } from './ilBagatto';
export { SCHEDA_VISIVA_LA_PAPESSA } from './laPapessa';
export { SCHEDA_VISIVA_L_IMPERATRICE } from './lImperatrice';
export { SCHEDA_VISIVA_L_IMPERATORE } from './lImperatore';
export { SCHEDA_VISIVA_IL_PAPA } from './ilPapa';

const BY_ID: Record<string, SchedaVisivaContent> = {
  'il-matto': SCHEDA_VISIVA_IL_MATTO,
  'il-bagatto': SCHEDA_VISIVA_IL_BAGATTO,
  'la-papessa': SCHEDA_VISIVA_LA_PAPESSA,
  'l-imperatrice': SCHEDA_VISIVA_L_IMPERATRICE,
  'l-imperatore': SCHEDA_VISIVA_L_IMPERATORE,
  'il-papa': SCHEDA_VISIVA_IL_PAPA,
};

export function getSchedaVisiva(id: string): SchedaVisivaContent | undefined {
  return BY_ID[id];
}
