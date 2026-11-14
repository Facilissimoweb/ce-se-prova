import React from 'react';
import type { ScreenId } from '../types/handoff';
import { legalContent } from '../data/legalContent';
import { PrivacyBody } from '../components/LegalNotice';
import { LegalPageShell } from './LegalPageShell';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

/** Pagina pubblica `/privacy` — stessa informativa di v2tarotitalia (OAuth Google). */
export function PrivacyScreen({ onNavigate }: Props) {
  const { privacy } = legalContent;
  return (
    <LegalPageShell
      title={privacy.titolo}
      documentTitle={`${privacy.titolo} — Tarot Italia`}
      intestazione={privacy.intestazione}
      onNavigate={onNavigate}
    >
      <PrivacyBody className="mt-2" />
      <p className="mt-10 text-sm text-[#A39B93]">
        Versione statica HTML (senza JavaScript) per Google Cloud Console:{' '}
        <a
          href="/privacy.html"
          className="underline decoration-[#D4AF37]/50 underline-offset-4 hover:text-[#E6C65C]"
        >
          /privacy.html
        </a>
      </p>
    </LegalPageShell>
  );
}
