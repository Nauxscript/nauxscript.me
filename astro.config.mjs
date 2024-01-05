import { defineConfig } from 'astro/config';
import Unocss from 'unocss/astro'
import { vitePluginAstroFontmin } from './vite-plugin-astro-fontmin'

// https://astro.build/config
export default defineConfig({
  integrations: [
    Unocss()
  ],
  vite: {
    plugins:[vitePluginAstroFontmin()]
  }
});
