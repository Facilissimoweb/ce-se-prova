import React from 'react';
import type { CopyEntry } from '../types/handoff';

interface CopyTextProps {
  entry: CopyEntry | { cmsKey: string; liveText: string };
  showKeys: boolean;
  className?: string;
}

/**
 * Renders live editorial prose by default, or the exact [COPY: ...] CMS key
 * when the developer/operator toggles CMS Key Inspection mode.
 */
export function CopyText({ entry, showKeys, className = '' }: CopyTextProps) {
  if (showKeys) {
    return (
      <span
        className={`font-mono text-[0.88em] text-[#E6C65C] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded border border-[#D4AF37]/30 ${className}`}
        title={entry.liveText}
      >
        {entry.cmsKey}
      </span>
    );
  }

  return <span className={className}>{entry.liveText}</span>;
}
