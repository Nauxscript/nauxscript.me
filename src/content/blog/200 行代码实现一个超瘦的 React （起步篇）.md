> 'Hi, my name is, what?',
> 'My name is, who?',
> 'My name is, chka-chka',
> 'Slim React! 🤣' 

> 月更计划 2/1

每每看到好兄弟们的内推、平台上的职位要求，大都是“深入了解框架原理”之类的要求，苦于自己作为一个菜鸟，看源码是不可能看源码的，先不说看不看的懂，甚至也看不下去；恰好 [@阿崔cxr](https://github.com/cuixiaorui) 大佬拉着一群哥们搞了个 7 天打卡手写一个简单的 `Mini-React` 的活动，本着学点，反正学不进多少的态度，就跟着一步步写完了这个小项目。鉴于这个 `Mini-React` 相比 [@阿崔cxr](https://github.com/cuixiaorui) 大佬之前做的 `Mini-Vue` 项目，实在是 mini 太多，我更愿意称我的这个项目为 `Slim-React` 🤪。

`Slim-React` 的仓库地址: [https://github.com/Nauxscript/slim-react](https://github.com/Nauxscript/slim-react)，如果有疑问的可以查阅代码或者留下你的 issue，哪怕是动动发财的手指点个不要钱的 ⭐ 和 follow 一下呢~

那直入今天正题：

<b><font bold size="5">
“如何用 200 行代码实现一个超瘦的 React ?”
</font></b>

## 简单组件渲染

首先，去 [`React` 官网](https://react.dev/)看看文档最简单使用方式；其示例代码如下：

```js
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```
可以看到，其大概意思是：需要指定一个页面的已有的节点（以上的 `<div id="app"></div>`）作为 `React` 挂载的根容器。创建 `React` 的根容器使用 `createRoot` ，挂载使用 `root.render`。

那对于我们来说，第一步首先是创建一个叫做 `createRoot` 的方法，这个方法接收一个真实节点，返回一个内部带有 `render` 方法的对象，而 `render` 接收的是一个 `JSX` 组件。

大手一挥：
```js
function createRoot(container) {
  return {
    render(App) {
      //...
    }
  }
}
```

好，很好，这个只有皮包骨的 `React` ~~已经实现了👍~~ 距离目标还远着呢。

这里就有个大问题：如何渲染 `JSX` 组件？

遇到问题的时候，我们可以暂且简化问题，然后简单实现；对于 `JSX` 组件来说，我们可以看看它的本质是什么。打开 [React Playground](https://playcode.io/react) ，在代码声明一个简单组件并输出到控制台查看它的结构：
![image.png](https://nauxscript-blog.oss-cn-hongkong.aliyuncs.com/slim-react-1.png)

可以看到，最终 `JSX` 组件在代码中只是一个对象，看起来是对元素的一个抽象描述。根据 `React` 文档中对 `React Element` 的[描述](https://react.dev/reference/react/createElement#what-is-a-react-element-exactly)： `React Element` 是对用户界面的一部分的轻量级描述。而 `React Element` 可以通过 `React` 的 [`createElement`](https://react.dev/reference/react/createElement#createelement)  方法进行创建。我们可以根据文档尝试在 React Playground 中创建 `<h1>what is JSX Component ?</h1>` 对应的 `React Element`，看看返回的数据的结构是怎么样的：

![image.png](https://nauxscript-blog.oss-cn-hongkong.aliyuncs.com/slim-react-1-2.png)

可以看出，这和上面的 `JSX` 组件输出的结果是一样的。所以我们可以先传递一个 `render` 接收的参数认为是一个 vdom 对象。声明一个伪 `JSX` 组件（`vdom` 对象）:
```js
const fakeComp = {
  type: 'h1',
  props: {
    children: [
      'Hello, Slim-React!'
    ]
  }
}
```
而 `render` 方法需要把这个 `vdom` 最终渲染在页面指定的容器中。简单粗暴，完善一下上面的 `createRoot` :
```js
function createRoot(container) {
  return {
    render(App) {
      const appEl = document.createElement(App.type)
      appEl.innerText = App.props.children
      container.append(appEl)
    }
  }
}
```
如此这般，我们就可以如 `React` 文档所描述那样运行起来了：

```js
const fakeComp = {
  type: 'h1',
  props: {
    children: 'Hello, Slim-React!',
  },
};
// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';
// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(fakeComp);
```
当然，我们真正想要的是渲染 `JSX` 组件。但是在此之前，我们想要更深层地弄清楚 `JSX` 组件最终被转化成的 `vdom` 对象的结构。所以修改一下前面的 React Playground 代码，看看一个稍微复杂的组件是什么样的：

![image.png](https://nauxscript-blog.oss-cn-hongkong.aliyuncs.com/slim-react-2.png)

可以简单总结为以下规律：
- `type` 描述节点标签类型
- `props` 存储当前节点的属性值以及特殊字段 `children`
- `children` 字段存储当前节点的子节点，如果当前节点内部只有一个文本节点，则为字符串类型；否则为数组类型，存储多个节点。

依照以上规律，我们可以调整 `render` 的实现：

```js
export function createRoot(container) {
  return {
    render(App) {
      updateChildren(App, container);
    },
  };
}

function updateChildren(vdom, container) {
  const el = document.createElement(vdom.type);
  
  Object.keys(vdom.props).forEach((key) => {
    if (key === 'children') {
      if (typeof vdom.props[key] === 'string') {
        el.innerText = vdom.props[key];
      } else {
        vdom.props[key].forEach((child) => updateChildren(child, el));
      }
    } else {
      el[key] = vdom.props[key];
    }
  });
  container.append(el);
}
```
`FakeComp` 调整为：
```js
const fakeComp = {
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: {
          id: 'title',
          children: 'Hello, Slim-React!',
        },
      },
      {
        type: 'p',
        props: {
          children: 'oh I see!',
        },
      },
    ],
  },
};
```
这时候我们就能渲染一个比较复杂的 `vdom` 了。

### 简单JSX 支持

既然我们现在已经可以渲染一个稍微复杂的，我们就可以考虑对的 `JSX` 支持了。

对于 `JSX` 的解析，如果你是大佬你当然可以自己手撸一个解析器；考虑到我是一个菜鸡，而恰好 `Vite` 对于 `JSX` 的支持是开箱即用的，遂跟着 [`Vite` 的文档](https://vitejs.dev/guide/) 快速新建一个基于 `vanilla-js` 的工程，再把以上代码迁移到项目的中。

然后就可以把 `fakeComp` 组件改成一个 `JSX` 组件，并把入口文件拓展名改成 `jsx`，此时项目目录结构如下:

![image.png](https://nauxscript-blog.oss-cn-hongkong.aliyuncs.com/slim-react-3.png)

此时运行项目，你会发现页面渲染异常了，控制台输出一个奇怪的错误：

```
Uncaught ReferenceError: React is not defined
```

WTF？我这明明是超瘦的 `slim-react` 啊，为何会对 `React` 有依赖？

这是对于拓展名以 `.jsx / .tsx`  结尾的文件其内部的 `JSX`  语法，`Vite` 会默认使用前面提到的 `React.createElement` 转化为 `vdom`，而此时我们的项目中并没有 `React` 这个依赖，所以会报错。所以，我们可以在 `src` 目录下增加一个 `core.js`，把原来 `slim-react.js` 的代码迁移到 `core.js`，然后吧 `slim-react.js` 作为统一的导出出口；并再增加一个 `createElement` 方法：

```js
// core.js
export function createRoot ....

export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.length > 1 ? children : children[0],
    },
  };
}

function updateChildren ...
```
```js
// slim-react.js
import { createRoot, createElement } from './core';

const React = {
  createRoot,
  createElement,
};

export default React;
```
这样，我们的渲染就成功了！以下是本文的最终示例代码：[slim-react-起步篇示例代码](https://link.juejin.cn/?target=https%3A%2F%2Fstackblitz.com%2Fedit%2Fvitejs-vite-trv1aw%3Ffile%3Dsrc%252Fslim-react.js "https://stackblitz.com/edit/vitejs-vite-trv1aw?file=src%2Fslim-react.js")

到这里，起步篇就结束了。这个阶段，我们先是实现其基本的两个 `API` : `createRoot` 和 `createElement`，并通过分析 `JSX` 在渲染时的实际结构进行了简单的组件渲染逻辑。而下一步，我们会进一步探究 `React` 中的函数组件（`Function Component`）及 `React Fiber` —— 一个贯穿 `React` 的核心概念。

那我们，下次再会。

<p align=center> - To be continued - </p>
