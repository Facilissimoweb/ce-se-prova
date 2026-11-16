import React from 'react';
import {
  SITE_EMAIL,
  telegramHref,
  whatsappHref,
} from '../../lib/siteContacts';

/**
 * Safe rendering for Nina chat replies.
 * Never uses dangerouslySetInnerHTML — only React text nodes + allowlisted links.
 * Supports: short paragraphs, **bold**, markdown links, and a final CTA block after ---.
 */

const ALLOWED_HREF =
  /^(https?:\/\/|mailto:|\/prenota|\/consulti|\/contatti|\/dialogo|\/chi-sono|\/corsi)/i;

type InlinePart =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'link'; href: string; label: string };

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
  // Match **bold** or [label](href) — non-greedy, no nested HTML.
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
      const external = /^https?:\/\//i.test(part.href) || part.href.startsWith('mailto:');
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

function isCtaHeading(line: string): boolean {
  const t = line.replace(/\*\*/g, '').trim().toLowerCase();
  return (
    /^(parla con maria teresa|contatti|prossimo passo|ti aspetto|scrivimi)\b/i.test(
      t
    ) || /^parla con\b/.test(t)
  );
}

function looksLikeCtaLine(line: string): boolean {
  const t = line.toLowerCase();
  return (
    /\bprenota\b/.test(t) ||
    /\bwhatsapp\b/.test(t) ||
    /\btelegram\b/.test(t) ||
    /\bemail\b/.test(t) ||
    t.includes(SITE_EMAIL.toLowerCase()) ||
    /\[prenota\]/i.test(line) ||
    /\[whatsapp\]/i.test(line) ||
    /\[telegram\]/i.test(line) ||
    /\[email\]/i.test(line)
  );
}

function splitBodyAndCta(content: string): { body: string; cta: string | null } {
  const normalized = content.replace(/\r\n/g, '\n').trim();
  // Explicit separator preferred
  const sep = normalized.search(/\n---+\n/);
  if (sep >= 0) {
    return {
      body: normalized.slice(0, sep).trim(),
      cta: normalized.slice(sep).replace(/^\n?---+\n?/, '').trim() || null,
    };
  }
  // Fallback: last contiguous block that looks like contact CTAs
  const blocks = normalized.split(/\n{2,}/);
  if (blocks.length < 2) return { body: normalized, cta: null };
  const last = blocks[blocks.length - 1];
  const lastLines = last.split('\n').map((l) => l.trim()).filter(Boolean);
  if (
    lastLines.some(isCtaHeading) ||
    lastLines.filter(looksLikeCtaLine).length >= 2
  ) {
    return {
      body: blocks.slice(0, -1).join('\n\n').trim(),
      cta: last.trim(),
    };
  }
  return { body: normalized, cta: null };
}

function paragraphsFrom(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function ctaLinesFrom(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.replace(/^[-*•]\s+/, '').trim())
    .filter(Boolean);
}

const DEFAULT_CTA_LINKS: Array<{ label: string; href: string }> = [
  { label: 'Prenota', href: '/prenota' },
  {
    label: 'WhatsApp',
    href: whatsappHref(
      'Buongiorno Maria Teresa, ti scrivo dalla chat con Nina.'
    ),
  },
  { label: 'Telegram', href: telegramHref() },
  { label: 'Email', href: `mailto:${SITE_EMAIL}` },
];

function resolveCtaHref(label: string, explicitHref?: string): string | null {
  if (explicitHref) return sanitizeHref(explicitHref);
  const key = label.trim().toLowerCase();
  if (key.startsWith('prenota')) return '/prenota';
  if (key.startsWith('whatsapp')) {
    return whatsappHref(
      'Buongiorno Maria Teresa, ti scrivo dalla chat con Nina.'
    );
  }
  if (key.startsWith('telegram')) return telegramHref();
  if (key.startsWith('email') || key.includes('@')) {
    return `mailto:${SITE_EMAIL}`;
  }
  return null;
}

function parseCtaItems(
  ctaText: string
): { heading: string | null; items: Array<{ label: string; href: string }> } {
  const lines = ctaLinesFrom(ctaText);
  let heading: string | null = null;
  const items: Array<{ label: string; href: string }> = [];

  for (const line of lines) {
    const plain = line.replace(/\*\*/g, '').trim();
    if (!heading && isCtaHeading(plain) && !/^\[/.test(line)) {
      heading = plain;
      continue;
    }

    const md = line.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (md) {
      const href = resolveCtaHref(md[1], md[2]);
      if (href) items.push({ label: md[1].trim(), href });
      continue;
    }

    // "Prenota · WhatsApp · Telegram · email" or "WhatsApp — …"
    const chunks = plain.split(/\s*[·|•—–-]\s*|\s{2,}/).map((c) => c.trim()).filter(Boolean);
    for (const chunk of chunks) {
      const href = resolveCtaHref(chunk);
      if (href) {
        const label =
          chunk.toLowerCase().includes('email') || chunk.includes('@')
            ? 'Email'
            : chunk.replace(/\*\*/g, '').split(/\s+/)[0];
        if (!items.some((i) => i.label.toLowerCase() === label.toLowerCase())) {
          items.push({ label, href });
        }
      }
    }
  }

  if (items.length === 0) {
    return { heading: heading || 'Parla con Maria Teresa', items: DEFAULT_CTA_LINKS };
  }
  return { heading: heading || 'Parla con Maria Teresa', items };
}

export function NinaMessageBody({ content }: { content: string }) {
  const { body, cta } = splitBodyAndCta(content);
  const paras = paragraphsFrom(body);
  const ctaParsed = cta ? parseCtaItems(cta) : null;

  return (
    <div className="space-y-2.5 text-sm leading-relaxed">
      {paras.map((para, idx) => (
        <p key={`p-${idx}`} className="break-words text-[#D6CFC6]">
          {renderInline(para, `p${idx}`)}
        </p>
      ))}

      {ctaParsed && (
        <div
          className="mt-1 rounded-xl border border-[#D4AF37]/25 bg-[#12100E]/65 px-2.5 py-2.5"
          role="group"
          aria-label={ctaParsed.heading || 'Contatti'}
        >
          {ctaParsed.heading && (
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              {ctaParsed.heading}
            </p>
          )}
          <ul className="flex flex-col gap-1.5">
            {ctaParsed.items.map((item) => {
              const external =
                /^https?:\/\//i.test(item.href) || item.href.startsWith('mailto:');
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="flex min-h-9 items-center rounded-lg border border-[#D4AF37]/15 bg-[#151311]/80 px-2.5 text-sm font-semibold text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
