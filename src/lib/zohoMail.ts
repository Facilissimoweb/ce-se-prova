import nodemailer from 'nodemailer';

export type ZohoMailMessage = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

function zohoConfigured(): { user: string; pass: string; host: string; port: number } | null {
  const user = process.env.ZOHO_EMAIL?.trim();
  const pass = process.env.ZOHO_PASSWORD;
  if (!user || !pass) return null;
  const host = process.env.ZOHO_SMTP_HOST?.trim() || 'smtp.zoho.eu';
  const port = Number(process.env.ZOHO_SMTP_PORT || '465');
  return { user, pass, host, port: Number.isFinite(port) ? port : 465 };
}

export function isZohoMailConfigured(): boolean {
  return Boolean(zohoConfigured());
}

export async function sendZohoMail(message: ZohoMailMessage): Promise<void> {
  const cfg = zohoConfigured();
  if (!cfg) {
    throw new Error('ZOHO_NOT_CONFIGURED');
  }

  const fromAddress =
    process.env.ZOHO_FROM_EMAIL?.trim() || cfg.user;
  const fromName =
    process.env.ZOHO_FROM_NAME?.trim() ||
    'Maria Teresa Rogani · Tarot Italia';

  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 30_000,
  });

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      replyTo: message.replyTo || fromAddress,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
  } finally {
    transporter.close();
  }
}

export async function sendZohoMails(messages: ZohoMailMessage[]): Promise<void> {
  const cfg = zohoConfigured();
  if (!cfg) {
    throw new Error('ZOHO_NOT_CONFIGURED');
  }

  const fromAddress =
    process.env.ZOHO_FROM_EMAIL?.trim() || cfg.user;
  const fromName =
    process.env.ZOHO_FROM_NAME?.trim() ||
    'Maria Teresa Rogani · Tarot Italia';

  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 30_000,
  });

  try {
    for (const message of messages) {
      await transporter.sendMail({
        from: `"${fromName}" <${fromAddress}>`,
        replyTo: message.replyTo || fromAddress,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
      });
    }
  } finally {
    transporter.close();
  }
}
