/**
 * Nina reply language helpers.
 * ENN-188 (launch): chat soft-lock / gate / unclear / outage are Italian-only.
 * `normalizeNinaLang` / `ninaReplyLangLabel` remain for PDF/dispensa (not Nina chat).
 * Multi-lang maps kept dormant for post-launch GT restore — do not wire into chat.
 */

/** Native labels for prompt instructions — keys are normalized lowercase. */
export const NINA_REPLY_LANG_LABELS: Record<string, string> = {
  it: 'italiano',
  en: 'English',
  es: 'español',
  fr: 'français',
  de: 'Deutsch',
  pt: 'português',
  'zh-cn': '中文（简体）',
  zh: '中文（简体）',
  ja: '日本語',
  ar: 'العربية',
  ru: 'русский',
  uk: 'українська',
  pl: 'polski',
  nl: 'Nederlands',
  ro: 'română',
  sv: 'svenska',
  tr: 'Türkçe',
  el: 'Ελληνικά',
  ko: '한국어',
  hi: 'हिन्दी',
};

/**
 * Normalize client `lang` (googtrans target) for prompts / copy lookup.
 * ENN-159: any Chinese variant → `zh-cn` (Simplified only; never zh-TW).
 */
export function normalizeNinaLang(lang?: string | null): string {
  const raw = (lang || 'it').trim().toLowerCase().replace(/_/g, '-');
  if (!raw) return 'it';
  if (raw === 'zh' || raw.startsWith('zh-')) {
    return 'zh-cn';
  }
  if (NINA_REPLY_LANG_LABELS[raw]) return raw;
  const primary = raw.split('-')[0] || 'it';
  return primary;
}

/** Human label for system-prompt “reply in …” instruction. */
export function ninaReplyLangLabel(lang?: string | null): string {
  const code = normalizeNinaLang(lang);
  return (
    NINA_REPLY_LANG_LABELS[code] ||
    NINA_REPLY_LANG_LABELS[code.split('-')[0]] ||
    code
  );
}

/** True when Nina should stay on Italian (no reply-language suffix). */
export function isNinaDefaultLang(lang?: string | null): boolean {
  return normalizeNinaLang(lang) === 'it';
}

const SOFT_LOCK_IT = `Quella domanda entra nello **studio didattico degli Arcani Maggiori** (simbologia, senso, luce/ombra, chiave previsionale).

Qui in **accoglienza** ti oriento su prezzi, prenotazione WhatsApp, mappa del sito e Chi sono — senza le schede profonde del corso.

**Nina Studio** si sblocca con l’acquisto del percorso **Arcani Maggiori** (stesso accesso dell’Area Riservata e del blog riservato). Trovi il checkout su **Corsi → Arcani Maggiori**.

Per un consulto personale con Maria Teresa, usa **Parla con Maria Teresa** qui sotto.`;

const SOFT_LOCK_EN = `That question belongs in the **Maggiori study studio** (symbolism, meaning, light/shadow, predictive key).

Here in **welcome** I can help with prices, WhatsApp booking, the site map, and Chi sono — not the deep course sheets.

**Nina Studio** unlocks with the **Arcani Maggiori** course (same access as Area Riservata and the reserved blog). Checkout is on **Corsi → Arcani Maggiori**.

For a personal reading with Maria Teresa, use **Parla con Maria Teresa** below.`;

const SOFT_LOCK_ES = `Esa pregunta pertenece al **estudio didáctico de los Arcanos Mayores** (simbología, sentido, luz/sombra, clave previsional).

Aquí en **acogida** te oriento sobre precios, reserva por WhatsApp, mapa del sitio y Chi sono — sin las fichas profundas del curso.

**Nina Studio** se desbloquea con la compra del recorrido **Arcani Maggiori** (mismo acceso que Area Riservata y el blog reservado). El checkout está en **Corsi → Arcani Maggiori**.

Para una consulta personal con Maria Teresa, usa **Parla con Maria Teresa** abajo.`;

const SOFT_LOCK_FR = `Cette question relève de l’**atelier didactique des Arcanes Majeurs** (symbolique, sens, lumière/ombre, clé prévisionnelle).

Ici en **accueil**, je t’oriente sur les tarifs, la réservation WhatsApp, le plan du site et Chi sono — sans les fiches profondes du cours.

**Nina Studio** se débloque avec l’achat du parcours **Arcani Maggiori** (même accès qu’Area Riservata et le blog réservé). Le checkout est sur **Corsi → Arcani Maggiori**.

Pour une consultation personnelle avec Maria Teresa, utilise **Parla con Maria Teresa** ci-dessous.`;

const SOFT_LOCK_DE = `Diese Frage gehört in das **didaktische Studio der Großen Arkana** (Symbolik, Sinn, Licht/Schatten, prognostischer Schlüssel).

Hier in der **Willkommens-Chat** helfe ich bei Preisen, WhatsApp-Buchung, Sitemap und Chi sono — ohne die tiefen Kurskarten.

**Nina Studio** wird mit dem Kauf des Kurses **Arcani Maggiori** freigeschaltet (gleicher Zugang wie Area Riservata und der geschützte Blog). Checkout unter **Corsi → Arcani Maggiori**.

Für eine persönliche Beratung mit Maria Teresa nutze unten **Parla con Maria Teresa**.`;

const SOFT_LOCK_PT = `Essa pergunta pertence ao **estúdio didático dos Arcanos Maiores** (simbologia, sentido, luz/sombra, chave previsional).

Aqui na **acolhida** oriento sobre preços, reserva via WhatsApp, mapa do site e Chi sono — sem as fichas profundas do curso.

**Nina Studio** desbloqueia com a compra do percurso **Arcani Maggiori** (mesmo acesso da Area Riservata e do blog reservado). O checkout está em **Corsi → Arcani Maggiori**.

Para uma consulta pessoal com Maria Teresa, use **Parla con Maria Teresa** abaixo.`;

const SOFT_LOCK_ZH = `这个问题属于**大阿卡纳学习工作室**（象征、意义、光/影、预示要点）。

在**欢迎**模式里，我可以帮你了解价格、WhatsApp 预约、网站地图和 Chi sono——不包括课程深处的详表。

**Nina Studio** 需购买 **Arcani Maggiori** 课程解锁（与 Area Riservata 及专属博客相同权限）。结账在 **Corsi → Arcani Maggiori**。

若需与 Maria Teresa 一对一咨询，请使用下方的 **Parla con Maria Teresa**。`;

const SOFT_LOCK_JA = `その質問は**大アルカナ学習スタジオ**（象徴・意味・光と影・予兆の鍵）の領域です。

ここでは**ウェルカム**として、料金・WhatsApp予約・サイトマップ・Chi sono をご案内します。コースの深いシートは含みません。

**Nina Studio** は **Arcani Maggiori** コース購入で解除されます（Area Riservata / 限定ブログと同じアクセス）。チェックアウトは **Corsi → Arcani Maggiori**。

Maria Teresa との個人鑑定は、下の **Parla con Maria Teresa** をご利用ください。`;

const SOFT_LOCK_AR = `هذا السؤال ينتمي إلى **استوديو دراسة الأركانا الكبرى** (الرمزية، المعنى، النور/الظل، المفتاح التنبؤي).

هنا في **الترحيب** أرشدك بخصوص الأسعار وحجز واتساب وخريطة الموقع وChi sono — دون بطاقات الدورة العميقة.

يُفتح **Nina Studio** بشراء مسار **Arcani Maggiori** (نفس وصول Area Riservata والمدونة المحجوزة). الدفع عبر **Corsi → Arcani Maggiori**.

لاستشارة شخصية مع Maria Teresa، استخدمي **Parla con Maria Teresa** أدناه.`;

const SOFT_LOCK_RU = `Этот вопрос относится к **учебной студии Старших Арканов** (символика, смысл, свет/тень, прогностический ключ).

В режиме **приветствия** я помогаю с ценами, записью через WhatsApp, картой сайта и Chi sono — без глубоких карточек курса.

**Nina Studio** открывается после покупки курса **Arcani Maggiori** (тот же доступ, что Area Riservata и закрытый блог). Оформление: **Corsi → Arcani Maggiori**.

Для личной консультации с Maria Teresa используйте **Parla con Maria Teresa** ниже.`;

const SOFT_LOCK_KO = `그 질문은 **메이저 아르카나 학습 스튜디오**(상징, 의미, 빛/그림자, 예지 키)에 해당합니다.

여기 **환영** 모드에서는 가격, WhatsApp 예약, 사이트맵, Chi sono를 안내합니다. 코스의 깊은 시트는 포함되지 않습니다.

**Nina Studio**는 **Arcani Maggiori** 코스 구매로 잠금 해제됩니다(Area Riservata / 전용 블로그와 동일 접근). 결제는 **Corsi → Arcani Maggiori**.

Maria Teresa와 개인 상담은 아래 **Parla con Maria Teresa**를 이용해 주세요.`;

const SOFT_LOCK_BY_LANG: Record<string, string> = {
  it: SOFT_LOCK_IT,
  en: SOFT_LOCK_EN,
  es: SOFT_LOCK_ES,
  fr: SOFT_LOCK_FR,
  de: SOFT_LOCK_DE,
  pt: SOFT_LOCK_PT,
  'zh-cn': SOFT_LOCK_ZH,
  zh: SOFT_LOCK_ZH,
  ja: SOFT_LOCK_JA,
  ar: SOFT_LOCK_AR,
  ru: SOFT_LOCK_RU,
  ko: SOFT_LOCK_KO,
};

/** Deterministic welcome soft-lock when deep Maggiori is asked (ENN-137). ENN-188: always IT. */
export function ninaStudioSoftLockReply(_lang?: string | null): string {
  void _lang;
  return SOFT_LOCK_IT;
}

type GateCopy = {
  studioAuth: string;
  studioLocked: string;
  studioLockedDemo: string;
  studioEntitlement: string;
};

const GATE_IT: GateCopy = {
  studioAuth:
    'Per Nina Studio accedi con Google (stesso account dell’Area Riservata).',
  studioLocked:
    'Nina Studio si sblocca con l’acquisto del corso Arcani Maggiori (stesso accesso dell’Area Riservata). Trovi il checkout su Corsi.',
  studioLockedDemo:
    'Nina Studio è riservata a chi ha acquistato Arcani Maggiori. Apri Corsi per il checkout.',
  studioEntitlement:
    'Non riesco a verificare l’accesso a Nina Studio in questo momento. Riprova tra poco oppure apri l’Area Riservata.',
};

const GATE_EN: GateCopy = {
  studioAuth:
    'To use Nina Studio, sign in with Google (same account as Area Riservata).',
  studioLocked:
    'Nina Studio unlocks with the Arcani Maggiori course (same access as Area Riservata). Checkout is on Corsi.',
  studioLockedDemo:
    'Nina Studio is for Arcani Maggiori students. Open Corsi for checkout.',
  studioEntitlement:
    'I cannot verify Nina Studio access right now. Try again shortly or open Area Riservata.',
};

const GATE_ES: GateCopy = {
  studioAuth:
    'Para Nina Studio, inicia sesión con Google (la misma cuenta de Area Riservata).',
  studioLocked:
    'Nina Studio se desbloquea con el curso Arcani Maggiori (mismo acceso que Area Riservata). El checkout está en Corsi.',
  studioLockedDemo:
    'Nina Studio es para quien ha comprado Arcani Maggiori. Abre Corsi para el checkout.',
  studioEntitlement:
    'No puedo verificar el acceso a Nina Studio ahora. Prueba de nuevo o abre Area Riservata.',
};

const GATE_FR: GateCopy = {
  studioAuth:
    'Pour Nina Studio, connecte-toi avec Google (le même compte qu’Area Riservata).',
  studioLocked:
    'Nina Studio se débloque avec le cours Arcani Maggiori (même accès qu’Area Riservata). Checkout sur Corsi.',
  studioLockedDemo:
    'Nina Studio est réservée à qui a acheté Arcani Maggiori. Ouvre Corsi pour le checkout.',
  studioEntitlement:
    'Je ne peux pas vérifier l’accès à Nina Studio pour le moment. Réessaie bientôt ou ouvre Area Riservata.',
};

const GATE_DE: GateCopy = {
  studioAuth:
    'Für Nina Studio bitte mit Google anmelden (dasselbe Konto wie Area Riservata).',
  studioLocked:
    'Nina Studio wird mit dem Kurs Arcani Maggiori freigeschaltet (gleicher Zugang wie Area Riservata). Checkout unter Corsi.',
  studioLockedDemo:
    'Nina Studio ist für Käufer von Arcani Maggiori. Öffne Corsi für den Checkout.',
  studioEntitlement:
    'Ich kann den Zugang zu Nina Studio gerade nicht prüfen. Bitte später erneut versuchen oder Area Riservata öffnen.',
};

const GATE_PT: GateCopy = {
  studioAuth:
    'Para Nina Studio, entra com Google (a mesma conta da Area Riservata).',
  studioLocked:
    'Nina Studio desbloqueia com o curso Arcani Maggiori (mesmo acesso da Area Riservata). Checkout em Corsi.',
  studioLockedDemo:
    'Nina Studio é para quem comprou Arcani Maggiori. Abre Corsi para o checkout.',
  studioEntitlement:
    'Não consigo verificar o acesso a Nina Studio agora. Tenta de novo ou abre a Area Riservata.',
};

const GATE_ZH: GateCopy = {
  studioAuth: '使用 Nina Studio 请用 Google 登录（与 Area Riservata 同一账号）。',
  studioLocked:
    'Nina Studio 需购买 Arcani Maggiori 课程解锁（与 Area Riservata 相同权限）。结账在 Corsi。',
  studioLockedDemo: 'Nina Studio 仅限已购买 Arcani Maggiori 的用户。请打开 Corsi 结账。',
  studioEntitlement:
    '暂时无法验证 Nina Studio 访问权限。请稍后重试或打开 Area Riservata。',
};

const GATE_JA: GateCopy = {
  studioAuth:
    'Nina Studio を使うには Google でログインしてください（Area Riservata と同じアカウント）。',
  studioLocked:
    'Nina Studio は Arcani Maggiori コース購入で解除されます（Area Riservata と同じアクセス）。チェックアウトは Corsi。',
  studioLockedDemo:
    'Nina Studio は Arcani Maggiori 購入者向けです。Corsi でチェックアウトしてください。',
  studioEntitlement:
    'いま Nina Studio のアクセスを確認できません。しばらくしてから再試行するか、Area Riservata を開いてください。',
};

const GATE_BY_LANG: Record<string, GateCopy> = {
  it: GATE_IT,
  en: GATE_EN,
  es: GATE_ES,
  fr: GATE_FR,
  de: GATE_DE,
  pt: GATE_PT,
  'zh-cn': GATE_ZH,
  zh: GATE_ZH,
  ja: GATE_JA,
};

/** ENN-188: always Italian gate copy (lang ignored). */
export function ninaStudioGateCopy(_lang?: string | null): GateCopy {
  void _lang;
  return GATE_IT;
}

/**
 * ENN-152 — when intent is unclear / model empty-confused:
 * ask to rephrase in Tarot Italia tone (never name Groq/Grok).
 */
const UNCLEAR_IT = `Non sono sicura di aver colto bene la tua domanda.

Puoi **riformularla** in modo più chiaro, oppure **specificare l’Arcano** o il tema (prezzi, prenotazione, Chi sono)? Così ti rispondo con più precisione.

Per un consulto personale resta **Parla con Maria Teresa** qui sotto.`;

const UNCLEAR_EN = `I’m not sure I’ve understood your question.

Could you **rephrase** it a little more clearly, or **name the Arcana** / topic (prices, booking, About)? That helps me answer more precisely.

For a personal reading, use **Talk to Maria Teresa** below.`;

const UNCLEAR_ES = `No estoy segura de haber entendido bien tu pregunta.

¿Puedes **reformularla** con más claridad, o **indicar el Arcano** o el tema (precios, reserva, Quién soy)? Así te respondo con más precisión.

Para una consulta personal, usa **Habla con Maria Teresa** abajo.`;

const UNCLEAR_FR = `Je ne suis pas sûre d’avoir bien compris ta question.

Peux-tu la **reformuler** plus clairement, ou **préciser l’Arcane** / le sujet (tarifs, réservation, Qui suis-je) ? Ainsi je répondrai avec plus de précision.

Pour une consultation personnelle, utilise **Parler à Maria Teresa** ci-dessous.`;

const UNCLEAR_DE = `Ich bin mir nicht sicher, ob ich deine Frage richtig verstanden habe.

Kannst du sie etwas **klarer umformulieren**, oder das **Arkana** / Thema nennen (Preise, Buchung, Über mich)? Dann antworte ich präziser.

Für eine persönliche Beratung nutze unten **Mit Maria Teresa sprechen**.`;

const UNCLEAR_PT = `Não tenho a certeza de ter compreendido bem a tua pergunta.

Podes **reformulá-la** com mais clareza, ou **indicar o Arcano** / tema (preços, reserva, Chi sono)? Assim respondo com mais precisão.

Para uma consulta pessoal, usa **Parla con Maria Teresa** abaixo.`;

const UNCLEAR_ZH = `我不太确定是否理解了你的问题。

能否**换个说法**说得更清楚，或**指明具体阿尔卡纳**/主题（价格、预约、Chi sono）？这样我能答得更准。

个人咨询请使用下方的 **Parla con Maria Teresa**。`;

const UNCLEAR_JA = `ご質問の意図を十分に捉えきれていないかもしれません。

もう少し**わかりやすく言い換える**か、**アルカナやテーマ**（料金・予約・Chi sono）を指定してもらえますか？より的確にお答えできます。

個人鑑定は下の **Parla con Maria Teresa** をご利用ください。`;

const UNCLEAR_BY_LANG: Record<string, string> = {
  it: UNCLEAR_IT,
  en: UNCLEAR_EN,
  es: UNCLEAR_ES,
  fr: UNCLEAR_FR,
  de: UNCLEAR_DE,
  pt: UNCLEAR_PT,
  'zh-cn': UNCLEAR_ZH,
  zh: UNCLEAR_ZH,
  ja: UNCLEAR_JA,
};

/** User-facing Nina reply when intent is unclear or the model returned empty/confused. ENN-188: always IT. */
export function ninaUnclearIntentReply(_lang?: string | null): string {
  void _lang;
  return UNCLEAR_IT;
}

/** Soft outage copy — no provider/env names (those stay in Maria’s server logs). */
type SoftOutageCopy = {
  unavailable: string;
  temporary: string;
  tooBroad: string;
};

const OUTAGE_IT: SoftOutageCopy = {
  unavailable:
    'Nina non è attiva in questo momento. Puoi scrivere a Maria Teresa su WhatsApp, Telegram o email.',
  temporary:
    'In questo momento non riesco a risponderti con serenità. Riprova tra poco oppure usa WhatsApp, Telegram o email.',
  tooBroad:
    'La domanda è un po’ troppo ampia per questa chat. Prova a **riformularla** in modo più breve, o **specifica un solo Arcano** / un tema, poi riprova. Nel frattempo puoi usare WhatsApp, Telegram o email.',
};

const OUTAGE_EN: SoftOutageCopy = {
  unavailable:
    'Nina is not available right now. You can reach Maria Teresa on WhatsApp, Telegram or email.',
  temporary:
    'I cannot reply calmly right now. Please try again shortly, or use WhatsApp, Telegram or email.',
  tooBroad:
    'That question is a bit too broad for this chat. Please **rephrase** it more briefly, or **name one Arcana** / topic, then try again. Meanwhile you can use WhatsApp, Telegram or email.',
};

const OUTAGE_ES: SoftOutageCopy = {
  unavailable:
    'Nina no está activa ahora. Puedes escribir a Maria Teresa por WhatsApp, Telegram o email.',
  temporary:
    'Ahora mismo no puedo responderte con calma. Reintenta en breve o usa WhatsApp, Telegram o email.',
  tooBroad:
    'La pregunta es un poco amplia para este chat. **Reformúlala** más breve, o **indica un solo Arcano** / tema, y vuelve a intentarlo. Mientras, WhatsApp, Telegram o email.',
};

const OUTAGE_FR: SoftOutageCopy = {
  unavailable:
    'Nina n’est pas active pour le moment. Tu peux écrire à Maria Teresa sur WhatsApp, Telegram ou email.',
  temporary:
    'Je ne peux pas te répondre sereinement pour l’instant. Réessaie bientôt, ou utilise WhatsApp, Telegram ou email.',
  tooBroad:
    'La question est un peu trop large pour ce chat. **Reformule**-la plus brièvement, ou **précise un seul Arcane** / sujet, puis réessaie. En attendant : WhatsApp, Telegram ou email.',
};

const OUTAGE_DE: SoftOutageCopy = {
  unavailable:
    'Nina ist gerade nicht aktiv. Du kannst Maria Teresa per WhatsApp, Telegram oder E-Mail erreichen.',
  temporary:
    'Ich kann gerade nicht ruhig antworten. Bitte gleich erneut versuchen oder WhatsApp, Telegram oder E-Mail nutzen.',
  tooBroad:
    'Die Frage ist für diesen Chat etwas zu weit. Bitte **kürzer umformulieren** oder **ein Arkana** / Thema nennen, dann erneut versuchen. Zwischenzeitlich: WhatsApp, Telegram oder E-Mail.',
};

const OUTAGE_BY_LANG: Record<string, SoftOutageCopy> = {
  it: OUTAGE_IT,
  en: OUTAGE_EN,
  es: OUTAGE_ES,
  fr: OUTAGE_FR,
  de: OUTAGE_DE,
};

/** ENN-188: always Italian outage copy (lang ignored). */
export function ninaSoftOutageCopy(_lang?: string | null): SoftOutageCopy {
  void _lang;
  return OUTAGE_IT;
}

/**
 * True when a model reply looks like a provider/API leak or empty confusion
 * that must never reach the user as-is (ENN-152).
 */
export function looksLikeNinaProviderLeak(text: string): boolean {
  const raw = text.trim();
  if (!raw) return true;
  const lower = raw.toLowerCase();
  return (
    /\bgroq\b/.test(lower) ||
    /\bgrok\b/.test(lower) ||
    /tarotitaliachatgenericagroq/.test(lower) ||
    /api[_ -]?key/.test(lower) ||
    /openai\/gpt/.test(lower) ||
    /problema con (groq|grok)/.test(lower)
  );
}
