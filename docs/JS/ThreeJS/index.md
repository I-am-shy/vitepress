# threejs的基本概念
---

[`ThreeJS`](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene) 是一个基于原生WebGL封装的JavaScript库，它提供了许多有用的功能，如3D几何体、材质、光照、相机等，使得在Web上创建3D图形变得简单，查看[视频教程](https://www.bilibili.com/video/BV14r4y1G7h4/?spm_id_from=333.788.top_right_bar_window_custom_collection.content.click&vd_source=82be7b4a45ef5d3451729637f63ac292)。


构建一个3d场景需要以下几步：
1. 创建一个场景（作为一切内容的容器）
2. 创建一个相机（展示内容的对象，对应页面展示的图像）
3. 创建一个渲染器（将场景呈现的对象，渲染3d场景）
4. 创建一个几何体（模型的几何数据---‘骨骼’）
5. 创建一个材质（模型的表面展示---‘外皮’）
6. 通过集合体和材质（2者缺一不可）创建一个模型（网格，点，线）
7. 将模型（需要展示的3d数据）添加到场景中
8. 渲染场景


## threejs的坐标系
threejs使用右手坐标系，即x轴正向指向右，y轴正向指向上，z轴正向指向屏幕外。


## 初始化ThreeJS 项目

安装必要的包
```bash
# three.js
npm install --save three

# vite
npm install --save-dev vite

```

运行项目  （npx 与 Node.js 一起安装，并运行 Vite 等命令行程序，这样您就不必自己在node_modules/中搜索正确的文件。如果您愿意，可以将Vite 的常用命令放入 package.json :scripts列表中，并使用npm run dev代替。）

```bash
npx vite

```
