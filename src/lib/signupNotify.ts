/**
 * ENN-250 — email Maria when a new Firebase Auth user is first synced to Postgres
 * (first Area personale / reserved API hit). One mail per new uid; uses Zoho SMTP.
 */
import { escapeHtml } from './bookingConfirmTemplates.ts';
import { isZohoMailConfigured, sendZohoMail } from './zohoMail.ts';

/** Local demo reserved auth — never notify. */
const DEMO_RESERVED_UID = 'demo-reserved-enn103';

export const DEFAULT_ADMIN_NOTIFY_EMAIL = 'mariateresarogani@gmail.com';

export type SignupNotifyUser = {
  uid: string;
  email: string;
  displayName?: string | null;
  createdAt?: Date | string | null;
};

export function resolveAdminNotifyEmail(
  env: NodeJS.ProcessEnv = process.env
): string {
  return (
    env.ADMIN_NOTIFY_EMAIL?.trim() ||
    env.ZOHO_STUDIO_EMAIL?.trim() ||
    DEFAULT_ADMIN_NOTIFY_EMAIL
  );
}

export function shouldNotifySignup(
  user: Pick<SignupNotifyUser, 'uid' | 'email'>,
  env: NodeJS.ProcessEnv = process.env
): boolean {
  const uid = (user.uid || '').trim();
  if (!uid || uid === DEMO_RESERVED_UID) return false;
  if (env.ADMIN_SIGNUP_NOTIFY === 'false') return false;
  return true;
}

function formatCreatedAt(value: SignupNotifyUser['createdAt']): string {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('it-IT', {
    timeZone: 'Europe/Rome',
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

/**
 * Fire-and-forget safe: logs and returns on missing Zoho / send failure.
 * Call only after a successful first insert for this uid.
 */
export async function notifyAdminOfNewSignup(
  user: SignupNotifyUser,
  env: NodeJS.ProcessEnv = process.env
): Promise<'sent' | 'skipped' | 'failed'> {
  if (!shouldNotifySignup(user, env)) {
    return 'skipped';
  }

  if (!isZohoMailConfigured()) {
    console.error(
      'Missing ZOHO secrets — signup notify mail skipped (uid=%s)',
      user.uid
    );
    return 'skipped';
  }

  const to = resolveAdminNotifyEmail(env);
  const name = (user.displayName || '').trim() || '—';
  const email = (user.email || '').trim() || '—';
  const when = formatCreatedAt(user.createdAt);
  const site = (
    env.APP_URL?.trim() ||
    env.SITE_URL?.trim() ||
    'https://www.tarotitalia.com'
  ).replace(/\/$/, '');

  const text = [
    'Nuova iscrizione — Tarot Italia',
    `Nome: ${name}`,
    `Email: ${email}`,
    `UID Firebase: ${user.uid}`,
    `Primo accesso Area personale: ${when}`,
    `Sito: ${site}`,
  ].join('\n');

  const html = `<div style="font-family:Georgia,serif;color:#2B2523;background:#F9F8F6;padding:28px">
<p style="margin:0 0 12px;font-size:18px;">Nuova iscrizione — Tarot Italia</p>
<p style="margin:0;line-height:1.55;">
<strong>Nome:</strong> ${escapeHtml(name)}<br>
<strong>Email:</strong> ${escapeHtml(email)}<br>
<strong>UID Firebase:</strong> ${escapeHtml(user.uid)}<br>
<strong>Primo accesso Area personale:</strong> ${escapeHtml(when)}<br>
<strong>Sito:</strong> <a href="${escapeHtml(site)}">${escapeHtml(site)}</a>
</p>
</div>`;

  try {
    await sendZohoMail({
      to,
      subject: `Nuova iscrizione — ${email !== '—' ? email : user.uid}`,
      text,
      html,
      replyTo: email !== '—' ? email : undefined,
    });
    console.log('signup notify mail sent', { to, uid: user.uid });
    return 'sent';
  } catch (error) {
    console.error('signup notify mail', error);
    return 'failed';
  }
}
