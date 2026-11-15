import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { clientTestimonials } from '../data/siteContent';
import { CopyText } from './CopyText';

const ROTATE_MS = 6000;

type Props = {
  showCmsKeys: boolean;
};

/**
 * Horizontal auto-rotating testimonials loop for the Home page.
 */
export function HomeTestimonialsCarousel({ showCmsKeys }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = clientTestimonials.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [count, paused]);

  const goTo = (next: number) => {
    setIndex(((next % count) + count) % count);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className="overflow-hidden rounded-2xl border border-[#D4AF37]/25 glass-tier-1"
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonianze clienti"
        aria-live="polite"
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {clientTestimonials.map((item, i) => (
            <figure
              key={item.id}
              className="w-full shrink-0 px-6 py-7 md:px-10 md:py-9"
              aria-hidden={i !== index}
            >
              <div className="mx-auto flex max-w-3xl flex-col gap-6 md:flex-row md:items-stretch md:gap-10">
                <div className="flex flex-1 flex-col justify-between gap-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                        {item.sessionContext}
                      </span>
                      <Quote
                        className="h-4 w-4 shrink-0 text-[#D4AF37]/60"
                        aria-hidden="true"
                      />
                    </div>
                    <blockquote className="text-sm leading-relaxed text-[#E8e1dd] md:text-[15px] md:leading-relaxed">
                      &ldquo;
                      {showCmsKeys ? (
                        <CopyText
                          entry={{ cmsKey: item.cmsKeyQuote, liveText: item.quote }}
                          showKeys={true}
                        />
                      ) : (
                        item.quote
                      )}
                      &rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="border-t border-[#D4AF37]/15 pt-4">
                    <p className="font-display text-sm text-[#F4F1EA]">
                      {item.authorName}
                    </p>
                    <p className="mt-0.5 text-xs text-[#A39B93]">{item.authorRole}</p>
                  </figcaption>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {clientTestimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Vai alla testimonianza ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  i === index
                    ? 'w-5 bg-[#D4AF37]'
                    : 'w-1.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/55'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Testimonianza precedente"
              onClick={() => goTo(index - 1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/25 text-[#A39B93] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Testimonianza successiva"
              onClick={() => goTo(index + 1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/25 text-[#A39B93] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="ml-1 hidden text-[11px] tabular-nums text-[#A39B93] sm:inline">
              {index + 1} / {count}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
