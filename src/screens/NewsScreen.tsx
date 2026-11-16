import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Newspaper } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import {
  fetchNewsArticles,
  formatArticleDate,
  SUBSTACK_HOME_URL,
  SUBSTACK_PROFILE_URL,
  type SubstackArticle,
} from '../lib/substackFeed';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

export function NewsScreen({ onNavigate }: Props) {
  const [articles, setArticles] = useState<SubstackArticle[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty' | 'error'>(
    'loading'
  );
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchNewsArticles(controller.signal)
      .then((data) => {
        setArticles(data.articles);
        setStatus(data.articles.length > 0 ? 'ready' : 'empty');
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setErrorDetail(err instanceof Error ? err.message : String(err));
        setStatus('error');
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="space-y-10 pb-12 pt-6 md:pt-10">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-sm text-[#A39B93] transition-colors hover:text-[#D4AF37]"
      >
        <ArrowLeft className="h-4 w-4" />
        Torna alla Home
      </button>

      <header className="space-y-4 max-w-3xl border-b border-[#D4AF37]/15 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
          News · Articoli
        </p>
        <h1 className="font-display text-3xl leading-tight text-[#F4F1EA] md:text-4xl">
          Scritti da Substack
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[#A39B93]">
          Gli articoli di Maria Teresa Rogani su{' '}
          <a
            href={SUBSTACK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-2 hover:text-[#E6C65C]"
          >
            @tarotitalia
          </a>{' '}
          compaiono qui automaticamente dal feed pubblico.
        </p>
      </header>

      {status === 'loading' && (
        <p className="text-sm text-[#A39B93]">Caricamento articoli…</p>
      )}

      {status === 'error' && (
        <div className="glass-tier-1 rounded-2xl border border-[#D4AF37]/20 p-6 space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Newspaper className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
              Feed temporaneamente non raggiungibile
            </span>
          </div>
          <p className="text-sm text-[#A39B93]">
            {errorDetail || 'Riprova tra poco, oppure apri Substack direttamente.'}
          </p>
          <a
            href={SUBSTACK_HOME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#D4AF37] hover:text-[#E6C65C]"
          >
            Apri tarotitalia.substack.com
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}

      {status === 'empty' && (
        <div className="glass-tier-1 rounded-2xl border border-[#D4AF37]/20 p-6 md:p-8 space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Newspaper className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
              In attesa del primo articolo
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#A39B93]">
            Il feed{' '}
            <code className="text-[#F4F1EA]/90">tarotitalia.substack.com/feed</code>{' '}
            è attivo e risponde, ma non contiene ancora post pubblici. Quando
            pubblichi su Substack, gli articoli appariranno qui senza altre
            modifiche al sito.
          </p>
          <a
            href={SUBSTACK_HOME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-label inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-sm font-medium text-[#F4F1EA]"
          >
            Vai a Substack
            <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
          </a>
        </div>
      )}

      {status === 'ready' && (
        <ul className="space-y-5">
          {articles.map((article) => (
            <li key={article.id}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 rounded-2xl border border-[#D4AF37]/18 glass-tier-1 p-5 md:p-6 transition-colors hover:border-[#D4AF37]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                {article.imageUrl ? (
                  <div className="md:col-span-3 overflow-hidden rounded-xl border border-[#D4AF37]/15 bg-[#12100E]">
                    <img
                      src={article.imageUrl}
                      alt=""
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="md:col-span-3 flex items-center justify-center rounded-xl border border-[#D4AF37]/15 bg-[#151311] min-h-[120px]">
                    <Newspaper className="w-8 h-8 text-[#D4AF37]/50" />
                  </div>
                )}
                <div className="md:col-span-9 space-y-2.5 flex flex-col justify-center">
                  {article.publishedAt && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                      {formatArticleDate(article.publishedAt)}
                    </p>
                  )}
                  <h2 className="font-display text-xl md:text-2xl text-[#F4F1EA] group-hover:text-[#D4AF37] transition-colors">
                    {article.title}
                  </h2>
                  {article.summary && (
                    <p className="text-sm leading-relaxed text-[#A39B93] line-clamp-3">
                      {article.summary}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D4AF37] pt-1">
                    Leggi su Substack
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
