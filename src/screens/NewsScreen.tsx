import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Newspaper } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import { BlogMarkdownBody } from '../components/BlogMarkdownBody';
import { SocialShareButtons } from '../components/SocialShareButtons';
import {
  BLOG_CATEGORIES,
  filterBlogPosts,
  getBlogPostBySlug,
  type BlogPost,
} from '../lib/blogPosts';
import { formatArticleDate } from '../lib/newsFeed';
import {
  blogSlugFromPath,
  navigateBlogPost,
  navigatePath,
  PATH_CHANGE_EVENT,
  pathForBlogPost,
} from '../lib/appPaths';
import { absoluteUrl, getSiteOrigin } from '../lib/seo';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

type CategoryFilter = (typeof BLOG_CATEGORIES)[number] | 'Tutti';

export function NewsScreen({ onNavigate }: Props) {
  const [slug, setSlug] = useState<string | null>(() =>
    blogSlugFromPath(window.location.pathname)
  );
  const [category, setCategory] = useState<CategoryFilter>('Tutti');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const syncSlug = () => {
      setSlug(blogSlugFromPath(window.location.pathname));
    };
    syncSlug();
    window.addEventListener('popstate', syncSlug);
    window.addEventListener(PATH_CHANGE_EVENT, syncSlug);
    return () => {
      window.removeEventListener('popstate', syncSlug);
      window.removeEventListener(PATH_CHANGE_EVENT, syncSlug);
    };
  }, []);

  const posts = useMemo(
    () =>
      filterBlogPosts({
        category: category === 'Tutti' ? null : category,
        tag: activeTag,
      }),
    [category, activeTag]
  );

  const allTags = useMemo(() => {
    const pool = filterBlogPosts({
      category: category === 'Tutti' ? null : category,
    });
    const set = new Set<string>();
    for (const post of pool) {
      for (const tag of post.tags) set.add(tag);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'it'));
  }, [category]);

  const article = slug ? getBlogPostBySlug(slug) : undefined;

  if (slug && !article) {
    return (
      <div className="space-y-8 pb-12 pt-6 md:pt-10">
        <button
          type="button"
          onClick={() => {
            navigatePath('news');
            setSlug(null);
            onNavigate('news');
          }}
          className="inline-flex items-center gap-2 text-sm text-[#A39B93] transition-colors hover:text-[#D4AF37]"
        >
          <ArrowLeft className="h-4 w-4" />
          Torna al Blog
        </button>
        <div className="glass-tier-1 max-w-2xl space-y-3 rounded-2xl border border-[#D4AF37]/20 p-6 md:p-8">
          <p className="font-display text-xl text-[#F4F1EA]">Articolo non trovato</p>
          <p className="text-sm leading-relaxed text-[#A39B93]">
            Questo pezzo non è (più) pubblicato, oppure l&apos;indirizzo non è
            corretto.
          </p>
        </div>
      </div>
    );
  }

  if (article) {
    return (
      <ArticleDetail
        post={article}
        onBack={() => {
          navigatePath('news');
          setSlug(null);
          onNavigate('news');
        }}
        onNavigate={onNavigate}
        onTagClick={(tag) => {
          navigatePath('news');
          setSlug(null);
          setCategory('Tutti');
          setActiveTag(tag);
          onNavigate('news');
        }}
      />
    );
  }

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

      <header className="max-w-3xl space-y-4 border-b border-[#D4AF37]/15 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
          News · Articoli
        </p>
        <h1 className="font-display text-3xl leading-tight text-[#F4F1EA] md:text-4xl">
          Blog
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[#A39B93]">
          Quattro percorsi di lettura — Storia, Autori, Arcani Maggiori e Minori —
          con gli scritti di Maria Teresa Rogani su tarologia e simboli.
        </p>
      </header>

      <nav aria-label="Aree del Blog" className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
          Macro aree
        </p>
        <div className="flex flex-wrap gap-2">
          {(['Tutti', ...BLOG_CATEGORIES] as CategoryFilter[]).map((item) => {
            const selected = category === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setCategory(item);
                  setActiveTag(null);
                }}
                className={`min-h-[40px] rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  selected
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F4F1EA]'
                    : 'border-[#D4AF37]/22 bg-transparent text-[#A39B93] hover:border-[#D4AF37]/45 hover:text-[#F4F1EA]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </nav>

      {allTags.length > 0 && (
        <div className="space-y-3" aria-label="Tag">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]/80">
            Tag
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const selected = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveTag(selected ? null : tag)}
                  className={`min-h-[36px] rounded-md border px-2.5 py-1.5 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    selected
                      ? 'border-[#D4AF37]/70 bg-[#D4AF37]/10 text-[#D4AF37]'
                      : 'border-[#D4AF37]/15 text-[#A39B93] hover:border-[#D4AF37]/40 hover:text-[#F4F1EA]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="glass-tier-1 max-w-2xl space-y-3 rounded-2xl border border-[#D4AF37]/20 p-6 md:p-8">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Newspaper className="h-4 w-4" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
              Nessun pezzo
            </span>
          </div>
          <p className="font-display text-xl text-[#F4F1EA]">
            Niente in questa selezione
          </p>
          <p className="text-sm leading-relaxed text-[#A39B93]">
            Prova un&apos;altra macro area o togli il filtro tag.
          </p>
        </div>
      ) : (
        <ul className="space-y-5">
          {posts.map((post) => (
            <li key={post.id}>
              <a
                href={pathForBlogPost(post.slug)}
                onClick={(event) => {
                  event.preventDefault();
                  navigateBlogPost(post.slug);
                  setSlug(post.slug);
                }}
                className="group grid grid-cols-1 gap-5 rounded-2xl border border-[#D4AF37]/18 glass-tier-1 p-5 transition-colors hover:border-[#D4AF37]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] md:grid-cols-12 md:gap-6 md:p-6"
              >
                {post.cover ? (
                  <div className="overflow-hidden rounded-xl border border-[#D4AF37]/15 bg-[#12100E] md:col-span-3">
                    <img
                      src={post.cover}
                      alt=""
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-[#D4AF37]/15 bg-[#151311] md:col-span-3">
                    <Newspaper className="h-8 w-8 text-[#D4AF37]/50" />
                  </div>
                )}
                <div className="flex flex-col justify-center space-y-2.5 md:col-span-9">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {post.category && (
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                        {post.category}
                      </span>
                    )}
                    {post.publishedAt && (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A39B93]">
                        {formatArticleDate(post.publishedAt)}
                      </p>
                    )}
                  </div>
                  <h2 className="font-display text-xl text-[#F4F1EA] transition-colors group-hover:text-[#D4AF37] md:text-2xl">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="line-clamp-3 text-sm leading-relaxed text-[#A39B93]">
                      {post.description}
                    </p>
                  )}
                  {post.tags.length > 0 && (
                    <p className="line-clamp-1 text-[11px] text-[#A39B93]/80">
                      {post.tags.join(' · ')}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 pt-1 text-xs font-medium text-[#D4AF37]">
                    Leggi l&apos;articolo
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

      <BlogCta onNavigate={onNavigate} />
    </div>
  );
}

function ArticleDetail({
  post,
  onBack,
  onNavigate,
  onTagClick,
}: {
  post: BlogPost;
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
  onTagClick: (tag: string) => void;
}) {
  const shareUrl = absoluteUrl(pathForBlogPost(post.slug), getSiteOrigin());

  return (
    <article className="space-y-8 pb-12 pt-6 md:pt-10">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-[#A39B93] transition-colors hover:text-[#D4AF37]"
      >
        <ArrowLeft className="h-4 w-4" />
        Torna al Blog
      </button>

      <header className="max-w-3xl space-y-4 border-b border-[#D4AF37]/15 pb-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {post.category && (
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
              {post.category}
            </span>
          )}
          {post.publishedAt && (
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A39B93]">
              {formatArticleDate(post.publishedAt)}
            </p>
          )}
        </div>
        <h1 className="font-display text-3xl leading-tight text-[#F4F1EA] md:text-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="max-w-2xl text-sm leading-relaxed text-[#A39B93]">
            {post.description}
          </p>
        )}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {post.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onTagClick(tag)}
                className="rounded-md border border-[#D4AF37]/20 px-2.5 py-1 text-[11px] text-[#A39B93] transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </header>

      {post.cover && (
        <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#12100E]">
          <img
            src={post.cover}
            alt=""
            className="aspect-[21/9] w-full object-cover"
            loading="eager"
          />
        </div>
      )}

      <div className="max-w-3xl">
        <BlogMarkdownBody markdown={post.body} />
      </div>

      <div className="max-w-3xl border-t border-[#D4AF37]/15 pt-6">
        <SocialShareButtons
          url={shareUrl || pathForBlogPost(post.slug)}
          title={post.title}
        />
      </div>

      <BlogCta onNavigate={onNavigate} />
    </article>
  );
}

function BlogCta({ onNavigate }: { onNavigate: (screen: ScreenId) => void }) {
  return (
    <section className="glass-tier-2 flex max-w-3xl flex-col justify-between gap-6 rounded-2xl border border-[#D4AF37]/20 p-6 md:flex-row md:items-center md:p-8">
      <div className="max-w-xl space-y-2">
        <div className="flex items-center gap-2 text-[#D4AF37]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
            Prossimo passo
          </span>
        </div>
        <h2 className="font-body text-xl font-semibold tracking-[-0.02em] text-[#F4F1EA] md:text-2xl">
          Vuoi approfondire con Maria Teresa?
        </h2>
        <p className="text-sm leading-relaxed text-[#A39B93]">
          Prenota un consulto (WhatsApp, Stripe in pausa) oppure apri il Dialogo
          Tarot con i 22 Arcani Maggiori.
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onNavigate('booking')}
          className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#12100E] transition-all hover:bg-[#E6C65C]"
        >
          Prenota consulto
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate('chat')}
          className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg border border-[#D4AF37]/30 px-5 py-3 text-sm font-medium text-[#F4F1EA] transition-colors hover:border-[#D4AF37]"
        >
          Parla con Maria Teresa
        </button>
      </div>
    </section>
  );
}
