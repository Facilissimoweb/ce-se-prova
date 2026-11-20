/** Strip Sigillo / scheda-visiva embed markers from dispensa markdown exports. */
export function stripDispensaEmbedMarkers(markdown: string): string {
  return markdown
    .replace(/^\{\{(?:sigillo|scheda-visiva):[\w-]+\}\}\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n');
}
