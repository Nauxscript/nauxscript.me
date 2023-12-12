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
  shortcuts: {
    'naux-logo': 'font-serif-naux font-black text-3.25rem bg-clip-text font-bold text-transparent from-gray-700 from-55% to-transparent lh-12',
    'logo-effect': 'bg-gradient-to-b my-0 mb-[-14px]',
    'logo-effect-md': 'bg-gradient-to-l mx-0 ml-[-14px]',
    'logo-dark': 'from-stone-300 from-55% to-neutral-600',
    'naux-link': 'text-inherit hover:text-#c04851 transition-all'
  },
  rules: [
    ['rounded-inregular-1', { 'border-radius': '83% 34% 50% 61% / 62% 56% 65% 50%' }],
    ['rounded-inregular-2', { 'border-radius': '35% 79% 50% 45% / 69% 92% 26% 35%' }],
    ['text-last-justify', {'text-align-last': 'justify'}],
    ['lh-tighter', { 'line-height': '0.8' }],
    ['font-serif-naux', {'font-family': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, Helvetica, serif'}],
    ['font-chinese', {'font-family': 'SourceHanSerif'}],
    ['mobile-text', {'writing-mode': 'vertical-rl'}],
  ]
})
