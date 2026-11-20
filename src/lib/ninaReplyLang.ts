/**
 * Nina reply language from Google Translate (`googtrans` / `#googtrans`).
 * Knowledge stays Italian; the model (and deterministic soft-lock copy) answer
 * in the active browsing language (ENN-143).
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
 * Preserves `zh-CN` as `zh-cn`; unknown tags keep their primary subtag.
 */
export function normalizeNinaLang(lang?: string | null): string {
  const raw = (lang || 'it').trim().toLowerCase().replace(/_/g, '-');
  if (!raw) return 'it';
  if (raw === 'zh' || raw.startsWith('zh-')) {
    if (raw.startsWith('zh-tw') || raw.startsWith('zh-hk') || raw.startsWith('zh-hant')) {
      return raw;
    }
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

/** Deterministic welcome soft-lock when deep Maggiori is asked (ENN-137 / ENN-143). */
export function ninaStudioSoftLockReply(lang?: string | null): string {
  const code = normalizeNinaLang(lang);
  return SOFT_LOCK_BY_LANG[code] || SOFT_LOCK_BY_LANG[code.split('-')[0]] || SOFT_LOCK_EN;
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

export function ninaStudioGateCopy(lang?: string | null): GateCopy {
  const code = normalizeNinaLang(lang);
  return GATE_BY_LANG[code] || GATE_BY_LANG[code.split('-')[0]] || GATE_EN;
}
