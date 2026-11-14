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

/**
 * Sfondo ambientale vibrante ma discreto (compositor-only transform & opacity):
 * - Due aure dorate che respirano lentamente
 * - Anelli astrolabici controrotanti a bassa opacità
 * - Pulviscolo dorato ascendente (disattivato automaticamente con prefers-reduced-motion)
 */
export function AmbientSanctuaryBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Top-center primary breathing gold aura */}
      <div
        className="animate-aura-breath absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.16) 0%, rgba(212, 175, 55, 0.04) 48%, transparent 74%)',
        }}
      />

      {/* Lower-right secondary lunar/amber aura */}
      <div
        className="animate-aura-breath-reverse absolute -bottom-40 -right-24 w-[720px] h-[540px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(230, 198, 92, 0.11) 0%, rgba(212, 175, 55, 0.03) 50%, transparent 74%)',
        }}
      />

      {/* Counter-rotating astrolabe geometry behind hero */}
      <div className="absolute top-[-140px] right-[-180px] md:right-[-80px] w-[620px] h-[620px] opacity-[0.07]">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full animate-orbit-cw">
          <circle cx="200" cy="200" r="185" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="142" stroke="#E6C65C" strokeWidth="0.8" />
          <line x1="200" y1="10" x2="200" y2="390" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.5" />
          <line x1="10" y1="200" x2="390" y2="200" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.5" />
        </svg>
      </div>

      <div className="absolute top-[-110px] right-[-150px] md:right-[-50px] w-[560px] h-[560px] opacity-[0.06]">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full animate-orbit-ccw">
          <circle cx="200" cy="200" r="165" stroke="#D4AF37" strokeWidth="0.9" strokeDasharray="2 10" />
          <polygon
            points="200,45 334,277 66,277"
            stroke="#D4AF37"
            strokeWidth="0.7"
            strokeOpacity="0.6"
          />
          <polygon
            points="200,355 334,123 66,123"
            stroke="#D4AF37"
            strokeWidth="0.7"
            strokeOpacity="0.6"
          />
        </svg>
      </div>

      {/* Subtle floating golden dust motes */}
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
