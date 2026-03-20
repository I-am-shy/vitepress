# gsap

## 简介

[gsap](https://gsap.com/docs) 是一个 JavaScript 的动画库，它提供了大量插件可以创建很多复杂的动画效果（例如，滚动、拖拽、变形等）。它包含了以下几个部分：

- GSAP Core : 核心库，提供了动画的基本功能。
- Scroll Plugins : 滚动插件，提供了滚动动画的功能。
- Text Plugins : 文本插件，提供了文本动画的功能。
- SVG Plugins : SVG 插件，提供了 SVG 动画的功能。
- UI Plugins : UI 插件，提供了 UI 动画的功能。
- Eases : 缓动函数，提供了缓动函数的功能。
- React Hooks: React 钩子，适配 React 组件使用动画功能。

> [!NOTE]
> 一句话概括 GSAP : **Animate Anything** 。关于动画的一切都能在 GSAP 中找到。

## 安装和引入

```bash
npm install gsap
```

```ts
import gsap from "gsap";
```

## 核心用法

`gsap.Methods(target,variables)` 是 GSAP 动画的语法结构。

- `Methods` : 动画方法，可以是 `to`、`from`、`fromTo`、`set`。
- `target` : 动画目标，可以是 DOM 元素、CSS 选择器、js 对象等。
- `variables` : 参数配置，包含动画目标的关键帧属性和 gsap 的配置。


### Methods

1. to : 动画目标从初始值变化到目标值。
```ts
// 0 -> 100
gsap.to('#box',{
  x: 100, // transform: translateX(100px);
  duration: 1, // 动画持续时间
  ease: 'power2.inOut' // 缓动函数
})
```
2. from : 动画目标从目标值变化到初始值。
```ts
// 100 -> 0
gsap.from('#box',{
  x: 100, // transform: translateX(100px);
  duration: 1, // 动画持续时间
  ease: 'power2.inOut' // 缓动函数
})
```
3. fromTo : 动画目标从初始值变化到目标值。
```ts
// 50 -> 100
gsap.fromTo('#box',
  { // 初始值
    x: 50, // transform: translateX(50px);
    duration: 1, // 动画持续时间
    ease: 'power2.inOut' // 缓动函数
  },
  { // 目标值
    x: 100, // transform: translateX(100px);
    duration: 1, // 动画持续时间
    ease: 'power2.inOut' // 缓动函数
  }
)
```
4. set : 动画目标设置为指定值。
```ts
// 设置为 100 , 无动画效果（变化过程）
gsap.set('#box',{
  x: 100, // transform: translateX(100px);
})
```
### Target
`target` 是动画目标，可以是 DOM 元素、CSS 选择器、js 对象等。

```ts
// dom
const box = document.querySelector('#box');
gsap.to(box,{
  x: 100, // transform: translateX(100px);
})

// css 选择器
gsap.to('#box',{
  x: 100, // transform: translateX(100px);
})

// js 对象
const obj = {count: 0};
gsap.to(obj,{
  count: 100, // count: 100;
})
```

### Variables
`variables` 是参数配置，包含动画目标的关键帧属性和 gsap 的配置。

- 动画对象的关键帧属性： 当 `target` 是 DOM 元素或 CSS 选择器时，会映射到 css 属性。例如，`x` --> `transform: translateX();`，`xPercent` --> `transform: translateX();`。
- js 对象的关键帧属性： 当 `target` 是 js 对象时，包含js 对象的属性。
- gsap 的特殊配置：
  * duration : 动画持续时间
  * ease : 缓动函数 
  * delay : 动画延迟时间
  * repeat : 动画重复次数，-1 表示无限重复
  * yoyo : 动画是否往返
  * stagger : 动画步长
  * callback : 回调函数，监听动画。
    ```ts
    type CallbackType = "onComplete" | "onInterrupt" | "onRepeat" | "onReverseComplete" | "onStart" | "onUpdate";
    ```

## 时间线

timeline 是 gsap 的一个强大排序工具，可以用来组合、管理多个动画的序列，使其易于整体控制并精确管理其时间。多个动画组合成的复杂动画中非常实用。

**无时间线**：

```ts
gsap.to('#box',{x: 100,duration: 1})
gsap.to('#box',{x: 200,duration: 1,delay: 1})
gsap.to('#box',{y: 100,duration: 1,delay: 2})
```

**有时间线**：

```ts
const timeline = gsap.timeline({default: {duration: 1}});
timeline.to('#box',{x: 100},)
timeline.to('#box',{x: 200},">") // > 表示在上一个动画完成后执行
timeline.to('#box',{y: 100},">")
```


### 使用方法
`timeline.Methods(target,variables,options)` 是时间线的语法结构。

- `Methods` : 动画方法。
- `target` : 动画目标。
- `variables` : 参数配置。
- `options` : 动画顺序配置。传入 number 和 string 排序动画。
  * number : 表示在时间线的第几秒执行。`1` 表示在时间线的第 1 秒执行。
  * string : 表示动画的顺序。 `>`: 表示在上一个动画完成后执行。`<`: 表示在上一个动画开始时执行。`+=N`: 表示在上一个动画完成后的第 N 秒执行。`-=N`: 表示在上一个动画完成前的第 N 秒执行。`+=50%`: 表示在上一个动画完成后等待上一个动画时长的 50% 后执行。

**示例**：

```ts 
const tl = gsap.timeline();
tl.to('#box',{x: 100},0.5) // 动画 1 在时间线的 0.5 秒执行
tl.to('#box',{x: 200},"+=1") // 动画 2 在上一个动画完成后 1 秒（时间线的 1.5 秒处）执行
tl.to('#box',{y: 100},"<") // 动画 3 在动画 2 开始时（时间线的 1.5 秒处）执行

// 支持链式调用
tl.to('#box',{x: 300}).to('#box',{y: 200},">"); 
```

## 参考

- [GSAP 官方文档](https://gsap.com/docs)
- [gsap使用教程](https://juejin.cn/post/7430728300601868288)