# js动画库 popmotion
## 简介
[popmotion](https://github.com/Popmotion/popmotion#the-animators-toolbox)是：

- 功能强大：支持数字、颜色和复杂字符串的关键帧和弹簧动画。
- 低级：它被设计为可组合和可移植到任何 JavaScript 环境中，并着眼于未来的 Worklets。
- 稳定：它是用 TypeScript 编写的，并享有超过 95% 的测试覆盖率。
- Tiny：只有 ~4.5kb，并且每个函数都可以单独导入。animate



## 安装

```bash
npm install popmotion
```



## 原理

根据初始参数值 **变化到** 目标参数值，期间不断触发更新函数从而实现动画效果，同时可以通过其他参数来控制变化过程。

## 示例

**index.js:**
```js 
import { animate,easeInOut } from "popmotion";

const num = document.querySelector("#number");

const control=animate({ // 返回动画控制对象，包含一个stop方法，用来停止动画
  from:0, // 初始值
  to: 100, // 目标值
  repeat:2, // 重复次数
  repeatType: "reverse", // 重复类型，reverse表示反向重复
  duration: 3000, // 动画持续时间
  ease: easeInOut, // 动画缓动函数, 缓入缓出 (同css，也可以使用贝塞尔曲线函数cubicBezier)
  onUpdate: value => { // 动画更新时（数值变化）的回调函数 --- 用来产生副作用
    num.textContent = value.toFixed(0) + "%"
  },
  onPlay: () => { // 动画开始时的回调函数
    
  },
  onComplete: () => { // 动画结束时的回调函数
    
  },
  onStop: () => { // 动画停止时的回调函数
    
  }
})

window.addEventListener("keydown", e => {
  if (e.key === " ") {
    control.stop(); // 停止动画
  }
})

```

:::details index.html
```html 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>动画</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #3e3e3e;
    }
    #number {
      font-size: 100px;
      font-weight: bold;
      color: #ffffff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  </style>
</head>
<body>

  <span id="number">0%</span>
  <script type="module" src="animation.js"></script>
</body>
</html>
```
:::

