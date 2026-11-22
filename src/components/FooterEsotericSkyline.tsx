import React from 'react';

/**
 * ENN-230 — Footer-scoped mystical silhouette (temple / spires / arcana rooftops).
 * Soft gold-cream line work behind footer content; pointer-events none.
 * Motion is CSS-only; global prefers-reduced-motion already quiets animations.
 */
export function FooterEsotericSkyline() {
  return (
    <div
      className="ti-footer-skyline"
      aria-hidden="true"
      data-enn="230"
    >
      <div className="ti-footer-skyline__veil" />

      {/* Far layer — softer, slower drift */}
      <svg
        className="ti-footer-skyline__layer ti-footer-skyline__layer--far"
        viewBox="0 0 1440 220"
        preserveAspectRatio="xMidYMax meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="ti-footer-skyline__fill"
          d="M0 220V148L48 132l36 28 52-56 28 24 44-72 40 40 36-48 48 56 56-88 44 52 60-76 52 64 48-40 56 48 44-64 52 72 40-32 48 40 36-48 44 56 40-24 52 40V220H0Z"
        />
        <path
          className="ti-footer-skyline__stroke ti-footer-skyline__stroke--soft"
          d="M0 148L48 132l36 28 52-56 28 24 44-72 40 40 36-48 48 56 56-88 44 52 60-76 52 64 48-40 56 48 44-64 52 72 40-32 48 40 36-48 44 56 40-24 52 40"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Distant crescent + faint tower tips */}
        <path
          className="ti-footer-skyline__accent"
          d="M312 78a10 10 0 0 0 0 16 8 8 0 1 1 0-16Z"
        />
        <path
          className="ti-footer-skyline__accent"
          d="M1088 86a9 9 0 0 1 0 14 7 7 0 1 0 0-14Z"
        />
      </svg>

      {/* Near layer — temple / spires / arcana rooftops */}
      <svg
        className="ti-footer-skyline__layer ti-footer-skyline__layer--near"
        viewBox="0 0 1440 200"
        preserveAspectRatio="xMidYMax meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="ti-footer-skyline__fill ti-footer-skyline__fill--near"
          d="M0 200V156l64-20 40 28 72-48 48 36 56-64 28 20 36-44 24 28 40-72 20 16 16-28 20 36 48-80 24 20v-24l12-16 12 16v28l28-12 16 24 56-96 20 16 28-48 20 32 36-20 48 56 40-36 32 28 56-72 24 20 44-52 36 44 48-28 40 36 56-48 32 24 48-36 40 44 72-24V200H0Z"
        />
        <path
          className="ti-footer-skyline__stroke"
          d="M0 156l64-20 40 28 72-48 48 36 56-64 28 20 36-44 24 28 40-72 20 16 16-28 20 36 48-80 24 20v-24l12-16 12 16v28l28-12 16 24 56-96 20 16 28-48 20 32 36-20 48 56 40-36 32 28 56-72 24 20 44-52 36 44 48-28 40 36 56-48 32 24 48-36 40 44 72-24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central temple detail — arched openings + oculus */}
        <g className="ti-footer-skyline__detail">
          <circle className="ti-footer-skyline__sigil" cx="720" cy="78" r="5.5" />
          <path d="M708 98h24" />
          <path d="M704 118c0-10 7-16 16-16s16 6 16 16v22h-32v-22Z" />
          <path d="M712 140v18M728 140v18" />
          {/* Twin Tower-like spires */}
          <path d="M596 108l10-42 10 42" />
          <path d="M590 108h32" />
          <path d="M824 108l10-42 10 42" />
          <path d="M818 108h32" />
          {/* Side chapel arches */}
          <path d="M456 148c0-12 8-20 16-20s16 8 16 20" />
          <path d="M968 148c0-12 8-20 16-20s16 8 16 20" />
          {/* Subtle star above central oculus */}
          <path
            className="ti-footer-skyline__sigil"
            d="M720 52l1.6 4.4H726l-3.6 2.8 1.4 4.4L720 61l-3.8 2.6 1.4-4.4-3.6-2.8h4.4Z"
          />
        </g>

        {/* Soft ground haze line */}
        <path
          className="ti-footer-skyline__horizon"
          d="M0 188c120-10 240-16 360-12 140 5 280 18 420 12 160-7 320-22 460-10 80 5 140 12 200 18"
        />
      </svg>

      <div className="ti-footer-skyline__shimmer" />
    </div>
  );
}
