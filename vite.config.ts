import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {buildBlogPosts} from './scripts/build-blog.mjs';
import {generateSeoAssets} from './scripts/generate-seo-assets.mjs';

/** Compile content/blog → src/data/blogPosts.generated.ts before SPA/API consumers load. */
function blogPostsPlugin(): Plugin {
  return {
    name: 'tarot-italia-blog-posts',
    buildStart() {
      const result = buildBlogPosts();
      console.log(
        `[blog] ${result.published}/${result.count} post(s) → ${result.outFile}`
      );
    },
    configureServer(server) {
      const contentDir = path.resolve(import.meta.dirname, 'content/blog');
      server.watcher.add(contentDir);
      server.watcher.on('all', (_event, file) => {
        if (!file.includes(`${path.sep}content${path.sep}blog${path.sep}`)) {
          return;
        }
        if (!/\.(md|mdx)$/i.test(file)) return;
        buildBlogPosts();
        server.ws.send({ type: 'full-reload' });
      });
    },
  };
}

/** Regenerate sitemap.xml before Vite copies `public/` into `dist/`. */
function seoAssetsPlugin(): Plugin {
  return {
    name: 'tarot-italia-seo-assets',
    buildStart() {
      const {origin, sitemapPath} = generateSeoAssets();
      console.log(
        `[seo] sitemap → ${sitemapPath} (origin=${origin || 'path-only'})`
      );
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), blogPostsPlugin(), seoAssetsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
