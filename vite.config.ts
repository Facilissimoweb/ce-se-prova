import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {generateSeoAssets} from './scripts/generate-seo-assets.mjs';

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
    plugins: [react(), tailwindcss(), seoAssetsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
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
