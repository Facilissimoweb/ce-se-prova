/**
 * ENN-245 — practical anti-copy / anti-image-theft helpers.
 *
 * Raises the bar for casual select/copy and “Save image as…”.
 * Not false security: screenshots, DevTools, and network fetches still work.
 * Form fields, contenteditable, and `.ti-allow-select` stay fully usable.
 */

const EDITABLE_SELECTOR =
  'input, textarea, select, [contenteditable="true"], [contenteditable=""], .ti-allow-select';

/** Raster / rich media only — Lucide SVGs inside buttons stay usable for a11y menus. */
const MEDIA_SELECTOR = 'img, picture, video, canvas, .ti-protect-media';

/** Keep useful menus on interactive chrome; block casual copy elsewhere. */
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="menuitem"], [role="option"], summary, label, .ti-allow-context-menu';

function isElement(target: EventTarget | null): target is Element {
  return target instanceof Element;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!isElement(target)) return false;
  return Boolean(target.closest(EDITABLE_SELECTOR));
}

function isProtectedMedia(target: EventTarget | null): boolean {
  if (!isElement(target)) return false;
  return Boolean(target.closest(MEDIA_SELECTOR));
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
  if (isProtectedMedia(event.target)) {
    event.preventDefault();
  }
}

function onCopyOrCut(event: ClipboardEvent): void {
  if (isEditableTarget(event.target)) return;
  event.preventDefault();
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
