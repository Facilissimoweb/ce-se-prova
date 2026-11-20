import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScreenId } from '../types/handoff';
import { blogSlugFromPath, PATH_CHANGE_EVENT } from '../lib/appPaths';
import { applyDocumentSeo } from '../lib/seo';

type Props = {
  activeScreen: ScreenId;
};

/** Route-aware document title / meta / JSON-LD for the SPA. */
export function DocumentSeo({ activeScreen }: Props) {
  const { i18n } = useTranslation();
  const [blogSlug, setBlogSlug] = useState<string | null>(() =>
    typeof window !== 'undefined'
      ? blogSlugFromPath(window.location.pathname)
      : null
  );

  useEffect(() => {
    const sync = () => {
      setBlogSlug(blogSlugFromPath(window.location.pathname));
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener(PATH_CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(PATH_CHANGE_EVENT, sync);
    };
  }, [activeScreen]);

  useEffect(() => {
    applyDocumentSeo(activeScreen);
  }, [activeScreen, blogSlug, i18n.language]);

  return null;
}
