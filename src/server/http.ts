export type ApiUser = {
  uid: string;
  email?: string;
  name?: string;
};

export type ApiResult = {
  status: number;
  body: unknown;
};

export const SAFE_CLIENT_ERRORS = new Set([
  'Percorso didattico non trovato.',
  'Dispensa non trovata.',
  'Acquisto richiesto per accedere a questa dispensa.',
  'Tariffa consulto non valida.',
  'Pacchetto temporale non valido.',
  'Pagamento Stripe richiesto per attivare il percorso.',
  'Pagamento Stripe richiesto per attivare il pass.',
  'SLOT_TAKEN',
  'Prenotazione non trovata.',
  'Prenotazione annullata.',
]);

export function json(status: number, body: unknown): ApiResult {
  return { status, body };
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function resolveRequestOrigin(
  originHeader: string | undefined,
  fallbackPort = 3000
): string {
  const origin =
    (originHeader && originHeader.trim()) ||
    process.env.APP_URL ||
    `http://localhost:${fallbackPort}`;
  return origin.replace(/\/$/, '');
}

export function mapSafeError(
  error: unknown,
  fallback: string,
  statusHints?: { notFound?: string; forbidden?: string; paymentRequired?: string }
): ApiResult {
  const msg = error instanceof Error ? error.message : '';
  if (statusHints?.notFound && msg.includes(statusHints.notFound)) {
    return json(404, { error: msg });
  }
  if (statusHints?.forbidden && msg.includes(statusHints.forbidden)) {
    return json(403, { error: msg });
  }
  if (statusHints?.paymentRequired && msg.includes(statusHints.paymentRequired)) {
    return json(402, { error: msg });
  }
  if (SAFE_CLIENT_ERRORS.has(msg)) {
    const status = msg.includes('non trov')
      ? 404
      : msg.includes('richiesto')
        ? 402
        : 400;
    return json(status, { error: msg });
  }
  console.error(fallback, error);
  return json(500, { error: fallback });
}
