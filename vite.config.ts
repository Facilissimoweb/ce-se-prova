import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {buildBlogPosts} from './scripts/build-blog.mjs';
import {generateSeoAssets} from './scripts/generate-seo-assets.mjs';

const DEFAULT_FIREBASE_AUTH_DOMAIN =
  'gen-lang-client-0853491667.firebaseapp.com';

/**
 * ENN-247: rewrite Coming Soon static authDomain when
 * VITE_FIREBASE_AUTH_DOMAIN is set (public/ HTML is not Vite-transformed).
 */
function firebaseAuthDomainPlugin(): Plugin {
  return {
    name: 'tarot-italia-firebase-auth-domain',
    closeBundle() {
      const raw = String(process.env.VITE_FIREBASE_AUTH_DOMAIN || '')
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/\/.*$/, '');
      if (!raw || raw === DEFAULT_FIREBASE_AUTH_DOMAIN) return;

      const target = path.resolve(import.meta.dirname, 'dist/coming-soon.html');
      if (!fs.existsSync(target)) return;

      const before = fs.readFileSync(target, 'utf8');
      const after = before.replace(
        /authDomain:\s*'gen-lang-client-0853491667\.firebaseapp\.com'/,
        `authDomain: '${raw}'`
      );
      if (after === before) {
        console.warn(
          `[firebase-auth-domain] could not patch authDomain in ${target}`
        );
        return;
      }
      fs.writeFileSync(target, after);
      console.log(`[firebase-auth-domain] coming-soon.html → authDomain=${raw}`);
    },
  };
}

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
    plugins: [
      react(),
      tailwindcss(),
      blogPostsPlugin(),
      seoAssetsPlugin(),
      firebaseAuthDomainPlugin(),
    ],
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
