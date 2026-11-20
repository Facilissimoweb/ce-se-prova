import React, { useEffect, useState } from 'react';
import {
  type GtCriticalKey,
  resolveGtCriticalLabel,
} from '../lib/gtCriticalUi';
import { normalizeGoogTransLang } from '../lib/gtLangCodes';
import {
  GT_PAGE_LANG,
  readGoogTransLang,
} from '../lib/googleTranslateRuntime';

type Props = {
  uiKey: GtCriticalKey;
  className?: string;
  /** Optional trailing node (e.g. arrow icon) outside the translated span. */
  children?: React.ReactNode;
};

/**
 * Critical CTA text: contextual Italian when browsing IT / non-curated GT;
 * curated `notranslate` label for zh-CN / ja / ar / hi (ENN-159).
 */
export function GtCriticalLabel({ uiKey, className = '', children }: Props) {
  const [lang, setLang] = useState(GT_PAGE_LANG);

  useEffect(() => {
    setLang(normalizeGoogTransLang(readGoogTransLang()));
  }, []);

  const { text, useCurated } = resolveGtCriticalLabel(lang, uiKey);

  if (useCurated) {
    return (
      <span className={className}>
        <span className="notranslate" translate="no">
          {text}
        </span>
        {children}
      </span>
    );
  }

  return (
    <span className={className}>
      {text}
      {children}
    </span>
  );
}
