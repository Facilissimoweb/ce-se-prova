import React, { useEffect, useState } from 'react';
import { ArrowLeft, Newspaper } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import {
  fetchNewsArticles,
  formatArticleDate,
  type NewsArticle,
} from '../lib/newsFeed';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

export function NewsScreen({ onNavigate }: Props) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetchNewsArticles(controller.signal)
      .then((data) => {
        setArticles(data.articles);
        setStatus(data.articles.length > 0 ? 'ready' : 'empty');
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        // Feed disconnesso: preferisci empty state stabile invece di errori.
        setArticles([]);
        setStatus('empty');
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
          Blog
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[#A39B93]">
          Spazio per gli scritti e le riflessioni di Maria Teresa Rogani su
          tarologia, simboli e percorso evolutivo.
        </p>
      </header>

      {status === 'loading' && (
        <p className="text-sm text-[#A39B93]">Caricamento articoli…</p>
      )}

      {status === 'empty' && (
        <div className="glass-tier-1 rounded-2xl border border-[#D4AF37]/20 p-6 md:p-8 space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Newspaper className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
              Presto online
            </span>
          </div>
          <p className="font-display text-xl text-[#F4F1EA]">
            Nuovi articoli in arrivo
          </p>
          <p className="text-sm leading-relaxed text-[#A39B93]">
            Stiamo preparando una nuova casa per il Blog. Torna a trovarci
            presto: gli scritti di Maria Teresa compariranno qui.
          </p>
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
                    Leggi l&apos;articolo
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
