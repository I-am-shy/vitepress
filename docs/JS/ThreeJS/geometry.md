# 模型实例--- 几何矩阵


**效果展示**

![效果展示](./example.gif)

**代码如下：**

:::details 示例代码
```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

function init() {
  // 定义图像尺寸
  const width = 800;
  const height = 600;

  // 创建场景和相机
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
  camera.position.set(100, 100, 100);
  camera.lookAt(0, 0, 0);

  // 创建光源
  const light = new THREE.PointLight(0xffffff, 5, 1000);
  const lightHelper = new THREE.PointLightHelper(light, 1);
  light.position.set(100, 100, 100);
  light.decay = 0.1;// 

  // 实例化三位坐标轴对象
  const axesHelper = new THREE.AxesHelper(1000);
  axesHelper.setColors('#0000ff', '#00DDff', '#DDDDff')

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias: true // 抗锯齿
  });
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
  controls.enableDamping = true; // 开启阻尼,减缓视角移动速度，使画面自然
  // controls.target.set(500,5,500)

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
    light,
    controls
  }
}

// 初始化场景
const { scene, camera, light, controls } = init();
// console.log(scene, camera, light);

// 创建材质
const material = new THREE.MeshToonMaterial({
  color: 0x00BBff,
  // emissive: 0x00BBff,
  transparent: true,
  opacity: 0.5
});
const highLightMaterial = new THREE.MeshPhongMaterial({
  shininess: 100,// 光泽度
  specular: 0x00BBff, // 高光颜色
})

// 创建几何体
const size = 10;
const geometry = new THREE.BoxGeometry(size, size, size);

function createGrid(num) {
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      // 创建网格模型
      if (i === 0 || j === 0) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(size / 2 + size * i * 1.5, size / 2, size / 2 + size * j * 1.5)
        scene.add(mesh);
      } else {
        const mesh = new THREE.Mesh(geometry, highLightMaterial);
        mesh.position.set(size / 2 + size * i * 1.5, size / 2, size / 2 + size * j * 1.5)
        scene.add(mesh);
      }

    }
  }

}

createGrid(100)

let position = {
  x: 0,
  z: 0,
  y: 5
}
const p = new Proxy(position, {
  set(target, key, value) {
    const res  = Reflect.set(target, key, value);
    camera.lookAt(position.x, position.y, position.z);
    controls.target.set(position.x, position.y, position.z);
    return res;
  }
})

window.addEventListener('keydown', (e) => {
  if (e.key === 's') {
    position.x++;
    position.z++;
  }
  if (e.key === 'w') {
    position.x--;
    position.z--;
  }
  camera.lookAt(position.x, position.y, position.z);
  controls.target.set(position.x, position.y, position.z);
})

const gui = new GUI({
  title: '控制参数'
});
const subGui = gui.addFolder('视角参数');// 添加子菜单

// 设置步长，设置别名，设置事件监听,设置颜色
subGui.add(p, 'x', 0, 500).name('视焦x轴').step(1);// 进度条0到500
subGui.add(p, 'y', 0, 500).name('视焦y轴');
subGui.add(p, 'z', 0, 500).name('视焦z轴').onChange((val) => {
  console.log('change',val)
});// 修改触发的回调
subGui.close();// 默认收起子菜单

gui.addColor(material,'color').name('外圈颜色');
gui.addColor(highLightMaterial,'color').name('内部颜色');// 颜色选择器
gui.add(light,'intensity',[0,5,10,20]).name('光照强度');// 下拉选择
gui.add(light,'intensity',{
  '弱光': 0.5,
  '标准': 5,
  '强光': 10
}).name('光照强度');// 下拉选择
gui.add(controls,'enableDamping',true).name('阻尼效果');

```
:::
