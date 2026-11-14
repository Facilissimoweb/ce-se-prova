import React from 'react';
import type { ScreenId } from '../types/handoff';
import { legalContent } from '../data/legalContent';
import { DisclaimerBody } from '../components/LegalNotice';
import { LegalPageShell } from './LegalPageShell';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

/** Pagina pubblica `/disclaimer` — informativa legale / deontologia. */
export function DisclaimerScreen({ onNavigate }: Props) {
  const { disclaimer } = legalContent;
  return (
    <LegalPageShell
      title={disclaimer.sezione}
      documentTitle={`${disclaimer.titolo} — Tarot Italia`}
      intestazione={disclaimer.intestazione}
      onNavigate={onNavigate}
    >
      <DisclaimerBody className="mt-2" />
    </LegalPageShell>
  );
}
