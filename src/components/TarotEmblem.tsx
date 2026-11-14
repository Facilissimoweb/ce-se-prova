import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Tarot Italia Emblem Logo
 * Sole, luna crescente e stella a otto punte in oro #D4AF37
 */
export function TarotEmblemLogo({ className = '', size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer sacred circle */}
      <circle
        cx="32"
        cy="32"
        r="29"
        stroke="#D4AF37"
        strokeWidth="1.25"
        strokeOpacity="0.65"
      />
      <circle
        cx="32"
        cy="32"
        r="25.5"
        stroke="#D4AF37"
        strokeWidth="0.75"
        strokeOpacity="0.3"
        strokeDasharray="2 3"
      />

      {/* Sun rays at top */}
      <circle cx="32" cy="18" r="4.5" stroke="#D4AF37" strokeWidth="1.4" />
      <path
        d="M32 9.5V11.5M32 24.5V26.5M23.5 18H25.5M38.5 18H40.5M26 12L27.4 13.4M36.6 22.6L38 24M38 12L36.6 13.4M27.4 22.6L26 24"
        stroke="#D4AF37"
        strokeWidth="1.25"
        strokeLinecap="round"
      />

      {/* Crescent Moon cradling center */}
      <path
        d="M21 31.5C21 38.4 26.2 44 33 44C36.6 44 39.8 42.4 42 39.8C39.9 40.7 37.5 41 35 40.4C29.6 39.1 26 34.1 26.6 28.6C26.9 26.3 27.8 24.3 29.2 22.7C24.4 24 21 27.4 21 31.5Z"
        stroke="#D4AF37"
        strokeWidth="1.35"
        fill="rgba(212, 175, 55, 0.12)"
      />

      {/* Eight-pointed star at lower focus */}
      <path
        d="M36 28L37.4 33.6L43 35L37.4 36.4L36 42L34.6 36.4L29 35L34.6 33.6L36 28Z"
        fill="#D4AF37"
      />
      <path
        d="M32 31L35.2 34.2L36 35L32.8 38.2L32 35L31.2 34.2L32 31Z"
        fill="#E6C65C"
        fillOpacity="0.45"
      />
      <path
        d="M32 48L33 50.8L35.8 51.8L33 52.8L32 55.6L31 52.8L28.2 51.8L31 50.8L32 48Z"
        stroke="#D4AF37"
        strokeWidth="1"
        fill="rgba(212, 175, 55, 0.2)"
      />
    </svg>
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
