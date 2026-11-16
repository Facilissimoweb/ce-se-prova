import { useEffect } from 'react';
import type { ScreenId } from '../types/handoff';
import { applyDocumentSeo } from '../lib/seo';

type Props = {
  activeScreen: ScreenId;
};

/** Route-aware document title / meta / JSON-LD for the SPA. */
export function DocumentSeo({ activeScreen }: Props) {
  useEffect(() => {
    applyDocumentSeo(activeScreen);
  }, [activeScreen]);

  return null;
}
