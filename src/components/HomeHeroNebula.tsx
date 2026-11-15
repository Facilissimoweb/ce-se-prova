import React from 'react';

/**
 * Soft green / gold / purple nebula for the Home opening hero only.
 * Full-bleed across the hero / first viewport (edge-to-edge), behind logo & copy.
 * Compositor-friendly: radial gradients + transform/opacity (no heavy filters).
 * AmbientSanctuaryBackground remains sitewide.
 */
const STAR_MOTES = [
  { left: '6%', top: '18%', size: 1.5, duration: '4.8s', delay: '0s' },
  { left: '18%', top: '42%', size: 2, duration: '5.6s', delay: '-1.2s' },
  { left: '28%', top: '12%', size: 1.5, duration: '6.2s', delay: '-2.4s' },
  { left: '38%', top: '68%', size: 2, duration: '5.1s', delay: '-0.8s' },
  { left: '48%', top: '22%', size: 1.5, duration: '7s', delay: '-3.1s' },
  { left: '58%', top: '58%', size: 1.5, duration: '5.4s', delay: '-1.8s' },
  { left: '68%', top: '16%', size: 2, duration: '6.8s', delay: '-4s' },
  { left: '78%', top: '48%', size: 1.5, duration: '4.4s', delay: '-2.1s' },
  { left: '88%', top: '28%', size: 2, duration: '5.8s', delay: '-3.6s' },
  { left: '94%', top: '62%', size: 1.5, duration: '6.4s', delay: '-1.4s' },
  { left: '12%', top: '72%', size: 1.5, duration: '5.2s', delay: '-2.8s' },
  { left: '82%', top: '78%', size: 2, duration: '7.2s', delay: '-0.6s' },
] as const;

export function HomeHeroNebula() {
  return (
    <div className="home-hero-nebula" aria-hidden="true">
      <div className="home-hero-nebula__veil" />

      <div className="home-hero-nebula__cloud home-hero-nebula__cloud--gold" />
      <div className="home-hero-nebula__cloud home-hero-nebula__cloud--purple" />
      <div className="home-hero-nebula__cloud home-hero-nebula__cloud--green" />
      <div className="home-hero-nebula__cloud home-hero-nebula__cloud--gold-soft" />
      <div className="home-hero-nebula__cloud home-hero-nebula__cloud--purple-soft" />
      <div className="home-hero-nebula__cloud home-hero-nebula__cloud--green-wide" />
      <div className="home-hero-nebula__cloud home-hero-nebula__cloud--gold-edge" />

      <div className="home-hero-nebula__haze" />
      <div className="home-hero-nebula__band" />

      {STAR_MOTES.map((star, idx) => (
        <span
          key={idx}
          className="home-hero-nebula__star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
