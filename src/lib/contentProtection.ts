/**
 * ENN-245 / ENN-246 — practical anti-copy / anti-image-theft helpers.
 *
 * Raises the bar for casual select/copy, select-all, and “Save image as…”.
 * Not DRM: screenshots, DevTools, and network fetches still work.
 * Form fields, contenteditable, and `.ti-allow-select` stay fully usable.
 */

const EDITABLE_SELECTOR =
  'input, textarea, select, [contenteditable="true"], [contenteditable=""], .ti-allow-select';

/** Raster / rich media only — Lucide SVGs inside buttons stay usable for a11y menus. */
const MEDIA_SELECTOR = 'img, picture, video, canvas, .ti-protect-media';

/** Keep useful menus on interactive chrome; block casual copy elsewhere. */
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="menuitem"], [role="option"], summary, label, .ti-allow-context-menu';

/** Shortcuts that casually dump or select page content. */
const BLOCKED_MOD_KEYS = new Set(['a', 'c', 'x', 's', 'u']);

function isElement(target: EventTarget | null): target is Element {
  return target instanceof Element;
}

function nodeToElement(node: Node | null): Element | null {
  if (!node) return null;
  if (node instanceof Element) return node;
  return node.parentElement;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!isElement(target)) return false;
  return Boolean(target.closest(EDITABLE_SELECTOR));
}

/** True when focus or the event target is inside an editable control. */
function isEditingContext(target: EventTarget | null = null): boolean {
  if (isEditableTarget(target)) return true;
  if (typeof document === 'undefined') return false;
  return isEditableTarget(document.activeElement);
}

function isProtectedMedia(target: EventTarget | null): boolean {
  if (!isElement(target)) return false;
  return Boolean(target.closest(MEDIA_SELECTOR));
}

/**
 * True when the current DOM selection (if any) lives entirely inside an
 * editable / allow-select region. Collapsed / empty selections are fine.
 */
function selectionIsInsideEditable(): boolean {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    return true;
  }

  const anchorEl = nodeToElement(selection.anchorNode);
  const focusEl = nodeToElement(selection.focusNode);
  if (!anchorEl || !focusEl) return false;

  return isEditableTarget(anchorEl) && isEditableTarget(focusEl);
}

function clearNonEditableSelection(): void {
  if (selectionIsInsideEditable()) return;
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    selection.removeAllRanges();
  }
}

function hardenImage(img: HTMLImageElement): void {
  if (img.getAttribute('draggable') === 'false' && img.draggable === false) {
    return;
  }
  img.draggable = false;
  img.setAttribute('draggable', 'false');
}

function hardenAllImages(root: ParentNode = document): void {
  root.querySelectorAll('img').forEach((img) => {
    if (img instanceof HTMLImageElement) hardenImage(img);
  });
}

function onContextMenu(event: MouseEvent): void {
  if (isEditableTarget(event.target)) return;

  // Prefer images / media — blocks “Save image as…” without fighting form UX.
  if (isProtectedMedia(event.target)) {
    event.preventDefault();
    return;
  }

  if (!isElement(event.target)) return;

  // Leave link/button long-press menus alone (mobile accessibility).
  if (event.target.closest(INTERACTIVE_SELECTOR)) return;

  // Main SPA content: discourage text copy via context menu.
  if (event.target.closest('#root')) {
    event.preventDefault();
  }
}

function onDragStart(event: DragEvent): void {
  if (isEditableTarget(event.target)) return;
  // Block image drag-save and accidental text drag-out of the page.
  event.preventDefault();
}

function onCopyOrCut(event: ClipboardEvent): void {
  if (isEditingContext(event.target)) return;
  event.preventDefault();
  // Empty the clipboard payload when the browser still exposes it.
  try {
    event.clipboardData?.setData('text/plain', '');
  } catch {
    /* ignore — some browsers lock clipboardData after preventDefault */
  }
}

function onSelectStart(event: Event): void {
  if (isEditingContext(event.target)) return;
  event.preventDefault();
}

function onKeyDown(event: KeyboardEvent): void {
  if (isEditingContext(event.target)) return;

  const mod = event.ctrlKey || event.metaKey;
  if (!mod) return;

  const key = event.key.toLowerCase();
  if (!BLOCKED_MOD_KEYS.has(key)) return;

  // Ctrl/Cmd+A select-all, C/X copy-cut, S save-page, U view-source (casual).
  event.preventDefault();
  if (key === 'a') {
    clearNonEditableSelection();
  }
}

function onSelectionChange(): void {
  clearNonEditableSelection();
}

let installed = false;
let observer: MutationObserver | null = null;

/**
 * Install sitewide listeners once. Safe to call from `main.tsx` on boot.
 */
export function installContentProtection(): void {
  if (typeof document === 'undefined' || installed) return;
  installed = true;

  document.addEventListener('contextmenu', onContextMenu, { capture: true });
  document.addEventListener('dragstart', onDragStart, { capture: true });
  document.addEventListener('copy', onCopyOrCut, { capture: true });
  document.addEventListener('cut', onCopyOrCut, { capture: true });
  document.addEventListener('selectstart', onSelectStart, { capture: true });
  document.addEventListener('keydown', onKeyDown, { capture: true });
  document.addEventListener('selectionchange', onSelectionChange);

  hardenAllImages();

  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) {
            hardenImage(node);
          } else if (node instanceof Element) {
            hardenAllImages(node);
          }
        });
      } else if (
        mutation.type === 'attributes' &&
        mutation.target instanceof HTMLImageElement &&
        mutation.attributeName === 'src'
      ) {
        hardenImage(mutation.target);
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src'],
  });
}
