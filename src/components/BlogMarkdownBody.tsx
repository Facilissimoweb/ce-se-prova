import React from 'react';

/**
 * Lightweight Markdown renderer for Blog articles (headings, lists, bold, links).
 * Same safe React-node approach as FormattedDispensaBody / NinaMessageBody — no HTML injection.
 */

type InlinePart =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'link'; href: string; label: string };

/** Absolute http(s)/mailto or same-site paths (optional query/hash). */
const ALLOWED_HREF =
  /^(https?:\/\/|mailto:|\/[a-z0-9][-a-z0-9/]*(?:[?#][^\s]*)?)$/i;

function sanitizeHref(raw: string): string | null {
  const href = raw.trim();
  if (!href || href.startsWith('javascript:') || href.startsWith('data:')) {
    return null;
  }
  if (!ALLOWED_HREF.test(href)) return null;
  return href;
}

function parseInline(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const token = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = token.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ type: 'text', value: text.slice(last, match.index) });
    }
    if (match[2] !== undefined) {
      parts.push({ type: 'bold', value: match[2] });
    } else {
      const href = sanitizeHref(match[4] || '');
      if (href) {
        parts.push({ type: 'link', href, label: match[3] || href });
      } else {
        parts.push({ type: 'text', value: match[0] });
      }
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push({ type: 'text', value: text.slice(last) });
  }
  return parts.length > 0 ? parts : [{ type: 'text', value: text }];
}

function renderInline(text: string, keyPrefix: string): React.ReactNode {
  return parseInline(text).map((part, idx) => {
    const key = `${keyPrefix}-${idx}`;
    if (part.type === 'bold') {
      return (
        <strong key={key} className="font-semibold text-[#F4F1EA]">
          {part.value}
        </strong>
      );
    }
    if (part.type === 'link') {
      const external =
        /^https?:\/\//i.test(part.href) || part.href.startsWith('mailto:');
      return (
        <a
          key={key}
          href={part.href}
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          className="font-semibold text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-2 hover:text-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm"
        >
          {part.label}
        </a>
      );
    }
    return <React.Fragment key={key}>{part.value}</React.Fragment>;
  });
}

export function BlogMarkdownBody({ markdown }: { markdown: string }) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  return (
    <div className="space-y-3 text-sm md:text-[15px] leading-relaxed text-[#E8E1DD]">
      {lines.map((rawLine, idx) => {
        const line = rawLine.trimEnd();
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" aria-hidden="true" />;
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={idx}
              className="font-display text-xl md:text-2xl text-[#D4AF37] pt-4 first:pt-0"
            >
              {trimmed.slice(3)}
            </h2>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={idx}
              className="font-body font-semibold text-base md:text-lg text-[#F4F1EA] pt-3"
            >
              {trimmed.slice(4)}
            </h3>
          );
        }
        if (trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
          const clean = trimmed.startsWith('- ')
            ? trimmed.slice(2)
            : trimmed.replace(/^\d+\.\s/, '');
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]"
                aria-hidden="true"
              />
              <p>{renderInline(clean, `li-${idx}`)}</p>
            </div>
          );
        }
        return <p key={idx}>{renderInline(trimmed, `p-${idx}`)}</p>;
      })}
    </div>
  );
}
