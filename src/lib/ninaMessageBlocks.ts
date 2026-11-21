/**
 * Block parser for Nina chat replies (ENN-188).
 * Pure TS — used by NinaMessageBody and assert-nina-it-bullets.
 */

export type NinaMessageBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] };

const UL_ITEM = /^[-*]\s+(.+)$/;
const OL_ITEM = /^(\d+)\.\s+(.+)$/;

/**
 * Split a dense “- **Item** … - **Item** …” paragraph into intro + list
 * (defensive for models that omit newlines between bullets).
 */
function expandDenseHyphenParagraph(text: string): NinaMessageBlock[] {
  const parts = text.split(/(?=\s+[-*]\s+\*\*)/);
  if (parts.length < 2) {
    return [{ type: 'paragraph', text }];
  }
  const intro = parts[0].replace(/:\s*$/, '').trim();
  const items = parts
    .slice(1)
    .map((p) => p.replace(/^\s*[-*]\s+/, '').trim())
    .filter(Boolean);
  const out: NinaMessageBlock[] = [];
  if (intro) out.push({ type: 'paragraph', text: intro });
  if (items.length > 0) out.push({ type: 'list', ordered: false, items });
  return out;
}

/** Parse Nina markdown into paragraphs and lists (`- ` / `* ` / `1. `). */
export function parseNinaMessageBlocks(text: string): NinaMessageBlock[] {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: NinaMessageBlock[] = [];
  let paraLines: string[] = [];
  let listItems: string[] | null = null;
  let listOrdered = false;

  function flushPara() {
    if (paraLines.length === 0) return;
    const joined = paraLines.join(' ').replace(/\s+/g, ' ').trim();
    if (!joined) {
      paraLines = [];
      return;
    }
    for (const block of expandDenseHyphenParagraph(joined)) {
      blocks.push(block);
    }
    paraLines = [];
  }

  function flushList() {
    if (listItems && listItems.length > 0) {
      blocks.push({ type: 'list', ordered: listOrdered, items: listItems });
    }
    listItems = null;
  }

  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed) {
      flushPara();
      flushList();
      continue;
    }
    const ul = UL_ITEM.exec(trimmed);
    if (ul) {
      flushPara();
      if (!listItems || listOrdered) {
        flushList();
        listItems = [];
        listOrdered = false;
      }
      listItems.push(ul[1]);
      continue;
    }
    const ol = OL_ITEM.exec(trimmed);
    if (ol) {
      flushPara();
      if (!listItems || !listOrdered) {
        flushList();
        listItems = [];
        listOrdered = true;
      }
      listItems.push(ol[2]);
      continue;
    }
    flushList();
    paraLines.push(trimmed);
  }
  flushPara();
  flushList();
  return blocks;
}
