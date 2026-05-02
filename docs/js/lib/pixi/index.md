# Pixi.js

## 简介

[Pixi.js](https://www.pixijs.com/) 是浏览器的 2D 渲染引擎，基于 WebGL 和 WebGPU 构建，可用于制作高性能、视觉效果丰富的应用。它相当于封装了 canvas 和 WebGL 的 API，提供了更高级的 API 和功能。



## 安装

```bash
npm install pixi.js
```

ESM 导入：
```ts
import * as PIXI from 'pixi.js';
```

浏览器可直接通过 CDN 引入：

```html
<script src="https://cdn.jsdelivr.net/npm/pixi.js@7.0.0/dist/pixi.min.js"></script>
```

## 快速开始

通过交互式命令行工具创建一个 PixiJS 应用：

```bash
npm create pixi.js@latest
```



## 核心概念


| 组件 | 描述 |
| --- | --- |
| 渲染器（Renderer） | PixiJS系统的核心是渲染器，它负责展示场景图并将其绘制到屏幕上。PixiJS 会在底层自动判断为你提供 WebGPU 还是 WebGL 渲染器。 |
| 容器（Container） | 用于创建场景图的主场景对象：场景图是待展示的可渲染对象树，例如精灵、图形和文本。详情请参见场景图相关内容。 |
| 资源（Assets） | 资源系统提供用于异步加载图片、音频文件等资源的工具。 |
| 计时器（Ticker） | 计时器基于时钟提供周期性回调。你的游戏更新逻辑通常会在每一帧响应一次计时信号来运行。你可以同时使用多个计时器。 |
| 应用程序（Application） | 应用程序是一个简易的辅助工具，它将加载器、计时器和渲染器封装成一个便捷易用的单例对象。 |
| 事件（Events） | PixiJS 支持基于指针的交互——实现对象可点击、触发悬停事件等功能。 |
| 滤镜（Filters） | PixiJS 支持多种滤镜，包括自定义着色器，可对可渲染对象应用各类视觉效果。 |



## 示例

以下是一个闪烁的兔子：

```ts
import { Application, Assets, Sprite, Text ,type Ticker } from "pixi.js";

(async () => {
  // 创建一个新应用程序
  const app = new Application();

  // 初始化应用程序
  await app.init({ background: "#1099bb", resizeTo: window });

  // 将应用程序画布附加到文档主体
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // 加载兔子纹理
  const texture = await Assets.load("/assets/bunny.png");

  // 创建一个兔子精灵
  const bunny = new Sprite(texture);

  // 将精灵的锚点设置为中心
  bunny.anchor.set(0.5);

  bunny.setSize(100, 100);

  // 将精灵移动到屏幕中心
  bunny.position.set(app.screen.width / 2, app.screen.height / 2);
  
  // 将兔子添加到舞台
  app.stage.addChild(bunny);
  
  const fps = new Text();

  app.stage.addChild(fps);
  app.ticker.minFPS = 30;
  app.ticker.maxFPS = 60;

  
  function operation(time: Ticker): void {
    // 只是为了好玩，让我们稍微旋转一下兔子。
    // * 如果以100%性能运行，则Delta为1 *
    // * 创建帧独立的变换 *
    // * Delta是1，如果以100%性能运行 *
    bunny.alpha = 0.5 + Math.abs(Math.sin(time.lastTime / 150)) * 0.5;
  }
  
  // 监听动画更新 
  app.ticker.add(operation);

  // app.ticker.remove(operation);

  setInterval(() => {
    // 每500毫秒更新一次FPS
    fps.text = `FPS: ${Math.round(app.ticker.FPS)}`;
  }, 500);


  // 将舞台事件模式设置为静态，开启事件监听模式
  app.stage.eventMode="static" 
  // 监听点击事件
  app.stage.on('click', () => {
    console.log(app.ticker.FPS);
  });

})();





```