# 初始化一个3D场景
---

通过以下代码可以得到一个3D场景，并且获得一个可以操控的模型

::: warning 注意
- THREE 是Three.js库的核心模块。
- OrbitControls 是一个用于控制相机的控件，允许用户通过鼠标拖动来旋转、缩放和移动相机。
- Stats 是一个用于性能监控的库，可以显示帧率等性能数据。
:::

**index.js**
```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

console.log(THREE.Scene);

// 定义图像尺寸
const width = 800;
const height = 600;

// 实例化3D场景对象
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
console.log(scene);

// 创建光源
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(100, 100, 100);
light.decay = 0.3;
light.intensity = 10
scene.add(light);

// 可视化光源
const lightHelper = new THREE.PointLightHelper(light, 10);
scene.add(lightHelper);

// 实例化三位坐标轴对象
const axesHelper = new THREE.AxesHelper(1000);
axesHelper.setColors('#00DDff','#00DDff','#00DDff')
scene.add(axesHelper);

// 创建一个立方体几何体,参数依次为: w h d 
const geometry = new THREE.BoxGeometry(50, 50, 50);
console.log(geometry);

// 导入材质纹理
const img = await import('./img.jpg');
const textcure = new THREE.TextureLoader().load(img.default);
console.log(img);
// 创建材质
const material = new THREE.MeshToonMaterial({
  map: textcure,
  // emissive : new THREE.Color(0xffffff),
  // color: new THREE.Color(0xcce0ff),
  emissiveMap: textcure,
});

console.log(material);

// 创建网格模型
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
console.log(mesh);

// 随机位置生成指定数量的立方体
function createCube(num) {
  for (let i = 0; i < num; i++) {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), material);
    cube.position.set(Math.random() * 50 + 50, Math.random() * 50 + 50, Math.random() * 50 + 50);
    scene.add(cube);
  }
}
createCube(2000)

// 将网格模型添加到场景中
scene.add(mesh);

// 创建透视相机对象
const option = {
  fov: 45, // 视野角度，值越大，看到的区域越大
  aspect: width / height, // 图像长宽比，通常设置为画布的宽高比
  near: 1, // 近端面 距离相机的距离
  far: 3000 // 远端面 距离相机的距离
}
const camera = new THREE.PerspectiveCamera(option.fov, option.aspect, option.near, option.far);
camera.position.set(200, 200, 200);
// camera.lookAt(0, 0, 0);//设置相机视点 坐标原点
camera.lookAt(mesh.position);// 看向网格模型
console.log(camera);

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);// 设置渲染器尺寸
renderer.render(scene, camera);// 渲染场景和相机

console.log(renderer);

// 将渲染器添加到页面中
document.body.appendChild(renderer.domElement);// renderer.domElement是canvas元素(渲染出来的图像)
renderer.domElement.addEventListener('fullscreenchange',(e)=>{
  console.log(e);
})
renderer.domElement.addEventListener('contextmenu',(e)=>{
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    renderer.domElement.requestFullscreen();
  }
})

// 记录相机位置
const x = document.createElement('span');
x.style.position = 'absolute';
x.style.left = 'calc(100vw - 200px)';
x.style.top = '0';
let v = 1;
document.body.appendChild(x);

const colorSelector = document.createElement('input');
colorSelector.type = 'color';
colorSelector.value = '#66ff00';
document.body.appendChild(colorSelector);
colorSelector.addEventListener('change', function () {
  material.emissive = new THREE.Color(colorSelector.value);
})

// 性能监听
const stats = new Stats();
document.body.appendChild(stats.dom);

// 渲染循环
function render() {
  renderer.render(scene, camera);// 渲染场景和相机
  // mesh.rotation.x += 0.01;// 变换模型
  // mesh.rotation.y += 0.01;// 变换模型
  if (camera.position.x > 300) {
    v = -1;// 变换相机移动方向
  } 
  if (camera.position.x < 100) {
    v = 1;// 变换相机移动方向
  }
  // camera.position.x += v;// 变换相机
  // camera.position.y += v;// 变换相机
  // camera.position.z += v;// 变换相机
  x.innerText = `相机位置：${Math.floor(camera.position.x)} ${Math.floor(camera.position.y)} ${Math.floor(camera.position.z)}`;
  stats.update();// 更新性能监听
  requestAnimationFrame(render);// 请求下一帧
}
render();

// 键盘监听,控制模型移动
window.addEventListener('keydown', (e) => {
  console.log(e.key);
  if (e.key === 'ArrowUp') {
    mesh.position.z -= 10;
  }
  if (e.key === 'ArrowDown') {
    mesh.position.z += 10;
  }
  if (e.key === 'ArrowLeft') {
    mesh.position.x -= 10;
  }
  if (e.key === 'ArrowRight') {
    mesh.position.x += 10;
  }
  if( e.key === ' ') {
    mesh.position.y += 10;
  }
  if( e.key === 'Shift') {
    mesh.position.y -= 10;
  }
})

// 使用控件扩展
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 开启阻尼,减缓运动速度，使画面自然

``` 

---

**img.jpg:**
![img](./img.jpg)

---

::: details index.html

```html
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