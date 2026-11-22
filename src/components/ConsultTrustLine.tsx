import React from 'react';
import { useTranslation } from 'react-i18next';

type ConsultTrustLineProps = {
  className?: string;
};

/**
 * ENN-220 — Highly visible trust line above consult book CTAs.
 * Differentiates Teresa’s presence from anonymous call-center readings.
 */
export function ConsultTrustLine({ className = '' }: ConsultTrustLineProps) {
  const { t } = useTranslation('common');

  return (
    <p
      role="note"
      className={`consult-trust-line border-l-2 border-[#D4AF37] pl-3 text-sm md:text-[15px] font-medium leading-snug text-[#F4F1EA] ${className}`.trim()}
    >
      <span className="block">
        {t('consult.trustLineLead')}
      </span>
      <span className="mt-0.5 block text-[#E8DFC8]">
        {t('consult.trustLinePresence')}
      </span>
    </p>
  );
}
