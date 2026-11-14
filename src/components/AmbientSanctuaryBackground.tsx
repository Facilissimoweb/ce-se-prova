import React from 'react';

const DUST_MOTES = [
  { left: '8%', top: '24%', size: 2.5, duration: '11s', delay: '0s' },
  { left: '16%', top: '68%', size: 2, duration: '14s', delay: '-3s' },
  { left: '25%', top: '42%', size: 1.5, duration: '12s', delay: '-6s' },
  { left: '34%', top: '80%', size: 2, duration: '15s', delay: '-2s' },
  { left: '46%', top: '30%', size: 2.5, duration: '13s', delay: '-7s' },
  { left: '54%', top: '72%', size: 1.5, duration: '16s', delay: '-4s' },
  { left: '63%', top: '20%', size: 2, duration: '11.5s', delay: '-5s' },
  { left: '72%', top: '58%', size: 2.5, duration: '14.5s', delay: '-8s' },
  { left: '81%', top: '36%', size: 1.5, duration: '12.5s', delay: '-1s' },
  { left: '90%', top: '74%', size: 2, duration: '15.5s', delay: '-9s' },
  { left: '94%', top: '22%', size: 2, duration: '13.5s', delay: '-4.5s' },
  { left: '41%', top: '55%', size: 1.5, duration: '17s', delay: '-10s' },
];

const STAR_SIGILS = [
  { left: '10%', top: '16%', size: 18, duration: '5.5s', delay: '0s' },
  { left: '86%', top: '14%', size: 22, duration: '6.8s', delay: '-2s' },
  { left: '18%', top: '76%', size: 16, duration: '6.2s', delay: '-1.5s' },
  { left: '78%', top: '78%', size: 20, duration: '7.4s', delay: '-3.5s' },
  { left: '52%', top: '12%', size: 14, duration: '5.8s', delay: '-2.6s' },
];

/**
 * Motivi esoterici animati nel fondale (compositor-only transform & opacity):
 * - Ruota Zodiacale / Astrolabio a 12 raggi con fasi lunari orbitanti
 * - Fiore della Vita (geometria sacra a 6 petali) e stelle a 8 punte pulsanti
 * - Sigillo alchemico (triangoli contrapposti + costellazioni geometriche)
 * - Aure dorate e pulviscolo ascendente (rispetta prefers-reduced-motion)
 */
export function AmbientSanctuaryBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Top-center primary breathing gold aura */}
      <div
        className="animate-aura-breath absolute -top-32 left-1/2 -translate-x-1/2 w-[920px] h-[540px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.16) 0%, rgba(212, 175, 55, 0.04) 48%, transparent 74%)',
        }}
      />

      {/* Lower-left & lower-right secondary esoteric glows */}
      <div
        className="animate-aura-breath-reverse absolute -bottom-44 -right-24 w-[740px] h-[560px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(230, 198, 92, 0.11) 0%, rgba(212, 175, 55, 0.03) 50%, transparent 74%)',
        }}
      />

      {/* 1. Ruota Astrologica / Astrolabio a 12 Raggi + Fasi Lunari (Alto Destra) */}
      <div className="absolute -top-28 -right-32 md:-top-24 md:-right-20 w-[520px] h-[520px] md:w-[680px] md:h-[680px] opacity-[0.12]">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full animate-orbit-cw">
          <circle cx="200" cy="200" r="190" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 7" />
          <circle cx="200" cy="200" r="168" stroke="#E6C65C" strokeWidth="0.9" />
          <circle cx="200" cy="200" r="136" stroke="#D4AF37" strokeWidth="0.7" strokeDasharray="2 5" />
          {/* 12 Zodiacal divisions */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 200 + Math.cos(angle) * 136;
            const y1 = 200 + Math.sin(angle) * 136;
            const x2 = 200 + Math.cos(angle) * 190;
            const y2 = 200 + Math.sin(angle) * 190;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#D4AF37"
                strokeWidth={i % 3 === 0 ? '1.1' : '0.6'}
                strokeOpacity={i % 3 === 0 ? '0.8' : '0.45'}
              />
            );
          })}
          {/* Cardinal lunar phases */}
          <circle cx="200" cy="22" r="7" fill="#D4AF37" fillOpacity="0.4" stroke="#E6C65C" strokeWidth="0.9" />
          <circle cx="200" cy="378" r="7" stroke="#D4AF37" strokeWidth="0.9" />
          <path d="M378 193 A7 7 0 0 1 378 207 A5 7 0 0 0 378 193 Z" fill="#E6C65C" fillOpacity="0.65" />
          <path d="M22 193 A7 7 0 0 0 22 207 A5 7 0 0 1 22 193 Z" fill="#E6C65C" fillOpacity="0.65" />
        </svg>
      </div>

      {/* 2. Fiore della Vita & Esagramma Sacro controrotante (Alto Destra concentrico) */}
      <div className="absolute -top-12 -right-16 md:-top-8 md:-right-4 w-[390px] h-[390px] md:w-[540px] md:h-[540px] animate-mandala-pulse">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full animate-orbit-ccw">
          <circle cx="200" cy="200" r="110" stroke="#D4AF37" strokeWidth="0.9" />
          <circle cx="200" cy="200" r="55" stroke="#E6C65C" strokeWidth="0.9" />
          {/* 6 overlapping Seed-of-Life circles */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const cx = 200 + Math.cos(angle) * 55;
            const cy = 200 + Math.sin(angle) * 55;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="55"
                stroke="#D4AF37"
                strokeWidth="0.8"
                strokeOpacity="0.7"
              />
            );
          })}
          {/* Opposing alchemical triangles */}
          <polygon
            points="200,82 302,259 98,259"
            stroke="#E6C65C"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
          <polygon
            points="200,318 302,141 98,141"
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
        </svg>
      </div>

      {/* 3. Sigillo Alchemico & Geometria Lunare (Basso Sinistra) */}
      <div className="absolute -bottom-24 -left-24 md:-bottom-20 md:-left-12 w-[400px] h-[400px] md:w-[520px] md:h-[520px] animate-esoteric-drift">
        <svg viewBox="0 0 360 360" fill="none" className="w-full h-full animate-orbit-cw">
          <circle cx="180" cy="180" r="158" stroke="#D4AF37" strokeWidth="0.9" strokeDasharray="6 6" />
          <circle cx="180" cy="180" r="118" stroke="#E6C65C" strokeWidth="0.8" />
          <rect
            x="96"
            y="96"
            width="168"
            height="168"
            stroke="#D4AF37"
            strokeWidth="0.75"
            strokeOpacity="0.65"
          />
          <rect
            x="96"
            y="96"
            width="168"
            height="168"
            transform="rotate(45 180 180)"
            stroke="#E6C65C"
            strokeWidth="0.75"
            strokeOpacity="0.55"
          />
          {/* Inner 8-pointed star */}
          <path
            d="M180 124 L191 169 L236 180 L191 191 L180 236 L169 191 L124 180 L169 169 Z"
            stroke="#E6C65C"
            strokeWidth="1"
            fill="rgba(212, 175, 55, 0.08)"
          />
        </svg>
      </div>

      {/* 4. Costellazione Sottile & Linee Celesti (Sinistra / Centro) */}
      <svg
        viewBox="0 0 1200 800"
        fill="none"
        className="hidden md:block absolute inset-0 w-full h-full opacity-[0.09]"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M120 140 L245 210 L195 360 L340 430"
          stroke="#D4AF37"
          strokeWidth="0.9"
          strokeDasharray="3 6"
        />
        <path
          d="M910 520 L1020 440 L1110 580 L970 670 Z"
          stroke="#E6C65C"
          strokeWidth="0.8"
          strokeDasharray="2 5"
        />
        <circle cx="120" cy="140" r="3" fill="#E6C65C" />
        <circle cx="245" cy="210" r="2.5" fill="#D4AF37" />
        <circle cx="195" cy="360" r="3" fill="#E6C65C" />
        <circle cx="340" cy="430" r="2" fill="#D4AF37" />
        <circle cx="910" cy="520" r="2.5" fill="#D4AF37" />
        <circle cx="1020" cy="440" r="3" fill="#E6C65C" />
        <circle cx="1110" cy="580" r="2" fill="#D4AF37" />
        <circle cx="970" cy="670" r="2.5" fill="#E6C65C" />
      </svg>

      {/* 5. Stelle Tarot a Otto Punte Scintillanti */}
      {STAR_SIGILS.map((star, idx) => (
        <svg
          key={idx}
          viewBox="0 0 32 32"
          fill="none"
          className="animate-star-twinkle absolute"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        >
          <path
            d="M16 2 L18.4 13.6 L30 16 L18.4 18.4 L16 30 L13.6 18.4 L2 16 L13.6 13.6 Z"
            fill="#D4AF37"
            fillOpacity="0.45"
          />
        </svg>
      ))}

      {/* 6. Pulviscolo dorato ascendente */}
      {DUST_MOTES.map((mote, idx) => (
        <span
          key={idx}
          className="animate-float-mote absolute rounded-full bg-[#E6C65C]"
          style={{
            left: mote.left,
            top: mote.top,
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            boxShadow: '0 0 8px rgba(230, 198, 92, 0.55)',
            animationDuration: mote.duration,
            animationDelay: mote.delay,
          }}
        />
      ))}
    </div>
  );
}
