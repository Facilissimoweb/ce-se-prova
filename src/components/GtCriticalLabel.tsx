import React, { useEffect, useState } from 'react';
import {
  type GtCriticalKey,
  resolveGtCriticalLabel,
} from '../lib/gtCriticalUi';
import { normalizeGoogTransLang } from '../lib/gtLangCodes';
import {
  GT_PAGE_LANG,
  GT_REFRESH_EVENT,
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
 * Syncs on Traduci SPA switch (`GT_REFRESH` — replaceState has no hashchange).
 */
export function GtCriticalLabel({ uiKey, className = '', children }: Props) {
  const [lang, setLang] = useState(GT_PAGE_LANG);

  useEffect(() => {
    const sync = () =>
      setLang(normalizeGoogTransLang(readGoogTransLang()));
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener(GT_REFRESH_EVENT, sync);
    const id = window.setInterval(sync, 1500);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener(GT_REFRESH_EVENT, sync);
      window.clearInterval(id);
    };
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
