// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://elevatecsm.vercel.app',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
        prefixDefaultLocale: false
    }
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-ES',
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Vercel best practice: inline small assets to reduce requests
      assetsInlineLimit: 4096,
    },
  },
});