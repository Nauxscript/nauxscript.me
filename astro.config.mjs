import { defineConfig } from 'astro/config';
// import Unocss from '@unocss/astro'
// fixed unocss hmr bug, see in issue: https://github.com/withastro/astro/issues/3291
import Unocss from 'astro-uno'
import { presetAttributify, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'


// https://astro.build/config
export default defineConfig({
  integrations: [
    Unocss({
      presets: [
        presetAttributify(),
        presetUno({
          dark: 'class'
        }),
        presetIcons({
          prefix: 'i-',
          extraProperties: {
            display: 'inline-block'
          }
        })
      ],
      transformers: [
        transformerDirectives()
      ],
      astro: {
        autoImport: true
      }
    })
  ]
});
