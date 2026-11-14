import React from 'react';
import type { ScreenId } from '../types/handoff';
import { legalContent } from '../data/legalContent';
import { VenditaBody } from '../components/LegalNotice';
import { LegalPageShell } from './LegalPageShell';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

/** Pagina pubblica `/termini-di-servizio` — Condizioni di vendita (requisito OAuth). */
export function TerminiScreen({ onNavigate }: Props) {
  const { vendita } = legalContent;
  return (
    <LegalPageShell
      title={vendita.titolo}
      documentTitle={`${vendita.titolo} — Tarot Italia`}
      intestazione={vendita.intestazione}
      onNavigate={onNavigate}
    >
      <VenditaBody className="mt-2" alwaysOpen />
    </LegalPageShell>
  );
}
