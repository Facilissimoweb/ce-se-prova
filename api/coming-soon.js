var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// firebase-applet-config.json
var firebase_applet_config_default;
var init_firebase_applet_config = __esm({
  "firebase-applet-config.json"() {
    firebase_applet_config_default = {
      projectId: "gen-lang-client-0853491667",
      appId: "1:9386426759:web:a7195d3ae0e62315771322",
      apiKey: "AIzaSyBY6t3-t2Z7GbF1UuW7ZDYoZF8kW7Sytpo",
      authDomain: "gen-lang-client-0853491667.firebaseapp.com",
      storageBucket: "gen-lang-client-0853491667.firebasestorage.app",
      messagingSenderId: "9386426759",
      measurementId: "",
      oAuthClientId: "",
      recaptchaSiteKey: ""
    };
  }
});

// src/lib/firebase-admin.ts
var firebase_admin_exports = {};
__export(firebase_admin_exports, {
  getAdminAuth: () => getAdminAuth
});
function buildOptions(certFn) {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (raw) {
    try {
      const serviceAccount = JSON.parse(raw);
      return {
        credential: certFn(serviceAccount),
        projectId: serviceAccount.project_id || firebase_applet_config_default.projectId
      };
    } catch (error) {
      console.error(
        "FIREBASE_SERVICE_ACCOUNT_JSON non valido \u2014 fallback projectId only:",
        error
      );
    }
  }
  return { projectId: firebase_applet_config_default.projectId };
}
async function getAdminAuth() {
  if (auth) return auth;
  if (!initPromise) {
    initPromise = (async () => {
      const [{ cert, getApps, initializeApp }, { getAuth }] = await Promise.all([
        import("firebase-admin/app"),
        import("firebase-admin/auth")
      ]);
      if (!app) {
        app = getApps().length ? getApps()[0] : initializeApp(buildOptions(cert));
      }
      auth = getAuth(app);
      return auth;
    })().catch((error) => {
      initPromise = void 0;
      throw error;
    });
  }
  return initPromise;
}
var app, auth, initPromise;
var init_firebase_admin = __esm({
  "src/lib/firebase-admin.ts"() {
    init_firebase_applet_config();
  }
});

// src/lib/comingSoon.ts
var COMING_SOON_COOKIE = "ti_atelier_unlock";
var COMING_SOON_DEFAULT_PATH = "/preview-atelier";
var COMING_SOON_FRIENDLY_PATH = "/admin/com";
var COMING_SOON_BUILTIN_UNLOCK_PATHS = [
  COMING_SOON_DEFAULT_PATH,
  COMING_SOON_FRIENDLY_PATH
];
var COMING_SOON_DEFAULT_OWNER_EMAILS = [
  "mariateresarogani@gmail.com"
];
var COMING_SOON_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 30;
var TOKEN_PAYLOAD = "tarot-italia-atelier-v1";
var PRODUCTION_HOSTS = /* @__PURE__ */ new Set([
  "www.tarotitalia.com",
  "tarotitalia.com"
]);
function resolveComingSoonSecretPath(rawPath) {
  const trimmed = (rawPath || "").trim();
  if (!trimmed) return COMING_SOON_DEFAULT_PATH;
  if (!trimmed.startsWith("/") || /\s/.test(trimmed) || trimmed.length > 128 || /^(sk|pk|rk|whsec)_/i.test(trimmed)) {
    console.warn(
      "[coming-soon] COMING_SOON_SECRET_PATH is not a valid URL path; using default /preview-atelier"
    );
    return COMING_SOON_DEFAULT_PATH;
  }
  const normalized = normalizePath(trimmed);
  if (normalized === "/") return COMING_SOON_DEFAULT_PATH;
  return normalized;
}
function parseOwnerEmailsExtra(raw) {
  return raw.split(/[,;\s]+/).map((e) => e.trim().toLowerCase()).filter((e) => e.includes("@"));
}
function readComingSoonEnv(env = process.env) {
  return {
    enabled: env.COMING_SOON_ENABLED === "true",
    allHosts: env.COMING_SOON_ALL_HOSTS === "true",
    secretPath: resolveComingSoonSecretPath(env.COMING_SOON_SECRET_PATH || ""),
    password: (env.COMING_SOON_PASSWORD || "").trim(),
    passwordHash: (env.COMING_SOON_PASSWORD_HASH || "").trim().toLowerCase(),
    unlockToken: (env.COMING_SOON_UNLOCK_TOKEN || "").trim(),
    ownerEmailsExtra: parseOwnerEmailsExtra(
      env.COMING_SOON_OWNER_EMAILS || ""
    )
  };
}
function listComingSoonOwnerEmails(env = readComingSoonEnv()) {
  const set = new Set(
    COMING_SOON_DEFAULT_OWNER_EMAILS.map((e) => e.toLowerCase())
  );
  for (const e of env.ownerEmailsExtra) set.add(e);
  return [...set];
}
function isComingSoonOwnerEmail(email, env = readComingSoonEnv()) {
  const normalized = (email || "").trim().toLowerCase();
  if (!normalized) return false;
  return listComingSoonOwnerEmails(env).includes(normalized);
}
function normalizePath(pathname) {
  const raw = (pathname.split("?")[0].split("#")[0] || "/").trim() || "/";
  if (raw === "/") return "/";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.replace(/\/+$/, "").toLowerCase() || "/";
}
function hostWithoutPort(hostHeader) {
  return hostHeader.trim().toLowerCase().replace(/:\d+$/, "");
}
function isComingSoonActiveForHost(hostHeader, env = readComingSoonEnv()) {
  if (!env.enabled) return false;
  if (env.allHosts) return true;
  const host = hostWithoutPort(hostHeader);
  return PRODUCTION_HOSTS.has(host);
}
function listComingSoonUnlockPaths(env = readComingSoonEnv()) {
  const paths = new Set(
    COMING_SOON_BUILTIN_UNLOCK_PATHS.map((p) => normalizePath(p))
  );
  paths.add(normalizePath(env.secretPath));
  return [...paths];
}
function timingSafeEqualString(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}
async function sha256Hex(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function hmacSha256Hex(secret, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  );
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function cookieSigningMaterial(env) {
  if (env.password) return `pwd:${env.password}`;
  if (env.passwordHash) return `hash:${env.passwordHash}`;
  if (env.unlockToken) return `tok:${env.unlockToken}`;
  const saRaw = process.env.FIREBASE_SERVICE_ACCOUNT || "";
  if (saRaw) {
    try {
      const sa = JSON.parse(saRaw);
      if (sa.private_key_id) return `sa:${sa.private_key_id}`;
      if (sa.project_id) return `sa-proj:${sa.project_id}`;
    } catch {
    }
  }
  return null;
}
async function createUnlockToken(env = readComingSoonEnv()) {
  const material = cookieSigningMaterial(env);
  if (!material) return null;
  return hmacSha256Hex(material, TOKEN_PAYLOAD);
}
async function isValidUnlockCookie(cookieHeader, env = readComingSoonEnv()) {
  const expected = await createUnlockToken(env);
  if (!expected) return false;
  const raw = cookieHeader || "";
  const match = raw.split(";").map((p) => p.trim()).find((p) => p.startsWith(`${COMING_SOON_COOKIE}=`));
  if (!match) return false;
  const value = match.slice(COMING_SOON_COOKIE.length + 1).trim();
  return timingSafeEqualString(value, expected);
}
async function verifyComingSoonPassword(password, env = readComingSoonEnv()) {
  const candidate = password.trim();
  if (!candidate) return false;
  if (env.passwordHash) {
    const digest = await sha256Hex(candidate);
    return timingSafeEqualString(digest, env.passwordHash);
  }
  if (env.password) {
    return timingSafeEqualString(candidate, env.password);
  }
  return false;
}
function buildUnlockSetCookieHeader(token, opts = { secure: true }) {
  const maxAge = opts.maxAgeSec ?? COMING_SOON_COOKIE_MAX_AGE_SEC;
  const parts = [
    `${COMING_SOON_COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`
  ];
  if (opts.secure) parts.push("Secure");
  return parts.join("; ");
}
function buildClearUnlockCookieHeader(secure) {
  const parts = [
    `${COMING_SOON_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0"
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

// src/server/routes/comingSoon.ts
function secureCookie(origin) {
  return origin.startsWith("https://") || process.env.VERCEL === "1";
}
function getComingSoonStatus(input) {
  const env = input.env ?? readComingSoonEnv();
  const active = isComingSoonActiveForHost(input.host, env);
  return isValidUnlockCookie(input.cookieHeader, env).then((unlocked) => ({
    status: 200,
    body: {
      enabled: env.enabled,
      active,
      unlocked: active ? unlocked : true,
      secretPath: env.secretPath,
      unlockPaths: listComingSoonUnlockPaths(env),
      unlockLinkConfigured: Boolean(env.unlockToken),
      passwordConfigured: Boolean(env.password || env.passwordHash),
      googleOwnerUnlock: true,
      ownerEmailCount: listComingSoonOwnerEmails(env).length
    }
  }));
}
async function postComingSoonUnlock(input) {
  const env = input.env ?? readComingSoonEnv();
  if (!env.enabled) {
    return {
      status: 400,
      body: { error: "Coming Soon non \xE8 attivo su questo ambiente." }
    };
  }
  if (!env.password && !env.passwordHash) {
    return {
      status: 503,
      body: {
        error: "Password Coming Soon non configurata. Usa \xABEntra con Google\xBB oppure imposta COMING_SOON_UNLOCK_TOKEN."
      }
    };
  }
  const ok = await verifyComingSoonPassword(input.password, env);
  if (!ok) {
    return {
      status: 401,
      body: { error: "Password non corretta." }
    };
  }
  const token = await createUnlockToken(env);
  if (!token) {
    return {
      status: 503,
      body: { error: "Impossibile creare la sessione di anteprima." }
    };
  }
  return {
    status: 200,
    body: { ok: true, redirect: "/", method: "password" },
    setCookie: buildUnlockSetCookieHeader(token, {
      secure: secureCookie(input.origin)
    })
  };
}
async function postComingSoonUnlockWithGoogle(input) {
  const env = input.env ?? readComingSoonEnv();
  if (!env.enabled) {
    return {
      status: 400,
      body: { error: "Coming Soon non \xE8 attivo su questo ambiente." }
    };
  }
  const idToken = input.idToken.trim();
  if (!idToken) {
    return {
      status: 400,
      body: { error: "Token Google mancante." }
    };
  }
  let email;
  try {
    const { getAdminAuth: getAdminAuth2 } = await Promise.resolve().then(() => (init_firebase_admin(), firebase_admin_exports));
    const adminAuth = await getAdminAuth2();
    const decoded = await adminAuth.verifyIdToken(idToken);
    email = decoded.email;
  } catch (error) {
    console.error("[coming-soon] Google unlock verify failed:", error);
    return {
      status: 401,
      body: {
        error: "Accesso Google non valido o scaduto. Riprova con \xABEntra con Google\xBB."
      }
    };
  }
  if (!isComingSoonOwnerEmail(email, env)) {
    return {
      status: 403,
      body: {
        error: "Questo account Google non \xE8 autorizzato ad aprire l\u2019anteprima."
      }
    };
  }
  const token = await createUnlockToken(env);
  if (!token) {
    return {
      status: 503,
      body: {
        error: "Impossibile creare la sessione di anteprima. Controlla FIREBASE_SERVICE_ACCOUNT su Vercel."
      }
    };
  }
  return {
    status: 200,
    body: {
      ok: true,
      redirect: "/",
      method: "google",
      email: (email || "").toLowerCase()
    },
    setCookie: buildUnlockSetCookieHeader(token, {
      secure: secureCookie(input.origin)
    })
  };
}
function postComingSoonLock(input) {
  return {
    status: 200,
    body: { ok: true },
    setCookie: buildClearUnlockCookieHeader(secureCookie(input.origin))
  };
}

// src/server/nodeHttp.ts
function sendJson(res, status, body) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    res.status(status).json(body);
    return;
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}
function readHeader(req, name) {
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (key.toLowerCase() !== target) continue;
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
  }
  return "";
}
function readBodyObject(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  if (typeof req.body === "string" && req.body.trim()) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}
function queryString(value) {
  if (Array.isArray(value)) return String(value[0] || "");
  return String(value || "");
}
function requestOrigin(req) {
  const proto = readHeader(req, "x-forwarded-proto") || "https";
  const host = readHeader(req, "x-forwarded-host") || readHeader(req, "host");
  if (host) {
    return `${proto}://${host}`.replace(/\/$/, "");
  }
  const origin = readHeader(req, "origin");
  if (origin) return origin.replace(/\/$/, "");
  return (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
}

// src/server/apiEntries/comingSoon.ts
var config = { runtime: "nodejs", maxDuration: 10 };
function requestHost(req) {
  return readHeader(req, "x-forwarded-host") || readHeader(req, "host") || "localhost";
}
function subpath(req) {
  const fromQuery = queryString(req.query?.__path).replace(/^\/+/, "");
  if (fromQuery) return fromQuery.toLowerCase();
  const url = req.url || "";
  const pathOnly = url.split("?")[0] || "";
  const marker = "/api/coming-soon";
  const idx = pathOnly.toLowerCase().indexOf(marker);
  if (idx >= 0) {
    return pathOnly.slice(idx + marker.length).replace(/^\/+/, "").toLowerCase();
  }
  return "";
}
async function handler(req, res) {
  try {
    const method = (req.method || "GET").toUpperCase();
    const path = subpath(req);
    const origin = requestOrigin(req);
    if (method === "GET" && (path === "" || path === "status")) {
      const result = await getComingSoonStatus({
        host: requestHost(req),
        cookieHeader: readHeader(req, "cookie")
      });
      return sendJson(res, result.status, result.body);
    }
    if (method === "POST" && (path === "" || path === "unlock")) {
      const body = readBodyObject(req);
      const idToken = typeof body.idToken === "string" ? body.idToken : typeof body.id_token === "string" ? body.id_token : "";
      const password = typeof body.password === "string" ? body.password : "";
      const result = idToken ? await postComingSoonUnlockWithGoogle({ idToken, origin }) : await postComingSoonUnlock({ password, origin });
      if (result.setCookie) {
        res.setHeader("Set-Cookie", result.setCookie);
      }
      return sendJson(res, result.status, result.body);
    }
    if (method === "POST" && path === "lock") {
      const result = postComingSoonLock({ origin });
      if (result.setCookie) {
        res.setHeader("Set-Cookie", result.setCookie);
      }
      return sendJson(res, result.status, result.body);
    }
    res.setHeader("Allow", "GET, POST");
    return sendJson(res, 405, { error: "Metodo non consentito." });
  } catch (error) {
    console.error("api/coming-soon handler failed:", error);
    return sendJson(res, 500, {
      error: "Internal server error",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}
export {
  config,
  handler as default
};
