import React, { useEffect, useState } from 'react';
import { ArrowRight, Newspaper } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import {
  listNewsArticlesFromBlog,
} from '../lib/blogPosts';
import { formatArticleDate, type NewsArticle } from '../lib/newsFeed';
import { navigateBlogPost, navigatePath } from '../lib/appPaths';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

const ROTATE_MS = 5500;

export function HomeArticlesLoop({ onNavigate }: Props) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty'>('loading');

  useEffect(() => {
    const list = listNewsArticlesFromBlog();
    setArticles(list);
    setStatus(list.length > 0 ? 'ready' : 'empty');
  }, []);

  useEffect(() => {
    if (articles.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % articles.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [articles.length]);

  const current = articles[index];

  const openArticle = (article: NewsArticle) => {
    const match = article.link.match(/\/(?:news|blog|articoli)\/([^/?#]+)/i);
    if (match?.[1]) {
      const slug = decodeURIComponent(match[1]);
      navigateBlogPost(slug);
      onNavigate('news');
      return;
    }
    navigatePath('news');
    onNavigate('news');
  };

  return (
    <section
      aria-labelledby="home-news-heading"
      className="space-y-5 border-t border-[#D4AF37]/15 pt-10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            News · Articoli
          </p>
          <h2
            id="home-news-heading"
            className="font-body text-2xl font-semibold tracking-[-0.02em] text-[#F4F1EA] md:text-[28px] md:leading-[36px]"
          >
            Dal Blog
          </h2>
          <p className="text-sm text-[#A39B93]">
            Scritti e aggiornamenti di Maria Teresa Rogani.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('news')}
          className="inline-flex shrink-0 items-center gap-1.5 self-start whitespace-nowrap text-sm font-medium text-[#D4AF37] hover:text-[#E6C65C] sm:self-auto"
        >
          Vai a News
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 glass-tier-1">
        {status === 'loading' && (
          <div className="px-6 py-10 text-sm text-[#A39B93]">
            Caricamento articoli…
          </div>
        )}

        {status === 'empty' && (
          <div className="flex flex-col justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <Newspaper className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />
              <div className="space-y-1">
                <p className="text-sm text-[#F4F1EA]">Nuovi articoli in arrivo</p>
                <p className="text-xs text-[#A39B93]">
                  Gli scritti compariranno qui non appena pubblicati.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('news')}
              className="btn-secondary cta-label inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium"
            >
              Apri pagina News
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {status === 'ready' && current && (
          <div className="home-articles-loop relative">
            <a
              key={current.id}
              href={current.link}
              onClick={(event) => {
                event.preventDefault();
                openArticle(current);
              }}
              className="group block animate-home-article-in px-6 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37] md:px-8 md:py-8"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
                {current.imageUrl ? (
                  <div className="w-full shrink-0 overflow-hidden rounded-xl border border-[#D4AF37]/20 bg-[#12100E] md:w-40">
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
                  <h3 className="font-display text-lg text-[#F4F1EA] transition-colors group-hover:text-[#D4AF37] md:text-xl">
                    {current.title}
                  </h3>
                  {current.summary && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-[#A39B93]">
                      {current.summary}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 pt-1 text-xs font-medium text-[#D4AF37]">
                    Leggi l&apos;articolo
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
