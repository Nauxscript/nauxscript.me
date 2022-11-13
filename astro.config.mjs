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
          dark: 'class',
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
      rules: [
        ['rounded-inregular-1', { 'border-radius': '83% 34% 50% 61% / 62% 56% 65% 50%' }],
        ['rounded-inregular-2', { 'border-radius': '35% 79% 50% 45% / 69% 92% 26% 35%' }],
        ['lh-tighter', { 'line-height': '0.8' }]
      ]
    })
  ]
});
