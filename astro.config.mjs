import { defineConfig } from 'astro/config';
import Unocss from 'unocss/astro'
import { vitePluginAstroFontmin } from './vite-plugin-astro-fontmin'

// https://astro.build/config
export default defineConfig({
  site: 'https://nauxscript.com',
  integrations: [
    Unocss()
  ],
  vite: {
    plugins:[
      vitePluginAstroFontmin(),
    ]
  },
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
      // Alternatively, provide multiple themes
      // https://shikiji.netlify.app/guide/dual-themes#light-dark-dual-themes
      experimentalThemes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
      // Add custom transformers: https://shikiji.netlify.app/guide/transformers
      // Find common transformers: https://shikiji.netlify.app/packages/transformers
      transformers: [],
    },
  }
});
