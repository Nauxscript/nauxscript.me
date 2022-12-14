import { defineConfig, presetAttributify, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
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
    ['lh-tighter', { 'line-height': '0.8' }],
    ['text-last-justify', {'text-align-last': 'justify'}],
    ['font-serif-naux', {'font-family': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, Helvetica, serif'}],
    ['font-chinese', {'font-family': 'SourceHanSerif'}]
  ]
})
