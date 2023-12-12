---
layout: ../../layouts/BlogLayout.astro
title: Tailwind CSS v3.0 介绍（自译）
createAt: 2021-12-13 10:40:20
updateAt: 2021-12-13 10:40:20
tags: ["CSS"]
---

# Tailwind CSS v3.0 介绍（自译）

Tailwind CSS v3.0 版本来了 —— 带着令人难以置信的性能提升，巨大的工作流程改进，以及大量意想不到的新奇功能来了。
注：斗胆随手一翻，翻得不好还请见谅。

## 前言

想要浏览最酷的新功能，请查看我们的油管频道中的视频 [“What’s new in Tailwind CSS v3.0”](https://www.youtube.com/watch?v=mSC6GwizOag)。
**Tailwind CSS v3.0** 是迄今为止最让我们激动的版本，尤其是以下的改进提升：

- **JIT 模式，即时又及时** —— 闪电般的构建速度，变体可叠加，样式类支持任意值，以及更好的浏览器表现等等。
- **开箱即用的丰富颜色** —— 包括所有默认扩展的调色盘颜色如 `cyan`、`rose`、`fuchsia`、`lime` 等，~~以及高达五十度的灰色~~。
- **支持彩色的盒子阴影** —— 为了实现有趣的光影效果和在五颜六色的背景下更自然合理的阴影效果。
- **滚动捕捉 API** —— 一个仅由 **CSS** 构建的全面且可组合的滚动捕捉功能类。
- **多列布局** —— 你现在终于可以制作梦寐以求的瀑布流了！
- **原生表单控件样式** —— 无需重新造轮子即可使各种单/复选框、文件选择框样式都可以符合你的品牌调性。
- **打印样式控制** —— 当别人打印你的网页时，从 **HTML 层面**控制你的网站显示你想要的样子。
- **更现代化的宽高比控制 API** —— 不再需要通过 `padding hacks` 的骚操作，除非你的老板要你兼容 Safari 14而你又不得不听他话。
- **花里胡哨的下划线风格** —— 让你的小项目直接起飞的那双翅膀。
- **RTL 和 LTR 修饰符（左/右向修饰符）** —— 让你在构建多向网站中完全控制分清南北、控制左右。
- **Portrait 和 landscape 修饰符（横/竖屏修饰符）** —— 讲真，只是因为这功能容易实现就顺便加上了。
- **支持任意属性** —— Tailwind 现在支持那些我们闻所未闻的 **CSS 属性**了。
- **通过 CDN 使用** —— 新的 **Just-in-Time** 引擎的压缩版本可以通过 **CDN 脚本**的方式直接在浏览器中运行。
- **多到离谱的其他功能类** —— 包括但不限于`touch-action`、`will-change`、`flex-basis`、`text-indent`、`scroll-behavior` 诸如此类的支持。

我们还搞了个焕然一新、美轮美奂的[文档](https://tailwindcss.com/)，上面每组属性、功能类的页面中都有新版本改进的内容和示例提供。

老规矩，从 `npm` 中获取 **Tailwind CSS v3.0** 来开始我们的愉快玩耍：
```javascript
npm install -D tailwindcss@latest postcss autoprefixer
```
…或者直接前往 [Tailwind Play 网站](https://play.tailwindcss.com/)直接在浏览器中尝试最新的功能。

Tailwind CSS v3.0 是一个新的大版本，所以带有一些小的破坏性更改，但是我们已经竭尽所能使从旧版本到该版本的升级尽可能地平顺了，对于大多数的旧项目来说，你可以不做任何改动地直接升级到 v3.0 的版本。

举个栗子：[Tailwind UI](https://tailwindui.com/) 可能是目前地球上基于 Tailwind 搭建的最大的项目，但它每个模板都可以不改一行代码而从 v2 升级到 v3。

对于更多迁移到 v3 的细节以及手模手教学，请直接查阅[升级指南](https://tailwindcss.com/docs/upgrade-guide)。

## JIT 模式，即时又及时
回想一下今年的三月份，我们给大家引进了可以带来巨大性能提升的 [Just-in-Time 引擎](https://tailwindcss.com/blog/just-in-time-the-next-generation-of-tailwind-css)，解锁了诸如 [任意属性（arbitrary values）](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)的新奇功能，以及使我们可以和复杂的变体配置说拜拜的更新。
在 Tailwind CSS v3.0，这个全新的引擎也变得更加高效，完全可以胜任它的前辈的位置了，所以所有基于 Tailwind 的项目都可以从这些开箱即用的改进从受益。

## 开箱即用的丰富颜色
在新引擎出现之前，我们在开发中总是担心打包出来的 CSS 文件过大，而其中我们做出最大的让步就是不得不谨慎地限制调色盘的颜色。
而在 v3.0 中，我们默认启用了拓展调色盘中的每一个颜色，譬如 `lime`、`cyan`、`sky`、`fuchsia`、`rose` 以及色彩斑斓的灰色。
查看 [color palette 指南](https://tailwindcss.com/docs/customizing-colors)以了解更多

## 支持彩色的盒子阴影
大家想要彩色阴影想了好些年了，但是要想通过一种真正有意义的可组合的方式来实现它的话，比我设想中要困难得多。
经过好几次的摸索后，我们终于找到了一个舒服地实现它的方式；所以，Tailwind CSS v3.0 终于支持彩色阴影了：

<div class="relative rounded-xl overflow-auto p-8 bg-gray-100">
  <div class="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16">
    <div class="flex flex-col items-center shrink-0">
      <p class="font-medium text-sm text-gray-500 font-mono text-center mb-3">shadow-cyan-500/50</p>
      <button class="py-2 px-3 bg-cyan-500 text-white text-sm font-semibold rounded-md shadow-lg shadow-cyan-500/50 focus:outline-none">Subscribe</button>
    </div>
    <div class="flex flex-col items-center shrink-0">
      <p class="font-medium text-sm text-gray-500 font-mono text-center mb-3">shadow-blue-500/50</p>
      <button class="py-2 px-3 bg-blue-500 text-white text-sm font-semibold rounded-md shadow-lg shadow-blue-500/50 focus:outline-none">Subscribe</button>
    </div>
    <div class="flex flex-col items-center shrink-0">
      <p class="font-medium text-sm text-gray-500 font-mono text-center mb-3">shadow-indigo-500/50</p>
      <button class="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow-lg shadow-indigo-500/50 focus:outline-none">Subscribe</button>
    </div>
  </div>
</div>
```html
<button class="bg-cyan-500 shadow-lg shadow-cyan-500/50 ...">Subscribe</button>
<button class="bg-blue-500 shadow-lg shadow-blue-500/50 ...">Subscribe</button>
<button class="bg-indigo-500 shadow-lg shadow-indigo-500/50 ...">Subscribe</button>
```
查看[盒子阴影颜色](https://tailwindcss.com/docs/box-shadow-color)以了解更多。

## 滚动捕捉 API
我们为 Scroll Snap 模块添加了一整套能让你直接在 HTML 中构建丰富多彩的滚动捕捉效果的实用功能类：
**请在图片栅格中滚动查看预期行为:**
<div class="not-prose relative bg-grid-gray-100 bg-gray-100 rounded-xl overflow-hidden" style="background-position: 10px 10px;"><div class="absolute inset-0 bg-gradient-to-b from-gray-50 opacity-60"></div><div class="relative rounded-xl overflow-auto">
  <!-- Snap Point -->
  <div class="flex ml-[50%] items-end justify-start pt-10 mb-6">
    <div class="ml-2 rounded font-mono text-[0.625rem] leading-6 px-1.5 ring-1 ring-inset bg-indigo-50 text-indigo-600 ring-indigo-600">snap point</div>
    <div class="absolute top-0 bottom-0 left-1/2 border-l border-indigo-500"></div>
  </div>
  <!-- Contents -->
  <div class="relative w-full flex gap-6 snap-x overflow-x-auto pb-14">
    <div class="snap-center shrink-0">
      <div class="shrink-0 w-4 sm:w-48"></div>
    </div>
    <div class="snap-center shrink-0 first:pl-8 last:pr-8">
      <img class="shrink-0 w-80 h-40 rounded-lg shadow-xl bg-white" src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
    </div>
    <div class="snap-center shrink-0 first:pl-8 last:pr-8">
      <img class="shrink-0 w-80 h-40 rounded-lg shadow-xl bg-white" src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
    </div>
    <div class="snap-center shrink-0 first:pl-8 last:pr-8">
      <img class="shrink-0 w-80 h-40 rounded-lg shadow-xl bg-white" src="https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
    </div>
    <div class="snap-center shrink-0 first:pl-8 last:pr-8">
      <img class="shrink-0 w-80 h-40 rounded-lg shadow-xl bg-white" src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
    </div>
    <div class="snap-center shrink-0 first:pl-8 last:pr-8">
      <img class="shrink-0 w-80 h-40 rounded-lg shadow-xl bg-white" src="https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
    </div>
    <div class="snap-center shrink-0 first:pl-8 last:pr-8">
      <img class="shrink-0 w-80 h-40 rounded-lg shadow-xl bg-white" src="https://images.unsplash.com/photo-1559333086-b0a56225a93c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80">
    </div>
    <div class="snap-center shrink-0">
      <div class="shrink-0 w-4 sm:w-48"></div>
    </div>
  </div>
</div><div class="absolute inset-0 pointer-events-none border border-black/5 rounded-xl"></div></div>
```html
<div class="snap-x ...">
  <div class="snap-center ...">
    <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
  </div>
  <div class="snap-center ...">
    <img src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
  </div>
  <div class="snap-center ...">
    <img src="https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
  </div>
  <div class="snap-center ...">
    <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
  </div>
  <div class="snap-center ...">
    <img src="https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
  </div>
  <div class="snap-center ...">
    <img src="https://images.unsplash.com/photo-1559333086-b0a56225a93c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
  </div>
</div>
```
从 [Scroll Margin](https://tailwindcss.com/docs/scroll-margin) 功能类开始，通过了解它的所有 API 来了解更多相关知识吧！

## 多列布局
我们也增加了对多列显示的支持 —— 像报纸版面布局那样。这样的布局方式真的非常有用，也很利用做类似于页尾导航栏一类的布局。
<div class="relative rounded-xl overflow-auto p-8  bg-gray-100">
  <div class="relative">
    <div class="relative font-serif text-base text-justify columns-1 sm:columns-3 gap-6">
      <p>Expedita quo ea quod laborum ullam ipsum enim. Deleniti commodi et. Nam id laborum placeat natus eum. Aliquid aut aut soluta nesciunt culpa magni. Velit possimus autem et aut repudiandae culpa rerum. Qui blanditiis ut qui quia expedita necessitatibus sed. Autem sed ut saepe doloremque aut placeat voluptas ipsum.</p>
      <p class="mt-6">Eligendi error nisi recusandae velit numquam nihil aperiam enim. Eum et molestias. Id qui cum veritatis id ea quidem ea rerum saepe. Iste itaque fugiat sequi. Voluptatem quae minus. Maxime ullam ea praesentium recusandae vero est quas. Quia minima fugiat aut laborum impedit facere autem sit qui. Et eos et ullam necessitatibus. Ut voluptatem saepe natus itaque maiores sit repellat aut natus assumenda.</p>
      <p class="mt-6">Blanditiis ipsa officia dolores exercitationem nemo beatae voluptatem eos rerum velit asperiores. Non quisquam accusantium officia nisi eius necessitatibus.</p>
      <p class="mt-6">Quaerat quia ad voluptatem laudantium natus. Aut ipsa et numquam delectus aliquam. Recusandae libero consequatur dolorum. Animi culpa rerum molestiae ut non et molestias aliquid aut nemo. Sint dolorem dolorem. Iure dolorum amet ea sit perferendis.</p>
      <p class="mt-6">Et illum ut officia nisi commodi. Quia et mollitia possimus modi. Delectus aliquid quam eos consectetur.</p>
      <p class="mt-6">Accusantium et et qui non sed modi. Corrupti deserunt culpa eos vitae neque aperiam. Repellat tenetur fugit.</p>
      <p class="mt-6">Deleniti distinctio ad corrupti nisi. Mollitia qui est natus cumque. Officia dolor qui perferendis necessitatibus saepe excepturi asperiores quos voluptas. Est suscipit facere nihil expedita suscipit quibusdam. Quod cupiditate vero distinctio. Sed est soluta nostrum magnam et saepe blanditiis aut. Vero dolores repellendus et libero minima explicabo provident. Culpa aut dolorem est.</p>
    </div>
  </div>
</div>
```html
<div class="columns-1 sm:columns-3 ...">
  <p>...</p>
  <!-- ... -->
</div>
```
查看文档中的 [columns](https://tailwindcss.com/docs/columns) 部分来了解更多吧，最好顺便了解一下这个 [break-after/inside/before](https://tailwindcss.com/docs/break-after) 这个新的功能类哦。

## 原生表单控件样式
我们增加了对新的强调色属性（**accent-color**）的支持，以及一个用于样式化文件输入按钮的修饰符，使你可以更轻松地实现原生表单控件对于不同动作的效果变化：
<div class="max-w-sm mx-auto bg-white shadow py-8 px-6 bg-gray-100">
      <form>
        <div class="flex items-center space-x-6">
          <div class="shrink-0">
            <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1361&amp;q=80" alt="Current profile photo">
          </div>
          <label class="block">
            <span class="sr-only">Choose profile photo</span>
            <input type="file" class="block w-full text-sm text-gray-500 file:text-sm file:font-semibold file:py-2 file:px-4 file:bg-violet-50 file:text-violet-700 file:rounded-full file:border-0 file:mr-4 hover:file:bg-violet-100">
          </label>
        </div>
        <label class="mt-6 flex items-center justify-center space-x-2 text-sm font-medium text-gray-600">
          <input type="checkbox" class="accent-violet-500" checked="">
          <span>Yes, send me all your stupid updates</span>
        </label>
      </form>
 </div>
```html
<form>
  <div class="flex items-center space-x-6">
    <div class="shrink-0">
      <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
    </div>
    <label class="block">
      <span class="sr-only">Choose profile photo</span>
      <input type="file" class="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      "/>
    </label>
  </div>
  <label class="mt-6 flex items-center justify-center space-x-2 text-sm font-medium text-gray-600">
    <input type="checkbox" class="accent-violet-500" checked/>
    <span>Yes, send me all your stupid updates</span>
  </label>
</form>
```
你可以通过文档中的 [accent color](https://tailwindcss.com/docs/accent-color) 和 [file input buttons](https://tailwindcss.com/docs/hover-focus-and-other-states#file-input-buttons) 来了解相关知识。

## 打印样式控制
增加了新的打印修饰符以便你控制页面被~~偷偷地~~打印时的样式：
```html
<div>
  <article class="print:hidden">
    <h1>My Secret Pizza Recipe</h1>
    <p>This recipe is a secret, and must not be shared with anyone</p>
    <!-- ... -->
  </article>
  <div class="hidden print:block">
    Are you seriously trying to print this? It's secret!
  </div>
</div>
```
你以为我会叫你去看看文档中的 [print styles](https://tailwindcss.com/docs/hover-focus-and-other-states#print-styles) 部分，其实我不会。

## 更现代化的宽高比控制 API
我们添加了对新的原生纵横比（**aspect-ratio**）属性的支持，因为现代浏览器终于开始比较稳定地支持它了：
<div class="relative rounded-xl overflow-auto p-8  bg-gray-100">
  <iframe class="w-full aspect-video rounded-lg shadow-lg" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
</div>
```html
<iframe class="w-full aspect-video ..." src="https://www.youtube.com/..."></iframe>
```
你懂我意思的： [aspect ratio](https://tailwindcss.com/docs/aspect-ratio) 。

## 花里胡哨的下划线风格
你现在可以随心所欲修改下划线的高矮胖瘦五颜六色，以及更多意想不到的模样：
<div class="relative rounded-xl overflow-auto">
  <div class=" bg-gray-100 p-8 text-gray-900 shadow-lg max-w-md mx-auto text-sm leading-6 sm:text-base sm:leading-7">
    <p class="text-base leading-6">I’m Derek, an astro-engineer based in Tatooine. I like to build X-Wings at <a href="#" class="font-semibold text-gray-900 underline decoration-sky-500 decoration-2">My Company, Inc</a>. Outside of work, I like to <a href="#" class="font-semibold text-gray-900 underline decoration-pink-500 decoration-2 decoration-dotted">watch pod-racing</a> and have <a href="#" class="font-semibold text-gray-900 underline decoration-indigo-500 decoration-2 decoration-wavy">light-saber</a> fights.</p>
  </div>
</div>
```html
<p>
  I’m Derek, an astro-engineer based in Tatooine. I like to build X-Wings at
  <a href="#" class="underline decoration-sky-500">My Company, Inc</a>. Outside of work, I
  like to <a href="#" class="underline decoration-pink-500 decoration-dotted">watch pod-racing</a>
  and have <a href="#" class="underline decoration-indigo-500 decoration-wavy">light-saber</a>
  fights.
</p>
```
相关内容通通在这几个链接中： [text decoration color](https://tailwindcss.com/docs/text-decoration-color)、[text decoration style](https://tailwindcss.com/docs/text-decoration-style)、[text decoration thickness](https://tailwindcss.com/docs/text-decoration-thickness) 和 [text underline offset](https://tailwindcss.com/docs/text-underline-offset)。
 
## RTL 和 LTR 修饰符（左/右向修饰符）
我们使用新的 rtl 和 ltr 修饰符添加了对多向布局的**实验性支持**：
<div class="relative rounded-xl overflow-auto p-8  bg-gray-100">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 max-w-lg mx-auto">
    <div dir="ltr">
      <p class="mb-4 text-sm font-medium text-gray-500">Left-to-right</p>
      <div class="group flex items-center">
        <img class="shrink-0 h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
        <div class="ml-3 rtl:ml-0 rtl:mr-3">
          <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
          <p class="text-sm font-medium text-gray-500 group-hover:text-gray-700">Director of Operations</p>
        </div>
      </div>
    </div>
    <div dir="rtl">
      <p class="mb-4 text-sm font-medium text-gray-500">Right-to-left</p>
      <div class="group flex items-center">
        <img class="shrink-0 h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1563833717765-00462801314e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
        <div class="ml-3 rtl:ml-0 rtl:mr-3">
          <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">تامر كرم</p>
          <p class="text-sm font-medium text-gray-500 group-hover:text-gray-700">الرئيس التنفيذي</p>
        </div>
      </div>
    </div>
  </div>
</div>
```html
<div class="group flex items-center">
  <img class="shrink-0 h-12 w-12 rounded-full" src="..." alt="" />
  <div class="ltr:ml-3 rtl:mr-3">
    <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">...</p>
    <p class="text-sm font-medium text-gray-500 group-hover:text-gray-700">...</p>
  </div>
</div>
```
点 [RTL support](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support) 去看吧。

## portrait 和 landscape 修饰符（横/竖屏修饰符）
当视口处于特定的方向时，通过使用新的 **portrait**、**landscape** 修饰符来添加不同的样式效果：
```html
<div>
  <div class="portrait:hidden">
    <!-- ... -->
  </div>
  <div class="landscape:hidden">
    <p>
      This experience is designed to be viewed in landscape. Please rotate your
      device to view the site.
    </p>
  </div>
</div>
```
[这个功能的文档](https://tailwindcss.com/docs/hover-focus-and-other-states#viewport-orientation)甚至比我在这里写的还要少。

## 支持任意属性
虽然好像不太应当，但是我们还是让添加任意属性值成为了可能，你可以通过这种方式将 **hover**、**lg** 等属性类结合使用：
```html
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>
```
这就是那些内联样式梦寐以求的模样，看看[它们的文档](https://tailwindcss.com/docs/adding-custom-styles#arbitrary-properties)。

## 通过 CDN 使用
由于我们实在无法为 Tailwind CSS v3.0 构建一个基于 CSS 的 CDN 链接，所以我们另辟蹊径 —— 构建了一个 Tailwind CSS v3.0 的 JavaScript 库（笑哭）：
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Example</title>
    <script src="https://cdn.tailwindcss.com/"></script>
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```
将这个脚本链接到任何的 HTML 中，你就可以在浏览器中使用所有 Tailwind 功能。当然它最好仅用于开发环境中，不过这的确是一种构建小 Demo 或耍聪明搞搞新意思的有趣方式。
在[文档](https://tailwindcss.com/docs/installation/play-cdn)中了解更多信息。

这就是 —— Tailwind CSS v3.0！立刻开冲它的文档的[船新版本](https://tailwindcss.com/)！今天就用它码起来！
所有更新项的完整列表请移步 [GitHub changelog](https://github.com/tailwindlabs/tailwindcss/blob/master/CHANGELOG.md)。
