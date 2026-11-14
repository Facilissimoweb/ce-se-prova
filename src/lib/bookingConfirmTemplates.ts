export type BookingConfirmVars = {
  user_name: string;
  user_email: string;
  session_title: string;
  session_mode: string;
  booking_date: string;
  booking_time: string;
  booking_id: string;
  transaction_id: string;
  amount: string;
  phone: string;
  riservata_url: string;
  whatsapp_url: string;
  support_email: string;
};

export function fillBookingConfirmHtml(vars: BookingConfirmVars): string {
  return fillTemplate(BOOKING_CONFIRM_HTML, vars);
}

export function fillBookingConfirmText(vars: BookingConfirmVars): string {
  return fillTemplate(BOOKING_CONFIRM_TEXT, vars);
}

function fillTemplate(template: string, vars: BookingConfirmVars): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = vars[key as keyof BookingConfirmVars];
    return value == null ? '' : String(value);
  });
}

export function formatBookingDateIt(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  const months = [
    'gennaio',
    'febbraio',
    'marzo',
    'aprile',
    'maggio',
    'giugno',
    'luglio',
    'agosto',
    'settembre',
    'ottobre',
    'novembre',
    'dicembre',
  ];
  if (!year || !month || !day || month < 1 || month > 12) return iso;
  return `${day} ${months[month - 1]} ${year}`;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const BOOKING_CONFIRM_TEXT = `Pagamento ricevuto — Tarot Italia

{{user_name}}, sono Teresa. Il pagamento è andato a buon fine. La sessione è riservata sul tuo spazio.

Consulto: {{session_title}}
Quando: {{booking_date}} · {{booking_time}}
Modalità: {{session_mode}}
Importo: €{{amount}}
Riferimento: {{booking_id}}
Transazione: {{transaction_id}}

Area riservata: {{riservata_url}}
Recesso e assistenza: {{whatsapp_url}}

A presto,
Teresa
Maria Teresa Rogani · Tarot Italia

{{support_email}} — ti rispondo personalmente
https://www.tarotitalia.com
`;

const BOOKING_CONFIRM_HTML = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pagamento ricevuto — Tarot Italia</title>
</head>
<body style="margin:0;padding:0;background-color:#F9F8F6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F9F8F6;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;width:100%;">
          <tr>
            <td align="center" style="padding:0 0 28px 0;">
              <p style="margin:0;font-family:Georgia,serif;font-size:18px;letter-spacing:0.14em;text-transform:uppercase;color:#2B2523;">Tarot Italia</p>
              <p style="margin:10px 0 0 0;font-family:Arial,sans-serif;font-size:13px;color:#7A8B78;">di Maria Teresa Rogani, operatore olistico</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 8px 0;font-family:Arial,sans-serif;font-size:16px;line-height:1.65;color:#2B2523;">
              <p style="margin:0 0 18px 0;font-family:Georgia,serif;font-size:22px;">Pagamento ricevuto</p>
              <p style="margin:0 0 16px 0;">{{user_name}}, sono Teresa. Il pagamento è andato a buon fine. La sessione è riservata sul tuo spazio.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 28px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F1F0EC;border:1px solid #7A8B78;">
                <tr>
                  <td style="padding:22px 20px;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#2B2523;">
                    <p style="margin:0 0 14px 0;font-family:Georgia,serif;font-size:15px;">Dettagli della sessione</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Consulto</span><br />{{session_title}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Quando</span><br />{{booking_date}} · {{booking_time}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Modalità</span><br />{{session_mode}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Importo</span><br />€{{amount}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Riferimento</span><br />{{booking_id}}</p>
                    <p style="margin:0;"><span style="color:#7A8B78;">Transazione</span><br />{{transaction_id}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 0 28px 0;">
              <a href="{{riservata_url}}" style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;color:#F9F8F6;background-color:#2B2523;">Area Riservata</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 36px 0;font-family:Georgia,serif;font-size:16px;color:#2B2523;">
              <p style="margin:0 0 6px 0;font-style:italic;">A presto,</p>
              <p style="margin:0;">Teresa</p>
              <p style="margin:6px 0 0 0;font-family:Arial,sans-serif;font-size:13px;color:#7A8B78;">Maria Teresa Rogani · Tarot Italia</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="font-family:Arial,sans-serif;font-size:12px;color:#7A8B78;">
              <a href="{{whatsapp_url}}" style="color:#7A8B78;">Recesso e assistenza</a>
              · <a href="mailto:{{support_email}}" style="color:#7A8B78;">{{support_email}}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
