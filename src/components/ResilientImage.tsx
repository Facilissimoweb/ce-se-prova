import React, { useState } from 'react';
import { TarotEmblemLogo } from './TarotEmblem';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  fallbackNode?: React.ReactNode;
}

/**
 * Zero-Broken-Image wrapper: always sets referrerPolicy="no-referrer" and
 * gracefully renders a Dark Glass + Gold Emblem fallback if asset loading fails.
 */
export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
  fallbackNode,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    if (fallbackNode) {
      return <>{fallbackNode}</>;
    }
    return (
      <div
        role="img"
        aria-label={alt}
        className={`w-full h-full min-h-[160px] flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-br from-[#1D1B19] via-[#151311] to-[#12100E] border border-[#D4AF37]/20 ${className}`}
      >
        <TarotEmblemLogo size={42} />
        {fallbackLabel && (
          <span className="font-display text-xs tracking-[0.08em] text-[#D4AF37] text-center">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
