import React from 'react';

interface MajorArcanaArtworkProps {
  number: number;
  numeral: string;
  name: string;
  className?: string;
  compact?: boolean;
}

/**
 * Tavola unificata per tutti i 22 Arcani Maggiori (0–XXI)
 * Stile uniforme in lamina d'oro incisa (#D4AF37 / #E6C65C) su pergamena ossidiana (#12100E).
 */
export function MajorArcanaArtwork({
  number,
  numeral,
  name,
  className = '',
  compact = false,
}: MajorArcanaArtworkProps) {
  const gradId = `goldPlate-${number}`;
  const glowId = `arcanaGlow-${number}`;

  return (
    <svg
      viewBox="0 0 220 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Arcano Maggiore ${numeral} ${name}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="220" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.88" />
          <stop offset="50%" stopColor="#E6C65C" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.88" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="48%" r="46%">
          <stop offset="0%" stopColor="#E6C65C" stopOpacity="0.26" />
          <stop offset="55%" stopColor="#D4AF37" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#12100E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base obsidian parchment */}
      <rect x="2" y="2" width="216" height="336" rx="14" fill="#12100E" stroke={`url(#${gradId})`} strokeWidth="1.6" />
      <rect x="11" y="11" width="198" height="318" rx="10" stroke="#D4AF37" strokeOpacity="0.32" strokeWidth="1" />

      {/* Filigree corner diamonds */}
      <polygon points="18,18 23,23 18,28 13,23" stroke="#D4AF37" strokeOpacity="0.55" strokeWidth="0.9" fill="#151311" />
      <polygon points="202,18 207,23 202,28 197,23" stroke="#D4AF37" strokeOpacity="0.55" strokeWidth="0.9" fill="#151311" />
      <polygon points="18,312 23,317 18,322 13,317" stroke="#D4AF37" strokeOpacity="0.55" strokeWidth="0.9" fill="#151311" />
      <polygon points="202,312 207,317 202,322 197,317" stroke="#D4AF37" strokeOpacity="0.55" strokeWidth="0.9" fill="#151311" />

      {/* Subtle ambient glow */}
      <circle cx="110" cy="166" r="88" fill={`url(#${glowId})`} />

      {/* Top arch & Roman numeral */}
      <path d="M36 52 C36 28, 184 28, 184 52" stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="1" />
      <line x1="36" y1="52" x2="184" y2="52" stroke="#D4AF37" strokeOpacity="0.22" strokeWidth="0.8" />
      <text
        x="110"
        y="44"
        textAnchor="middle"
        fill="#E6C65C"
        fontSize={compact ? '18' : '15'}
        letterSpacing="3"
        fontFamily="Cinzel, Georgia, serif"
      >
        {numeral}
      </text>

      {/* Celestial field dots */}
      <circle cx="42" cy="84" r="1.2" fill="#D4AF37" fillOpacity="0.6" />
      <circle cx="178" cy="84" r="1.2" fill="#D4AF37" fillOpacity="0.6" />
      <circle cx="52" cy="248" r="1" fill="#F4F1EA" fillOpacity="0.35" />
      <circle cx="168" cy="248" r="1" fill="#F4F1EA" fillOpacity="0.35" />

      {/* Unique sacred engraving for each of the 22 Major Arcana */}
      {renderArcanaScene(number)}

      {/* Bottom title plate */}
      <line x1="28" y1="288" x2="192" y2="288" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1" />
      <text
        x="110"
        y="311"
        textAnchor="middle"
        fill="#F4F1EA"
        fontSize={name.length > 18 ? '10.5' : name.length > 14 ? '11.5' : '12.5'}
        letterSpacing="2"
        fontFamily="Cinzel, Georgia, serif"
      >
        {name.toUpperCase()}
      </text>
    </svg>
  );
}

function renderArcanaScene(num: number): React.ReactNode {
  switch (num) {
    case 0: // Il Matto
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Sun upper right */}
          <circle cx="164" cy="92" r="11" fill="rgba(212,175,55,0.12)" />
          <path d="M164 73V77M164 107V111M145 92H149M179 92H183M151 79L154 82M174 102L177 105M177 79L174 82M154 102L151 105" />
          {/* Cliff */}
          <path d="M28 240 L108 228 L122 268 L28 268" fill="#1A1615" />
          <path d="M122 254 Q158 242 192 262" strokeOpacity="0.4" />
          {/* Pilgrim figure & staff */}
          <circle cx="96" cy="116" r="11" fill="#151311" />
          <path d="M84 128 L108 130 L114 190 L80 190 Z" fill="#1A1615" />
          <path d="M86 190 L76 230 M106 190 L114 224" />
          {/* Staff & bundle */}
          <path d="M62 104 L132 152" stroke="#E6C65C" />
          <circle cx="62" cy="112" r="8" fill="#151311" />
          {/* White rose in hand */}
          <circle cx="130" cy="148" r="5" fill="rgba(244,241,234,0.2)" stroke="#F4F1EA" />
        </g>
      );

    case 1: // Il Bagatto
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Lemniscate infinity */}
          <path d="M88 86 C88 76, 104 76, 110 86 C116 96, 132 96, 132 86 C132 76, 116 76, 110 86 C104 96, 88 96, 88 86 Z" stroke="#E6C65C" />
          {/* Magician */}
          <circle cx="110" cy="116" r="10" fill="#151311" />
          <path d="M92 130 L128 130 L132 198 L88 198 Z" fill="#1A1615" />
          {/* One hand raised with wand, one pointing down */}
          <path d="M92 134 L68 106 M128 134 L148 164" />
          <line x1="64" y1="96" x2="72" y2="112" stroke="#E6C65C" strokeWidth="1.8" />
          {/* Altar table & 4 elements */}
          <rect x="44" y="204" width="132" height="10" fill="#1A1615" />
          <path d="M56 214 V264 M164 214 V264" />
          {/* Cup, Sword, Pentacle, Wand */}
          <path d="M64 192 Q70 202 76 192 Z" fill="rgba(212,175,55,0.2)" />
          <path d="M96 184 V202 M92 196 H100" />
          <circle cx="126" cy="194" r="6" fill="rgba(212,175,55,0.16)" />
          <line x1="150" y1="184" x2="154" y2="202" />
        </g>
      );

    case 2: // La Papessa
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Pillars B & J */}
          <rect x="38" y="88" width="22" height="174" fill="#1A1615" />
          <rect x="160" y="88" width="22" height="174" fill="#1A1615" />
          <text x="49" y="182" textAnchor="middle" fill="#D4AF37" stroke="none" fontSize="13" fontFamily="Cinzel, serif">B</text>
          <text x="171" y="182" textAnchor="middle" fill="#D4AF37" stroke="none" fontSize="13" fontFamily="Cinzel, serif">J</text>
          {/* Veil */}
          <path d="M60 98 Q110 112 160 98" strokeOpacity="0.45" />
          {/* Lunar crown */}
          <path d="M94 94 A16 16 0 0 0 126 94" stroke="#E6C65C" />
          <circle cx="110" cy="96" r="7" fill="rgba(212,175,55,0.2)" />
          {/* Priestess silhouette & scroll */}
          <circle cx="110" cy="124" r="10" fill="#151311" />
          <path d="M84 138 L136 138 L146 254 L74 254 Z" fill="#1A1615" />
          <rect x="96" y="168" width="28" height="36" rx="3" fill="#12100E" />
          <line x1="102" y1="178" x2="118" y2="178" strokeOpacity="0.6" />
          <line x1="102" y1="186" x2="118" y2="186" strokeOpacity="0.6" />
          {/* Crescent at feet */}
          <path d="M92 252 Q110 266 128 252" stroke="#E6C65C" />
        </g>
      );

    case 3: // L'Imperatrice
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Crown of 12 stars */}
          <path d="M74 96 Q110 74 146 96" strokeOpacity="0.45" />
          <circle cx="84" cy="88" r="2" fill="#E6C65C" />
          <circle cx="110" cy="78" r="2.4" fill="#E6C65C" />
          <circle cx="136" cy="88" r="2" fill="#E6C65C" />
          {/* Empress figure */}
          <circle cx="110" cy="116" r="11" fill="#151311" />
          <path d="M76 134 C94 128, 126 128, 144 134 L156 236 L64 236 Z" fill="#1A1615" />
          {/* Scepter */}
          <line x1="146" y1="112" x2="150" y2="196" stroke="#E6C65C" />
          <circle cx="146" cy="108" r="5" fill="rgba(212,175,55,0.22)" />
          {/* Venus shield */}
          <path d="M90 194 H130 L124 234 Q110 246 96 234 Z" fill="#12100E" />
          <circle cx="110" cy="210" r="6" />
          <path d="M110 216 V228 M104 222 H116" />
          {/* Wheat */}
          <path d="M44 260 Q54 232 48 206 M58 260 Q66 234 62 212 M176 260 Q166 232 172 206" strokeOpacity="0.55" />
        </g>
      );

    case 4: // L'Imperatore
      return (
        <g stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Stone throne */}
          <rect x="64" y="102" width="92" height="156" rx="4" fill="#151311" />
          <path d="M52 210 H168 V262 H52 Z" fill="#1A1615" />
          {/* Crown */}
          <path d="M92 98 L98 84 L110 92 L122 84 L128 98 Z" fill="rgba(212,175,55,0.22)" />
          <circle cx="110" cy="116" r="11" fill="#12100E" />
          <path d="M84 132 H136 L140 210 H80 Z" fill="#1D1B19" />
          {/* Ankh scepter & Orb */}
          <line x1="148" y1="120" x2="148" y2="196" stroke="#E6C65C" />
          <circle cx="148" cy="112" r="7" />
          <path d="M140 124 H156" />
          <circle cx="72" cy="176" r="10" fill="rgba(212,175,55,0.2)" />
          {/* Ram emblems */}
          <path d="M62 114 C52 106, 54 126, 64 124 M158 114 C168 106, 166 126, 156 124" strokeOpacity="0.7" />
        </g>
      );

    case 5: // Il Papa
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Twin pillars */}
          <rect x="38" y="92" width="16" height="168" fill="#1A1615" strokeOpacity="0.6" />
          <rect x="166" y="92" width="16" height="168" fill="#1A1615" strokeOpacity="0.6" />
          {/* Triple crown */}
          <path d="M96 98 H124 M99 88 H121 M103 78 H117 M110 72 V98" stroke="#E6C65C" />
          <circle cx="110" cy="116" r="10" fill="#151311" />
          <path d="M84 132 H136 L142 222 H78 Z" fill="#1A1615" />
          {/* Triple papal cross */}
          <path d="M74 94 V210 M66 106 H82 M63 118 H85 M68 130 H80" stroke="#E6C65C" />
          {/* Crossed keys below */}
          <path d="M90 258 L130 226 M130 258 L90 226" stroke="#E6C65C" strokeWidth="1.6" />
          <circle cx="90" cy="258" r="6" fill="#12100E" />
          <circle cx="130" cy="258" r="6" fill="#12100E" />
        </g>
      );

    case 6: // Gli Amanti
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Solar angel aura */}
          <circle cx="110" cy="100" r="18" fill="rgba(230,198,92,0.16)" stroke="#E6C65C" />
          <path d="M52 104 Q82 86 110 100 Q138 86 168 104" strokeOpacity="0.7" />
          <path d="M110 118 L86 144 M110 118 L110 148 M110 118 L134 144" strokeOpacity="0.5" />
          {/* Twin figures */}
          <circle cx="78" cy="176" r="9" fill="#151311" />
          <path d="M64 190 L92 190 L96 254 L60 254 Z" fill="#1A1615" />
          <circle cx="142" cy="176" r="9" fill="#151311" />
          <path d="M128 190 L156 190 L160 254 L124 254 Z" fill="#1A1615" />
          {/* Sacred union flame between them */}
          <path d="M110 184 C118 198, 118 214, 110 224 C102 214, 102 198, 110 184 Z" fill="rgba(212,175,55,0.28)" stroke="#E6C65C" />
        </g>
      );

    case 7: // Il Carro
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Star canopy */}
          <path d="M56 96 H164 V116 H56 Z" fill="#1A1615" />
          <path d="M62 116 V210 M158 116 V210" strokeOpacity="0.6" />
          {/* Charioteer */}
          <circle cx="110" cy="134" r="10" fill="#151311" />
          <path d="M88 148 H132 L134 192 H86 Z" fill="#1A1615" />
          {/* Chariot body & winged solar emblem */}
          <rect x="66" y="192" width="88" height="44" fill="#12100E" />
          <circle cx="110" cy="214" r="8" fill="rgba(212,175,55,0.22)" />
          <path d="M84 214 H100 M120 214 H136" />
          {/* Wheels */}
          <circle cx="52" cy="230" r="16" fill="#151311" />
          <circle cx="168" cy="230" r="16" fill="#151311" />
          <path d="M52 214 V246 M36 230 H68 M168 214 V246 M152 230 H184" strokeOpacity="0.5" />
          {/* Opposing crescents */}
          <path d="M76 254 A10 10 0 0 1 92 254" />
          <path d="M128 254 A10 10 0 0 0 144 254" fill="rgba(212,175,55,0.2)" />
        </g>
      );

    case 8: // La Giustizia
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Pillars */}
          <path d="M48 92 V260 M172 92 V260" strokeOpacity="0.4" />
          {/* Crown */}
          <path d="M96 96 H124 L120 84 L110 90 L100 84 Z" fill="rgba(212,175,55,0.2)" />
          <circle cx="110" cy="114" r="10" fill="#151311" />
          <path d="M84 130 H136 L142 246 H78 Z" fill="#1A1615" />
          {/* Upright Sword (left) */}
          <line x1="66" y1="88" x2="66" y2="198" stroke="#E6C65C" strokeWidth="1.8" />
          <line x1="56" y1="180" x2="76" y2="180" stroke="#E6C65C" />
          {/* Balanced Scales (right) */}
          <line x1="132" y1="146" x2="176" y2="146" stroke="#E6C65C" />
          <line x1="154" y1="136" x2="154" y2="146" />
          <path d="M132 146 L124 176 H140 Z M176 146 L168 176 H184 Z" strokeOpacity="0.65" />
          <path d="M122 176 Q132 186 142 176 Z M166 176 Q176 186 186 176 Z" fill="rgba(212,175,55,0.24)" />
        </g>
      );

    case 9: // L'Eremita
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Mountain ridge */}
          <path d="M26 262 L68 220 L98 244 L142 206 L194 262" strokeOpacity="0.38" fill="rgba(212,175,55,0.04)" />
          {/* Pilgrim staff */}
          <path d="M74 114 L66 264" strokeWidth="1.7" />
          <circle cx="74" cy="110" r="3.5" fill="#12100E" />
          {/* Cloaked hermit */}
          <path
            d="M96 92 C110 86, 122 96, 120 114 C118 124, 112 128, 108 134 C122 154, 126 204, 124 264 L78 264 C76 212, 82 160, 88 134 C82 120, 82 98, 96 92 Z"
            fill="#1A1615"
          />
          <path d="M95 94 C88 106, 92 122, 106 128" strokeOpacity="0.6" />
          <path d="M114 140 L138 124" />
          {/* Lantern with 6-pointed star */}
          <line x1="138" y1="124" x2="138" y2="132" />
          <polygon points="138,132 148,140 146,160 130,160 128,140" fill="rgba(230,198,92,0.18)" stroke="#E6C65C" />
          <polygon points="138,139 143,149 133,149" stroke="#F4F1EA" strokeWidth="0.9" fill="none" />
          <polygon points="138,153 143,143 133,143" stroke="#F4F1EA" strokeWidth="0.9" fill="none" />
        </g>
      );

    case 10: // La Ruota della Fortuna
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Cosmic Wheel */}
          <circle cx="110" cy="168" r="56" fill="#151311" stroke="#E6C65C" strokeWidth="1.6" />
          <circle cx="110" cy="168" r="42" strokeOpacity="0.5" />
          <circle cx="110" cy="168" r="14" fill="rgba(212,175,55,0.22)" />
          {/* 8 Spokes */}
          <path d="M110 112 V224 M54 168 H166 M70 128 L150 208 M150 128 L70 208" strokeOpacity="0.7" />
          {/* Corner winged emblems */}
          <circle cx="44" cy="96" r="10" fill="#1A1615" strokeOpacity="0.65" />
          <circle cx="176" cy="96" r="10" fill="#1A1615" strokeOpacity="0.65" />
          <circle cx="44" cy="248" r="10" fill="#1A1615" strokeOpacity="0.65" />
          <circle cx="176" cy="248" r="10" fill="#1A1615" strokeOpacity="0.65" />
          {/* Top Sphinx */}
          <path d="M96 112 L110 92 L124 112 Z" fill="rgba(212,175,55,0.2)" />
        </g>
      );

    case 11: // La Forza
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Infinity lemniscate */}
          <path d="M88 86 C88 76, 104 76, 110 86 C116 96, 132 96, 132 86 C132 76, 116 76, 110 86 C104 96, 88 96, 88 86 Z" stroke="#E6C65C" />
          {/* Gentle figure */}
          <circle cx="100" cy="118" r="10" fill="#151311" />
          <path d="M78 134 C94 128, 112 132, 122 142 L116 244 L72 244 Z" fill="#1A1615" />
          {/* Lion */}
          <circle cx="142" cy="192" r="24" fill="rgba(212,175,55,0.1)" />
          <circle cx="142" cy="192" r="15" fill="#151311" />
          <path d="M126 214 L120 256 M158 214 L164 256 M166 196 Q182 184 176 218" />
          {/* Gentle hands resting on lion */}
          <path d="M112 152 L134 176 M108 164 L128 188" stroke="#E6C65C" />
        </g>
      );

    case 12: // L'Appeso
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Living Tau beam */}
          <line x1="42" y1="88" x2="178" y2="88" strokeWidth="4" />
          <line x1="56" y1="88" x2="56" y2="262" strokeOpacity="0.45" />
          <line x1="164" y1="88" x2="164" y2="262" strokeOpacity="0.45" />
          {/* Suspended line & crossed legs */}
          <line x1="110" y1="88" x2="110" y2="122" />
          <path d="M110 122 L126 146 L94 160" />
          <path d="M96 146 L124 146 L126 202 L94 202 Z" fill="#1A1615" />
          {/* Inverted head with solar halo */}
          <circle cx="110" cy="220" r="22" fill="rgba(230,198,92,0.16)" strokeOpacity="0.5" />
          <circle cx="110" cy="220" r="10" fill="#12100E" stroke="#E6C65C" />
          <path d="M92 220 H82 M128 220 H138 M110 238 V248" stroke="#E6C65C" strokeOpacity="0.7" />
        </g>
      );

    case 13: // Arcano XIII · Trasformazione
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Dawn horizon & rising sun between towers */}
          <rect x="44" y="138" width="22" height="58" fill="#1A1615" strokeOpacity="0.55" />
          <rect x="154" y="138" width="22" height="58" fill="#1A1615" strokeOpacity="0.55" />
          <path d="M84 196 A26 26 0 0 1 136 196" fill="rgba(230,198,92,0.22)" stroke="#E6C65C" />
          <path d="M28 196 H192" strokeOpacity="0.5" />
          <path d="M110 156 V142 M86 166 L76 156 M134 166 L144 156" stroke="#E6C65C" />
          {/* Curved scythe */}
          <path d="M138 96 L82 258" strokeWidth="1.8" />
          <path d="M138 96 C92 84, 58 106, 52 134 C84 120, 114 114, 138 96 Z" fill="rgba(212,175,55,0.18)" stroke="#E6C65C" />
          {/* Mystic 5-petaled rose */}
          <circle cx="110" cy="236" r="12" fill="#151311" />
          <circle cx="110" cy="236" r="4" fill="#D4AF37" />
        </g>
      );

    case 14: // La Temperanza
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Angel wings */}
          <path d="M110 124 Q64 88 42 128 Q68 144 96 144" fill="rgba(212,175,55,0.08)" />
          <path d="M110 124 Q156 88 178 128 Q152 144 124 144" fill="rgba(212,175,55,0.08)" />
          {/* Figure */}
          <circle cx="110" cy="112" r="10" fill="#151311" />
          <path d="M90 128 H130 L138 232 H82 Z" fill="#1A1615" />
          {/* Two chalices & diagonal luminous stream */}
          <path d="M56 154 H78 L72 172 H62 Z" fill="rgba(212,175,55,0.22)" />
          <path d="M142 192 H164 L158 210 H148 Z" fill="rgba(212,175,55,0.22)" />
          <path d="M74 166 C98 164, 126 184, 148 196" stroke="#E6C65C" strokeWidth="1.8" strokeDasharray="3 2" />
          {/* Water pool */}
          <path d="M40 252 Q110 242 180 252" strokeOpacity="0.6" />
        </g>
      );

    case 15: // Il Diavolo
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Inverted Pentagram */}
          <circle cx="110" cy="116" r="24" strokeOpacity="0.5" />
          <polygon
            points="110,138 96,98 129,122 91,122 124,98"
            stroke="#E6C65C"
            fill="rgba(212,175,55,0.12)"
          />
          {/* Winged pedestal figure */}
          <path d="M110 150 L54 128 L66 178 Z M110 150 L166 128 L154 178 Z" fill="#1A1615" />
          <rect x="82" y="198" width="56" height="22" fill="#151311" />
          {/* Torch & loose chains */}
          <line x1="72" y1="158" x2="72" y2="196" stroke="#E6C65C" />
          <path d="M62 220 Q82 252 110 236 Q138 252 158 220" strokeDasharray="5 3" strokeOpacity="0.8" />
          <circle cx="62" cy="244" r="9" fill="#151311" />
          <circle cx="158" cy="244" r="9" fill="#151311" />
        </g>
      );

    case 16: // La Torre
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Lightning bolt */}
          <path d="M174 74 L126 112 L144 116 L108 152" stroke="#E6C65C" strokeWidth="2.2" />
          {/* Tower */}
          <path d="M78 134 L142 134 L152 262 L68 262 Z" fill="#1A1615" />
          <line x1="76" y1="168" x2="144" y2="168" strokeOpacity="0.4" />
          <line x1="73" y1="204" x2="147" y2="204" strokeOpacity="0.4" />
          {/* Falling crown */}
          <path d="M84 114 L92 100 L106 110 L120 98 L128 114 Z" transform="rotate(-18 106 108)" fill="rgba(212,175,55,0.22)" />
          {/* Sparks */}
          <circle cx="62" cy="146" r="2" fill="#E6C65C" />
          <circle cx="164" cy="158" r="2" fill="#E6C65C" />
          <circle cx="56" cy="196" r="1.5" fill="#D4AF37" />
        </g>
      );

    case 17: // Le Stelle
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Great 8-pointed star */}
          <path
            d="M110 74 L115 97 L138 102 L115 107 L110 130 L105 107 L82 102 L105 97 Z"
            fill="rgba(230,198,92,0.26)"
            stroke="#E6C65C"
          />
          {/* 7 companion stars */}
          <circle cx="58" cy="96" r="2.2" fill="#E6C65C" />
          <circle cx="162" cy="96" r="2.2" fill="#E6C65C" />
          <circle cx="48" cy="126" r="1.8" fill="#D4AF37" />
          <circle cx="172" cy="126" r="1.8" fill="#D4AF37" />
          <circle cx="76" cy="128" r="1.8" fill="#D4AF37" />
          <circle cx="144" cy="128" r="1.8" fill="#D4AF37" />
          <circle cx="110" cy="144" r="1.8" fill="#D4AF37" />
          {/* Kneeling figure & two pouring urns */}
          <circle cx="110" cy="176" r="9" fill="#151311" />
          <path d="M96 190 L124 190 L118 228 L88 228 Z" fill="#1A1615" />
          <circle cx="72" cy="202" r="7" fill="rgba(212,175,55,0.2)" />
          <circle cx="148" cy="202" r="7" fill="rgba(212,175,55,0.2)" />
          <path d="M68 208 Q58 232 54 252 M152 208 Q162 232 166 252" stroke="#E6C65C" />
          {/* Flowing water */}
          <path d="M32 254 Q110 242 188 254" strokeOpacity="0.6" />
        </g>
      );

    case 18: // La Luna
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Radiant Crescent Moon */}
          <circle cx="110" cy="108" r="26" fill="rgba(212,175,55,0.12)" />
          <path
            d="M116 84 C98 86, 88 100, 90 116 C92 130, 106 136, 122 130 C108 130, 102 118, 104 106 C105 96, 110 89, 116 84 Z"
            fill="rgba(230,198,92,0.25)"
            stroke="#E6C65C"
          />
          {/* Twin watchtowers */}
          <rect x="38" y="164" width="26" height="72" fill="#1A1615" />
          <rect x="156" y="164" width="26" height="72" fill="#1A1615" />
          {/* Winding path & water pool */}
          <path d="M110 258 C92 232, 128 214, 110 186" stroke="#E6C65C" strokeOpacity="0.7" />
          <path d="M32 258 Q110 246 188 258" strokeOpacity="0.55" />
          {/* Lunar drops */}
          <circle cx="94" cy="148" r="1.8" fill="#E6C65C" />
          <circle cx="110" cy="154" r="1.8" fill="#E6C65C" />
          <circle cx="126" cy="148" r="1.8" fill="#E6C65C" />
        </g>
      );

    case 19: // Il Sole
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Great Sun */}
          <circle cx="110" cy="126" r="28" fill="rgba(230,198,92,0.24)" stroke="#E6C65C" strokeWidth="1.6" />
          <path d="M110 78 V92 M110 160 V174 M62 126 H76 M144 126 H158 M76 92 L86 102 M134 150 L144 160 M144 92 L134 102 M86 150 L76 160" stroke="#E6C65C" />
          <path d="M90 78 L98 94 M130 78 L122 94 M62 106 L78 114 M158 106 L142 114" strokeOpacity="0.55" />
          {/* Garden wall */}
          <rect x="38" y="218" width="144" height="40" fill="#1A1615" />
          {/* Sunflowers */}
          <circle cx="62" cy="196" r="10" fill="rgba(212,175,55,0.22)" />
          <line x1="62" y1="206" x2="62" y2="218" />
          <circle cx="158" cy="196" r="10" fill="rgba(212,175,55,0.22)" />
          <line x1="158" y1="206" x2="158" y2="218" />
          <circle cx="110" cy="194" r="11" fill="rgba(230,198,92,0.24)" />
          <line x1="110" y1="205" x2="110" y2="218" />
        </g>
      );

    case 20: // Il Giudizio
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Angel wings & trumpet */}
          <path d="M54 96 Q88 78 110 96 Q132 78 166 96" strokeOpacity="0.7" />
          <circle cx="110" cy="94" r="10" fill="#151311" />
          <polygon points="110,112 102,150 118,150" fill="rgba(230,198,92,0.24)" stroke="#E6C65C" />
          {/* Banner cross */}
          <rect x="122" y="128" width="22" height="22" fill="#12100E" />
          <path d="M133 132 V146 M126 139 H140" />
          {/* 7 golden awakening rays */}
          <path d="M110 152 L72 204 M110 152 L92 206 M110 152 L110 208 M110 152 L128 206 M110 152 L148 204" strokeOpacity="0.6" />
          {/* Rising figure with open arms */}
          <circle cx="110" cy="218" r="8" fill="#151311" />
          <path d="M84 214 L110 230 L136 214 M110 230 V260" stroke="#E6C65C" />
          <rect x="76" y="246" width="68" height="16" fill="#1A1615" />
        </g>
      );

    case 21: // Il Mondo
    default:
      return (
        <g stroke="#D4AF37" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Oval Laurel Wreath */}
          <ellipse cx="110" cy="170" rx="50" ry="72" fill="rgba(212,175,55,0.06)" stroke="#E6C65C" strokeWidth="1.8" />
          <ellipse cx="110" cy="170" rx="44" ry="66" strokeOpacity="0.35" strokeDasharray="4 3" />
          {/* Infinity ribbons top & bottom */}
          <path d="M94 94 Q110 84 126 94 Q110 104 94 94 Z" fill="rgba(212,175,55,0.2)" />
          <path d="M94 246 Q110 236 126 246 Q110 256 94 246 Z" fill="rgba(212,175,55,0.2)" />
          {/* Central cosmic dancer */}
          <circle cx="110" cy="134" r="9" fill="#151311" />
          <path d="M92 148 L128 148 L118 192 L102 192 Z" fill="#1A1615" />
          <path d="M76 142 L94 152 M126 152 L144 142 M104 192 L96 222 M116 192 L126 212" />
          {/* 4 corner cosmic stars */}
          <polygon points="44,96 47,104 55,107 47,110 44,118 41,110 33,107 41,104" fill="#D4AF37" />
          <polygon points="176,96 179,104 187,107 179,110 176,118 173,110 165,107 173,104" fill="#D4AF37" />
          <polygon points="44,232 47,240 55,243 47,246 44,254 41,246 33,243 41,240" fill="#D4AF37" />
          <polygon points="176,232 179,240 187,243 179,246 176,254 173,246 165,243 173,240" fill="#D4AF37" />
        </g>
      );
  }
}
