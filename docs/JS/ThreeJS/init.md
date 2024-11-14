# 定义初始化场景模型方法

定义init方法快速构建3D场景

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

function init() {
  // 定义图像尺寸
  const width = 800;
  const height = 600;

  // 创建场景和相机
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
  camera.position.set(100, 100, 100);
  camera.lookAt(0, 0, 0);

  // 创建光源
  const light = new THREE.PointLight(0xffffff, 1, 100);
  const lightHelper = new THREE.PointLightHelper(light, 1);
  light.position.set(100, 100, 100);

  // 实例化三位坐标轴对象
  const axesHelper = new THREE.AxesHelper(1000);
  axesHelper.setColors('#0000ff', '#00DDff', '#DDDDff')

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // 渲染场景内容
  scene.add(light);
  scene.add(lightHelper);
  scene.add(axesHelper);
  renderer.render(scene, camera);

  // 性能监听
  const stats = new Stats();
  // 生成控件，控制相机视角
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 开启阻尼,减缓运动速度，使画面自然

  document.body.appendChild(renderer.domElement);
  document.body.appendChild(stats.dom);

  function render() {
    renderer.render(scene, camera);
    stats.update();
    requestAnimationFrame(render);
  }
  render();

  return {
    scene,
    camera,
    light
  }
}

// 初始化场景
const {scene, camera, light} =  init();

console.log(scene, camera, light);

```

::: details index.html
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>scene</title>
  <style>
    body{
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #d3d3d3;
    }
  </style>
</head>
<body>
  <script type="module" src="./index.js"></script>
</body>
</html>
```
:::
