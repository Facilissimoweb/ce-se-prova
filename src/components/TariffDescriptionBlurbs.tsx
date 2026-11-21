import { CopyText } from './CopyText';

interface TariffDescriptionBlurbsProps {
  paragraphs: string[];
  /** Flat join for CMS-key inspection tooltip / fallback. */
  flatDescription: string;
  cmsKeyDesc: string;
  showCmsKeys?: boolean;
  /** Tighter spacing for compact pickers (e.g. Prenota step 1). */
  compact?: boolean;
}

/**
 * Renders consult package lead copy as spaced paragraphs (ENN-195).
 * Checklist items stay outside this component.
 */
export function TariffDescriptionBlurbs({
  paragraphs,
  flatDescription,
  cmsKeyDesc,
  showCmsKeys = false,
  compact = false,
}: TariffDescriptionBlurbsProps) {
  if (showCmsKeys) {
    return (
      <p
        className={
          compact
            ? 'text-xs md:text-sm leading-relaxed text-[#A39B93]'
            : 'text-sm leading-relaxed text-[#A39B93]'
        }
      >
        <CopyText
          entry={{ cmsKey: cmsKeyDesc, liveText: flatDescription }}
          showKeys={true}
        />
      </p>
    );
  }

  const blocks = paragraphs.filter((p) => p.trim().length > 0);
  if (blocks.length === 0) return null;

  return (
    <div
      className={
        compact
          ? 'space-y-1.5 text-xs md:text-sm leading-relaxed text-[#A39B93]'
          : 'space-y-2 text-sm leading-relaxed text-[#A39B93]'
      }
    >
      {blocks.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}
