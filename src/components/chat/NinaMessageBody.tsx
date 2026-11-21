import React from 'react';
import { parseNinaMessageBlocks } from '../../lib/ninaMessageBlocks';
import { SITE_EMAIL } from '../../lib/siteContacts';

/**
 * Safe rendering for Nina chat replies.
 * Never uses dangerouslySetInnerHTML — only React text nodes + allowlisted links.
 * Supports: short paragraphs, **bold**, markdown links, `- ` / `* ` / numbered lists.
 * ENN-188: lists render as real bullets (not a dense hyphen paragraph).
 * Trailing contact CTA blocks (--- / Prenota·WhatsApp·Telegram·email) are stripped:
 * those actions live only in the ChatFab «Parla con Maria Teresa» panel.
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

/** Drop trailing contact CTA blocks so buttons are not duplicated in-thread. */
function stripTrailingCtaBlock(content: string): string {
  const normalized = content.replace(/\r\n/g, '\n').trim();
  const sep = normalized.search(/\n---+\n/);
  if (sep >= 0) {
    return normalized.slice(0, sep).trim();
  }
  const blocks = normalized.split(/\n{2,}/);
  if (blocks.length < 2) return normalized;
  const last = blocks[blocks.length - 1];
  const lastLines = last
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (
    lastLines.some(isCtaHeading) ||
    lastLines.filter(looksLikeCtaLine).length >= 2
  ) {
    return blocks.slice(0, -1).join('\n\n').trim();
  }
  return normalized;
}

export function NinaMessageBody({ content }: { content: string }) {
  const body = stripTrailingCtaBlock(content);
  const blocks = parseNinaMessageBlocks(body);

  return (
    <div className="space-y-2.5 text-sm leading-relaxed">
      {blocks.map((block, idx) => {
        if (block.type === 'list') {
          const ListTag = block.ordered ? 'ol' : 'ul';
          return (
            <ListTag
              key={`list-${idx}`}
              className={
                block.ordered
                  ? 'list-decimal space-y-1.5 pl-5 text-[#D6CFC6]'
                  : 'list-disc space-y-1.5 pl-5 text-[#D6CFC6]'
              }
            >
              {block.items.map((item, itemIdx) => (
                <li key={`li-${idx}-${itemIdx}`} className="break-words pl-0.5">
                  {renderInline(item, `l${idx}i${itemIdx}`)}
                </li>
              ))}
            </ListTag>
          );
        }
        return (
          <p key={`p-${idx}`} className="break-words text-[#D6CFC6]">
            {renderInline(block.text, `p${idx}`)}
          </p>
        );
      })}
    </div>
  );
}
