import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Newspaper } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import { BlogMarkdownBody } from '../components/BlogMarkdownBody';
import {
  getBlogPostBySlug,
  listPublishedBlogPosts,
  type BlogPost,
} from '../lib/blogPosts';
import { formatArticleDate } from '../lib/newsFeed';
import {
  blogSlugFromPath,
  navigateBlogPost,
  navigatePath,
  pathForBlogPost,
} from '../lib/appPaths';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

export function NewsScreen({ onNavigate }: Props) {
  const [slug, setSlug] = useState<string | null>(() =>
    blogSlugFromPath(window.location.pathname)
  );

  useEffect(() => {
    const syncSlug = () => {
      setSlug(blogSlugFromPath(window.location.pathname));
    };
    syncSlug();
    window.addEventListener('popstate', syncSlug);
    return () => window.removeEventListener('popstate', syncSlug);
  }, []);

  const posts = useMemo(() => listPublishedBlogPosts(), []);
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
    return <ArticleDetail post={article} onBack={() => {
      navigatePath('news');
      setSlug(null);
      onNavigate('news');
    }} />;
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
          Spazio per gli scritti e le riflessioni di Maria Teresa Rogani su
          tarologia, simboli e percorso evolutivo.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="glass-tier-1 max-w-2xl space-y-3 rounded-2xl border border-[#D4AF37]/20 p-6 md:p-8">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Newspaper className="h-4 w-4" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
              Presto online
            </span>
          </div>
          <p className="font-display text-xl text-[#F4F1EA]">
            Nuovi articoli in arrivo
          </p>
          <p className="text-sm leading-relaxed text-[#A39B93]">
            Gli scritti di Maria Teresa compariranno qui non appena pubblicati
            nel repository.
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
                  {post.publishedAt && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                      {formatArticleDate(post.publishedAt)}
                    </p>
                  )}
                  <h2 className="font-display text-xl text-[#F4F1EA] transition-colors group-hover:text-[#D4AF37] md:text-2xl">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="line-clamp-3 text-sm leading-relaxed text-[#A39B93]">
                      {post.description}
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
    </div>
  );
}

function ArticleDetail({
  post,
  onBack,
}: {
  post: BlogPost;
  onBack: () => void;
}) {
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
        {post.publishedAt && (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
            {formatArticleDate(post.publishedAt)}
          </p>
        )}
        <h1 className="font-display text-3xl leading-tight text-[#F4F1EA] md:text-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="max-w-2xl text-sm leading-relaxed text-[#A39B93]">
            {post.description}
          </p>
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
    </article>
  );
}
