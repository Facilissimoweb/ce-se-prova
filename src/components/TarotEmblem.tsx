import React from 'react';

/** Canonical brand mark — transparent PNG in public/brand/. */
export const TAROT_ITALIA_LOGO_SRC = '/brand/tarot-italia-logo.png';

/** Home opening hero mark (triangle / eye · TAROT ITALIA) — RGBA as-is. */
export const TAROT_ITALIA_HOME_HERO_SRC = '/brand/tarot-italia-home-hero.png';

/** Sitewide nav brand mark (eye in glowing triangle + green nebula) — RGBA as-is. */
export const TAROT_ITALIA_NAV_SRC = '/brand/tarot-italia-nav.png';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Tarot Italia brand logo (eye + wings/moons, gold/purple).
 * Transparent PNG — no white plate; sized large enough to read on dark UI.
 */
export function TarotEmblemLogo({ className = '', size = 56 }: LogoProps) {
  return (
    <img
      src={TAROT_ITALIA_LOGO_SRC}
      alt=""
      width={size}
      height={size}
      decoding="async"
      className={`object-contain object-center ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}

/**
 * Nav / header brand mark (ENN-37): eye in glowing triangle + green nebula.
 * RGBA PNG used as-is — no flood-fill / alpha rewrite.
 * Pass `size` for a fixed box, or omit it and size via `className` (e.g. h-14 md:h-16).
 */
export function TarotNavLogo({ className = '', size }: LogoProps) {
  const fixed = typeof size === 'number';
  const box = size ?? 64;
  return (
    <img
      src={TAROT_ITALIA_NAV_SRC}
      alt=""
      width={box}
      height={box}
      decoding="async"
      className={`object-contain object-center ${className}`.trim()}
      style={fixed ? { width: size, height: size } : undefined}
      aria-hidden="true"
    />
  );
}

/**
 * Custom sacred illustration for Arcano IX - L'Eremita
 */
export function HermitArcanaIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustrazione simbolica dell'Arcano IX L'Eremita"
    >
      <defs>
        <radialGradient id="lanternGlow" cx="50%" cy="42%" r="48%">
          <stop offset="0%" stopColor="#E6C65C" stopOpacity="0.34" />
          <stop offset="45%" stopColor="#D4AF37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#12100E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldFrame" x1="0" y1="0" x2="220" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#E6C65C" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Card deep obsidian background */}
      <rect x="2" y="2" width="216" height="336" rx="14" fill="#151311" stroke="url(#goldFrame)" strokeWidth="1.5" />
      <rect x="12" y="12" width="196" height="316" rx="10" stroke="#D4AF37" strokeOpacity="0.25" strokeWidth="1" />

      {/* Ambient lantern radiance */}
      <circle cx="136" cy="142" r="88" fill="url(#lanternGlow)" />

      {/* Top arch and numeral */}
      <path d="M40 52 C40 30, 180 30, 180 52" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1" />
      <text
        x="110"
        y="46"
        textAnchor="middle"
        fill="#D4AF37"
        fontSize="16"
        letterSpacing="4"
        fontFamily="Cinzel, Georgia, serif"
      >
        IX
      </text>

      {/* Distant mountain ridge */}
      <path
        d="M24 270 L66 226 L98 250 L142 212 L196 270"
        stroke="#D4AF37"
        strokeOpacity="0.32"
        strokeWidth="1.2"
        fill="rgba(212, 175, 55, 0.04)"
      />
      <path
        d="M24 282 L88 262 L134 278 L196 260"
        stroke="#A39B93"
        strokeOpacity="0.25"
        strokeWidth="1"
      />

      {/* Celestial stars */}
      <circle cx="52" cy="78" r="1.4" fill="#D4AF37" fillOpacity="0.7" />
      <circle cx="172" cy="84" r="1.4" fill="#D4AF37" fillOpacity="0.7" />
      <circle cx="72" cy="116" r="1" fill="#F4F1EA" fillOpacity="0.45" />
      <circle cx="164" cy="110" r="1" fill="#F4F1EA" fillOpacity="0.45" />

      {/* Hermit pilgrim staff */}
      <path d="M74 118 L66 274" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="74" cy="114" r="3.5" stroke="#D4AF37" strokeWidth="1.2" fill="#151311" />

      {/* Cloaked Hermit silhouette */}
      <path
        d="M96 92 C110 86, 122 96, 120 114 C118 124, 112 128, 108 134 C122 154, 126 206, 124 274 L78 274 C76 218, 82 162, 88 134 C82 120, 82 98, 96 92 Z"
        fill="#1D1B19"
        stroke="#D4AF37"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Hood fold */}
      <path
        d="M95 94 C88 106, 92 122, 106 128"
        stroke="#D4AF37"
        strokeOpacity="0.6"
        strokeWidth="1.1"
      />
      {/* Robe drapery */}
      <path d="M92 152 L88 258 M106 154 L108 262" stroke="#D4AF37" strokeOpacity="0.28" strokeWidth="1" />

      {/* Extended arm holding lantern */}
      <path d="M114 140 L136 124" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" />

      {/* Lantern */}
      <path d="M136 124 L136 132" stroke="#D4AF37" strokeWidth="1.2" />
      <polygon
        points="136,132 146,140 144,160 128,160 126,140"
        fill="rgba(230, 198, 92, 0.16)"
        stroke="#E6C65C"
        strokeWidth="1.3"
      />
      {/* Six-pointed inner star inside lantern */}
      <polygon
        points="136,139 141,149 131,149"
        stroke="#F4F1EA"
        strokeWidth="0.9"
        fill="none"
      />
      <polygon
        points="136,153 141,143 131,143"
        stroke="#F4F1EA"
        strokeWidth="0.9"
        fill="none"
      />

      {/* Bottom title banner */}
      <line x1="36" y1="292" x2="184" y2="292" stroke="#D4AF37" strokeOpacity="0.35" strokeWidth="1" />
      <text
        x="110"
        y="314"
        textAnchor="middle"
        fill="#F4F1EA"
        fontSize="13"
        letterSpacing="3"
        fontFamily="Cinzel, Georgia, serif"
      >
        L&apos;EREMITA
      </text>
    </svg>
  );
}
