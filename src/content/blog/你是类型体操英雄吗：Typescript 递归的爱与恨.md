---
layout: ../../layouts/BlogLayout.astro
title: 你是类型体操英雄吗：Typescript 递归的爱与恨
createAt: 2024-03-06 18:27:23
updateAt: 2024-03-06 18:27:23
tags: ["Front-End", "Typescript"]
---

> 月更 1/2

众所周知，`Javascript` 是一门弱类型语言，各方程序员亲切称他为 "残疾"语言，笔者称其是“哑巴”，因为稍不留神，我们就会中了他的“陷阱”，如吃了黄连一般有苦难言。

因此，社区给我们带来了 `Typescript`。但是，`Tyepscript` 虽说自己的类型系统是一个图灵完备的，但是那令人捉狂的类型体操，每每遇到一些抽象封装的函数类型，都会给人一种 “马什么梅”的懵逼感，故笔者称他为“傻子”。

说这么多只是为了发这张图🤣：

 ![ fool-and-mute.gif](https://nauxscript-blog.oss-cn-hongkong.aliyuncs.com/%20fool-and-mute.gif)

而前阵子刷 [TypeHero](https://typehero.dev/) 的时候，就深感懵逼；有一种要在💩上雕出花的无力感。但鉴于 `Tyepscript` 在大型项目中的重要性以及作为面试的必备，咱也不敢不学啊；也遇到了不少很有启发意义的题目，以下就是一题常规而又 “奇技淫巧” 的题目。

> 顺便一提，[TypeHero](https://typehero.dev/) 是一个去年末上线的应用，可以在上面刷各种等级的类型体操题目；大部分的题目都是来自 [type-challenges](https://github.com/type-challenges/type-challenges) 这个仓库，但是 TypeHero 提供了一个在线的 Playground，可以在网页上进行挑战，还可以分享你的解法，并且 TypeHero 还有一些非常有趣的题目：圣诞主题天梯赛。这个是去年 12 月开启的，每天一道题目，由易到难，越后面越变态，什么用 `Tyepscript` 实现五子棋、数独、迷宫诸如此类的题，有兴趣的可以体验一下。

## 题目：指定深度拍平

描述：要求把所有的深嵌套数组类型按指定的深度进行拍平，如：

```ts
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. 深度为2，拍平两层
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. 默认拍平深度为 1
```

如果提供了深度，则保证为正整数。

这是测试 Cases：

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]
```
## 思路

首先，我们可以忽略 `Dept` 参数，简单地将数组拍平 `1` 层，如下所示：

```ts
type FlattenDepth<
	T extends any[], 
	Dept = 1, 
	Result extends any[] = []
> = T extends [infer F, ...infer R] 
			? FlattenDepth<R, Dept, [...Result, ...(F extends any[] ? F : [F])]> 
			: Result
```

第一步的处理很简单，就是遍历数组的每个元素，如果当前元素是数组，则使用扩展运算符展开，否则，不处理；这就实现了简单地把目标数组拍平一层。如 `[1, [2]]` 会被处理成 `[1, 2]`。

那接下来，就是处理这个外部提供的深度。对于这个深度，用非代码来描述就是，每次拍平一层，就累加 1，当已经拍平的层数和提供的层数相同，就停止处理，返回被拍平过的数组即可。

那么，问题来了：我们应该如何在 `TypeScript` 中比较数字？

众所周知，`Typescript` 中并不能直接比较数字的大小，因为对应一个类型来说，`1` 和 `2` 又何来大小之分呢 🤣。所以就需要一些曲线救国的方式，比如下面这个有趣的方法：

```ts
// 如果元组的长度为 2，则返回
type Arr1 = [1]
type Arr2 = [1, 2]

type Magic<T extends any[]> = T['length'] extends 2 ? T : never

type Result1 = Magic<Arr1> // never
type Result2 = Magic<Arr2> // [1, 2]
```

所以，我们可以通过声明一个泛型  `DeptArr` ，专门用来记录当前的深度；每进行一次拍平，使目标类型的深度减 `1`，则在  `DeptArr` 中添加一个元素，此时它的长度就增加了 `1`，这样我们在递归中就能判断当前拍平了多少层了。

如此这般，我们改进一下上面第一版的方法，变成以下版本：

```ts
type FlattenDepth<
	T extends any[],
	Dept = 1,
	DeptArr extends any[] = [],
	Result extends any[] = []
> = T extends [infer F, ...infer R] 
			? FlattenDepth<R, Dept, DeptArr, [...Result, ...(F extends any[] ? F : [F])]> 
			: [...DeptArr, 1]['length'] extends Dept 
				? Result 
				: FlattenDepth<Result, Dept, [...DeptArr, 1]>
```

乍一看，从前面的思路出发，好像也没什么问题。但是当我们观察测试 Cases 的时候，会发现最后一个 Case 飘红，报了如下错误：

```
Type instantiation is excessively deep and possibly infinite.
```

在一些情况下，当递归 / 循环深度过大的时候，`Typescript` 会觉得我们的代码陷入了无限的递归，于是给我们抛出以上的错误。归根结底，是因为最后一个 Case 中的拍平深度 `19260817` 过大；据观察，深度超过 `167` 就会报错（不确定是不是不同版本的 `Typescript` 的限制不一样) 。

所以为了要让测试通过，我们需要做个判断：如果当前被处理过的目标数组的所有元素都不是数组了，那就退出递归，返回最终结果，这样就可以防止最后一个 Case 的无限递归报错。

## 最终答案

```ts
type FlattenDepth<
	T extends any[],
	Dept = 1,
	DeptArr extends any[] = [],
	Result extends any[] = []
> = T extends [infer F, ...infer R] 
			? FlattenDepth<R, Dept, DeptArr, [...Result, ...(F extends any[] ? F : [F])]> 
			: [...DeptArr, 1]['length'] extends Dept 
				? Result 
				: Result[number] extends number 
					? Result 
					: FlattenDepth<Result, Dept, [...DeptArr, 1]>

```

> 笔者的 [原帖链接](https://typehero.dev/challenge/flattendepth/solutions/825)

## 总结

通过这个题目，我们可以发现，在 `Tyepscript` 中进行递归时，有可能会导致一些奇怪的问题，虽说这个题目中的使用场景，在日常开发中是遇不上的，但是也有可能某天在封装一些复杂组件时，就遇上了，所以要留个心眼。

另一方面也让笔者更明白了一点：边界问题是在某些特殊的情况才会发生，但是却可能对整体的系统造成巨大的影响；虽然边界问题没有最周全，只有更周全，但也提醒着我们，要在写代码的过程中多多注意边界问题，否则有可能造成不可挽回的后果。
