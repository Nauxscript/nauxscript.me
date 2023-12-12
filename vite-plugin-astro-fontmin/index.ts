import { walk } from 'estree-walker'
import { parse } from 'node-html-parser'
import type {  PluginOption} from 'vite'
import Fontmin from 'fontmin'

let allText = ''

export function vitePluginAstroFontmin(): PluginOption {
  return {
    name: 'vite-plugin-astro-fontmin',
    enforce: 'pre', // post
    apply: 'build', // apply 亦可以是一个函数
    async transform(code, id) {
      let fileType = ''
      id.endsWith('.astro') && (fileType = 'astro')
      id.endsWith('.md') && (fileType = 'md')
      if (fileType === '')
        return
      const ast = this.parse(code)
      walk(ast as any, {
        enter(node) {
          if (fileType === 'astro' && node.type === 'TemplateElement') {
            allText += parse(node.value.raw).rawText          
          }

          if (fileType === 'md' && node.type === 'Literal') {
            allText += parse(node.value?.toString() || '').rawText          
          }
        },
      }) 
    },
    async closeBundle() { 
      if (!allText.trim()) {
        console.log('[warning] minimize font fail, have no valid text')
        return
      }
      if (import.meta.env.VITE_LOG_FONT) {
        console.log(allText.trim())
      }
      const fontmin = new Fontmin()
      fontmin.src('public/fonts/SourceHanSerifTC-Bold.ttf')
      fontmin.use(Fontmin.glyph({
        text: allText,
      }))
      fontmin.dest('dist/fonts')
      await fontmin.runAsync()
      console.log('[success] minimize font done')
    }
  }
}
