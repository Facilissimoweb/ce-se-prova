import React, { useEffect, useState } from 'react';
import { ArrowRight, Newspaper } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import {
  fetchNewsArticles,
  formatArticleDate,
  SUBSTACK_HOME_URL,
  type SubstackArticle,
} from '../lib/substackFeed';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

const ROTATE_MS = 5500;

export function HomeArticlesLoop({ onNavigate }: Props) {
  const [articles, setArticles] = useState<SubstackArticle[]>([]);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty' | 'error'>(
    'loading'
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchNewsArticles(controller.signal)
      .then((data) => {
        setArticles(data.articles);
        setStatus(data.articles.length > 0 ? 'ready' : 'empty');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error');
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (articles.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % articles.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [articles.length]);

  const current = articles[index];

  return (
    <section
      aria-labelledby="home-news-heading"
      className="space-y-5 border-t border-[#D4AF37]/15 pt-10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            News · Articoli
          </p>
          <h2
            id="home-news-heading"
            className="font-body text-2xl md:text-[28px] md:leading-[36px] font-semibold tracking-[-0.02em] text-[#F4F1EA]"
          >
            Ultimi scritti da Substack
          </h2>
          <p className="text-sm text-[#A39B93]">
            Aggiornamenti da Maria Teresa Rogani — si aggiornano automaticamente
            dal feed pubblico.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('news')}
          className="text-sm font-medium text-[#D4AF37] hover:text-[#E6C65C] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          Vai a News
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 glass-tier-1">
        {status === 'loading' && (
          <div className="px-6 py-10 text-sm text-[#A39B93]">
            Caricamento articoli…
          </div>
        )}

        {(status === 'empty' || status === 'error') && (
          <div className="px-6 py-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex items-start gap-3">
              <Newspaper className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm text-[#F4F1EA]">
                  {status === 'error'
                    ? 'Non riesco a leggere il feed in questo momento.'
                    : 'Gli articoli appariranno qui non appena pubblicati su Substack.'}
                </p>
                <p className="text-xs text-[#A39B93]">
                  Profilo:{' '}
                  <a
                    href={SUBSTACK_HOME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] hover:text-[#E6C65C]"
                  >
                    tarotitalia.substack.com
                  </a>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('news')}
              className="cta-label px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-medium text-[#F4F1EA] inline-flex items-center gap-2 shrink-0"
            >
              Apri pagina News
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
        )}

        {status === 'ready' && current && (
          <div className="home-articles-loop relative">
            <a
              key={current.id}
              href={current.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block px-6 py-7 md:px-8 md:py-8 animate-home-article-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                {current.imageUrl ? (
                  <div className="w-full md:w-40 shrink-0 overflow-hidden rounded-xl border border-[#D4AF37]/20 bg-[#12100E]">
                    <img
                      src={current.imageUrl}
                      alt=""
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="min-w-0 flex-1 space-y-2">
                  {current.publishedAt && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                      {formatArticleDate(current.publishedAt)}
                    </p>
                  )}
                  <h3 className="font-display text-lg md:text-xl text-[#F4F1EA] group-hover:text-[#D4AF37] transition-colors">
                    {current.title}
                  </h3>
                  {current.summary && (
                    <p className="text-sm leading-relaxed text-[#A39B93] line-clamp-2">
                      {current.summary}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D4AF37] pt-1">
                    Leggi su Substack
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </a>

            {articles.length > 1 && (
              <div
                className="absolute bottom-3 right-4 flex items-center gap-1.5"
                aria-hidden="true"
              >
                {articles.slice(0, 6).map((article, i) => (
                  <span
                    key={article.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index % Math.min(articles.length, 6)
                        ? 'w-4 bg-[#D4AF37]'
                        : 'w-1.5 bg-[#D4AF37]/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
