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
      if (!id.endsWith('.astro'))
        return
      const ast = this.parse(code)
      walk(ast as any, {
        enter(node) {
          if (node.type === 'TemplateElement') {
            allText += parse(node.value.raw).rawText          
          }
        },
      }) 
    },
    async closeBundle() { 
      if (!allText.trim()) {
        console.log('[warning] minimize font fail, have no valid text')
        return
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
