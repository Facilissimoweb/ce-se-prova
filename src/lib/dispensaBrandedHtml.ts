/**
 * ENN-145 — Branded printable HTML for Maggiori dispensa PDF (print → Save as PDF).
 * Header: logo + title; footer: contacts. Works with CJK via browser/system fonts.
 */

import {
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PIVA,
} from './siteContacts.ts';

export type BrandedDispensaHtmlParams = {
  markdown: string;
  lang: string;
  moduleNumber: string;
  title: string;
  subtitle?: string;
  courseTitle?: string;
  /** Absolute origin for logo URL (e.g. https://tarotitalia.com). */
  origin: string;
  /** When true, auto-open the browser print dialog after load. */
  autoPrint?: boolean;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inlineBold(text: string): string {
  return escapeHtml(text).replace(
    /\*\*([^*]+)\*\*/g,
    '<strong>$1</strong>'
  );
}

/** Minimal Markdown → HTML for Maggiori handouts (headings, lists, paragraphs). */
export function markdownToBrandedBodyHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let inUl = false;

  const closeUl = () => {
    if (inUl) {
      out.push('</ul>');
      inUl = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();
    if (!trimmed) {
      closeUl();
      continue;
    }

    if (/^#{1,4}\s+/.test(trimmed)) {
      closeUl();
      const level = Math.min(trimmed.match(/^#+/)?.[0].length ?? 2, 4);
      const text = trimmed.replace(/^#{1,4}\s+/, '');
      out.push(`<h${level}>${inlineBold(text)}</h${level}>`);
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      if (!inUl) {
        out.push('<ul>');
        inUl = true;
      }
      out.push(`<li>${inlineBold(trimmed.replace(/^[-*]\s+/, ''))}</li>`);
      continue;
    }

    closeUl();
    out.push(`<p>${inlineBold(trimmed)}</p>`);
  }
  closeUl();
  return out.join('\n');
}

export function buildBrandedDispensaHtml(
  params: BrandedDispensaHtmlParams
): string {
  const lang = (params.lang || 'it').trim() || 'it';
  const moduleNumber = params.moduleNumber.padStart(2, '0');
  const courseTitle = params.courseTitle || 'Arcani Maggiori';
  const logoSrc = `${params.origin.replace(/\/$/, '')}/brand/tarot-italia-nav.png`;
  const bodyHtml = markdownToBrandedBodyHtml(params.markdown);
  const docTitle = `Tarot Italia · Modulo ${moduleNumber} · ${params.title}`;
  const autoPrint = params.autoPrint !== false;

  return `<!DOCTYPE html>
<html lang="${escapeHtml(lang)}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(docTitle)}</title>
  <style>
    :root {
      --gold: #D4AF37;
      --ink: #1a1612;
      --muted: #5c534c;
      --paper: #faf7f2;
    }
    * { box-sizing: border-box; }
    @page {
      size: A4;
      margin: 18mm 14mm 20mm;
    }
    body {
      margin: 0;
      color: var(--ink);
      background: var(--paper);
      font-family: "Source Serif 4", "Noto Serif SC", "Noto Serif", Georgia, "Times New Roman", serif;
      font-size: 11.5pt;
      line-height: 1.55;
    }
    .sheet {
      max-width: 720px;
      margin: 0 auto;
      padding: 1.25rem 1rem 2.5rem;
    }
    .tip {
      margin: 0 0 1rem;
      padding: 0.65rem 0.85rem;
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 8px;
      background: #fff8e7;
      color: var(--muted);
      font-family: system-ui, sans-serif;
      font-size: 0.85rem;
    }
    header.brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      padding-bottom: 0.85rem;
      border-bottom: 2px solid var(--gold);
      margin-bottom: 1.25rem;
    }
    header.brand img {
      width: 56px;
      height: 56px;
      object-fit: contain;
    }
    header.brand .titles { min-width: 0; }
    header.brand .brand-name {
      margin: 0;
      font-size: 1.15rem;
      letter-spacing: 0.04em;
      color: #3a2f1c;
      font-weight: 700;
    }
    header.brand .doc-line {
      margin: 0.2rem 0 0;
      font-size: 0.92rem;
      color: var(--muted);
    }
    h1, h2, h3, h4 {
      color: #2a2218;
      line-height: 1.25;
      page-break-after: avoid;
    }
    h1 { font-size: 1.45rem; margin: 0 0 0.4rem; }
    h2 { font-size: 1.2rem; margin: 1.35rem 0 0.5rem; border-bottom: 1px solid rgba(212,175,55,0.35); padding-bottom: 0.25rem; }
    h3 { font-size: 1.05rem; margin: 1.1rem 0 0.4rem; }
    h4 { font-size: 1rem; margin: 0.9rem 0 0.35rem; }
    p { margin: 0.55rem 0; }
    ul { margin: 0.45rem 0 0.7rem 1.2rem; padding: 0; }
    li { margin: 0.25rem 0; }
    strong { font-weight: 700; }
    footer.brand {
      margin-top: 2rem;
      padding-top: 0.85rem;
      border-top: 1px solid rgba(212, 175, 55, 0.55);
      font-family: system-ui, sans-serif;
      font-size: 0.78rem;
      color: var(--muted);
      line-height: 1.45;
    }
    footer.brand a { color: #6b5520; text-decoration: none; }
    @media print {
      body { background: white; }
      .tip { display: none !important; }
      .sheet { max-width: none; padding: 0; }
      a[href]::after { content: ""; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <p class="tip">Usa <strong>Salva come PDF</strong> / <strong>Save as PDF</strong> nella finestra di stampa. Lingua: <strong>${escapeHtml(lang)}</strong>.</p>
    <header class="brand">
      <img src="${escapeHtml(logoSrc)}" alt="Tarot Italia" width="56" height="56" />
      <div class="titles">
        <p class="brand-name">Tarot Italia · Maria Teresa Rogani</p>
        <p class="doc-line">${escapeHtml(courseTitle)} · Modulo ${escapeHtml(moduleNumber)}</p>
      </div>
    </header>
    <main>
      <h1>${escapeHtml(params.title)}</h1>
      ${
        params.subtitle
          ? `<p style="color:var(--muted);margin-top:0">${escapeHtml(params.subtitle)}</p>`
          : ''
      }
      ${bodyHtml}
    </main>
    <footer class="brand">
      <div><strong>Tarot Italia</strong> · ${escapeHtml(SITE_ADDRESS)}</div>
      <div>
        <a href="mailto:${escapeHtml(SITE_EMAIL)}">${escapeHtml(SITE_EMAIL)}</a>
        · Tel. ${escapeHtml(SITE_PHONE_DISPLAY)}
        · P.IVA ${escapeHtml(SITE_PIVA)}
      </div>
      <div>tarotitalia.com · Dispensa formativa (traduzione automatica da italiano quando la lingua ≠ IT)</div>
    </footer>
  </div>
  ${
    autoPrint
      ? `<script>
  window.addEventListener('load', function () {
    setTimeout(function () { window.print(); }, 350);
  });
</script>`
      : ''
  }
</body>
</html>`;
}

export function dispensaPdfFilename(
  moduleNumber: string,
  lang: string
): string {
  const nn = moduleNumber.padStart(2, '0');
  const safeLang = (lang || 'it').toLowerCase().replace(/[^a-z0-9-]/g, '');
  return `tarot-italia-arcani-maggiori-modulo-${nn}-${safeLang}.pdf`;
}
