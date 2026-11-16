import React, { useMemo } from 'react';
import { pathForScreen } from '../lib/appPaths';
import { getSiteOrigin, pageTitleForScreen } from '../lib/seo';
import type { ScreenId } from '../types/handoff';

type Props = {
  activeScreen: ScreenId;
  className?: string;
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
      />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"
      />
    </svg>
  );
}

export function SocialShareButtons({ activeScreen, className = '' }: Props) {
  const share = useMemo(() => {
    const path =
      activeScreen === 'not-found'
        ? typeof window !== 'undefined'
          ? window.location.pathname
          : '/404'
        : pathForScreen(activeScreen);
    const origin = getSiteOrigin();
    const url = origin ? `${origin}${path}` : path;
    const title = pageTitleForScreen(activeScreen);
    const text = `${title} — ${url}`;

    return {
      url,
      title,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
    };
  }, [activeScreen]);

  const linkClass =
    'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/25 bg-[#151311]/70 text-[#A39B93] transition-colors hover:border-[#D4AF37]/55 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]';

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
        Condividi
      </p>
      <div
        className="flex items-center gap-2"
        role="group"
        aria-label="Condividi questa pagina"
      >
        <a
          href={share.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label="Condividi su WhatsApp"
          title="WhatsApp"
        >
          <WhatsAppIcon className="h-4 w-4" />
        </a>
        <a
          href={share.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label="Condividi su Facebook"
          title="Facebook"
        >
          <FacebookIcon className="h-4 w-4" />
        </a>
        <a
          href={share.pinterest}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label="Condividi su Pinterest"
          title="Pinterest"
        >
          <PinterestIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
