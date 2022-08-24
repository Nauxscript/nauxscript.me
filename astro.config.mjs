import { defineConfig } from 'astro/config';
import Unocss from '@unocss/astro'
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'


// https://astro.build/config
export default defineConfig({
  integrations: [
    Unocss({
      presets: [presetIcons({
        prefix: 'i-',
        extraProperties: {
          display: 'inline-block'
        }
      })],
      transformers: [
        transformerDirectives()
      ]
    })
  ]
});
