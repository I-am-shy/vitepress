# robotjs
---

`robotjs` 是一个用于 Node.js 的跨平台库，它允许你在桌面环境中模拟鼠标、键盘操作，以及获取屏幕信息等。 它的原理是将 c++ 的库编译成 node 的模块，所以需要提前准备好 c++ 的编译环境。

## 安装
使用 npm 进行安装：
```bash
npm install robotjs
```

:::warning 注意
在不同的平台需要提前准备好 robotjs 需要的依赖环境，否则无法安装。请在安装前确保你已拥有所需的依赖项：

- Windows
  - windows-build-tools npm 包 (从提升权限的 PowerShell 或 CMD.exe 运行 npm install --global --production windows-build-tools)。
- Mac
  - Xcode 命令行工具。
- Linux
  - Python（建议使用 v2.7，v3.x.x 不被支持）。
  - make。
  - 像 GCC 这样的 C/C++ 编译器。
  - libxtst-dev 和 libpng++-dev (sudo apt-get install libxtst-dev libpng++-dev)。
:::


## `robotjs` 的常用 API 及使用方法

### 鼠标操作
- **移动鼠标**
    - **API**：`robot.moveMouse(x, y)`
    - **参数**：`x` 和 `y` 是鼠标要移动到的屏幕坐标。
    - **示例**：
```javascript
const robot = require('robotjs');

// 将鼠标移动到屏幕坐标 (100, 100)
robot.moveMouse(100, 100);
```
- **平滑移动鼠标**
    - **API**：`robot.moveMouseSmooth(x, y)`
    - **参数**：`x` 和 `y` 是鼠标要移动到的屏幕坐标，该方法会平滑地移动鼠标。
    - **示例**：
```javascript
const robot = require('robotjs');

// 平滑地将鼠标移动到屏幕坐标 (200, 200)
robot.moveMouseSmooth(200, 200);
```
- **鼠标点击**
    - **API**：`robot.mouseClick(button, double)`
    - **参数**：`button` 可选值为 `'left'`、`'right'` 或 `'middle'`，默认为 `'left'`；`double` 为布尔值，表示是否为双击，默认为 `false`。
    - **示例**：
```javascript
const robot = require('robotjs');

// 鼠标左键单击
robot.mouseClick();

// 鼠标右键双击
robot.mouseClick('right', true);
```
- **按下鼠标按钮**
    - **API**：`robot.mouseToggle(down, button)`
    - **参数**：`down` 为字符串，`down` 表示按下，`up` 表示释放；`button` 可选值为 `'left'`、`'right'` 或 `'middle'`，默认为 `'left'`。
    - **示例**：
```javascript
const robot = require('robotjs');

// 按下鼠标左键
robot.mouseToggle(true);

// 释放鼠标左键
robot.mouseToggle(false);
```
- **获取鼠标位置**
    - **API**：`robot.getMousePos()`
    - **返回值**：返回一个包含 `x` 和 `y` 属性的对象，表示鼠标当前的屏幕坐标。
    - **示例**：
```javascript
const robot = require('robotjs');

const mousePos = robot.getMousePos();
console.log(`鼠标当前位置：X: ${mousePos.x}, Y: ${mousePos.y}`);
```

### 键盘操作
- **按键按下**
    - **API**：`robot.keyTap(key, modifiers)`
    - **参数**：`key` 是要按下的键名，如 `'a'`、`'enter'` 等；`modifiers` 是一个包含修饰键的数组，如 `['control', 'shift']`。
    - **示例**：
```javascript
const robot = require('robotjs');

// 按下 'a' 键
robot.keyTap('a');

// 按下 Ctrl + C 组合键
robot.keyTap('c', ['control']);
```
- **输入文本**
    - **API**：`robot.typeString(string)`
    - **参数**：`string` 是要输入的文本。
    - **示例**：
```javascript
const robot = require('robotjs');

// 输入文本 "Hello, World!"
robot.typeString('Hello, World!');
```

### 屏幕信息
- **获取屏幕尺寸**
    - **API**：`robot.getScreenSize()`
    - **返回值**：返回一个包含 `width` 和 `height` 属性的对象，表示屏幕的宽度和高度。
    - **示例**：
```javascript
const robot = require('robotjs');

const screenSize = robot.getScreenSize();
console.log(`屏幕尺寸：宽度 ${screenSize.width}，高度 ${screenSize.height}`);
```
- **获取指定像素的颜色**
    - **API**：`robot.getPixelColor(x, y)`
    - **参数**：`x` 和 `y` 是屏幕上像素的坐标。
    - **返回值**：返回一个十六进制字符串，表示该像素的颜色。
    - **示例**：
```javascript
const robot = require('robotjs');

const color = robot.getPixelColor(100, 100);
console.log(`坐标 (100, 100) 处的像素颜色：${color}`);
```


## 示例代码

通过 robotjs 实现自动截屏和获取屏幕像素

:::warning 注意
需要注意的是，robotjs 的 API 都是同步代码会阻塞主线程
:::

```javascript
const robot = require('robotjs')

console.log(robot)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mousePos = robot.getMousePos()
const screenSize = robot.getScreenSize()

// 剪切屏幕
async function cutScreen(){
  // robot.keyTap("a",["command","shift"])// 快捷键

  await sleep(500)
  robot.moveMouse(100,100) 
  await sleep(500)
  robot.mouseToggle("down","left")
  await sleep(500)
  robot.moveMouseSmooth(200,200)
  await sleep(500)
  robot.mouseToggle("up","left")

}
// cutScreen()

// 获取屏幕像素点
function getScreenPixel(){
  const pixs = []
  for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
      const pixel = robot.getPixelColor(i,j)
      pixs.push(pixel)
      console.log(`${i*10+j}%`)
    }
  }
  return pixs
}
const pixs = getScreenPixel()
console.log(pixs)


console.log(mousePos)
console.log(screenSize)

// robot.keyTap("a")

```


## 注意事项
- **权限问题**：在某些操作系统中，可能需要特定的权限才能模拟鼠标和键盘操作。例如，在 macOS 上，需要在“隐私与安全性”设置中授予应用相应的权限。
- **性能影响**：频繁的鼠标和键盘模拟操作可能会影响系统性能，尤其是在进行大量循环操作时。
- **跨平台兼容性**：虽然 `robotjs` 是跨平台的，但不同操作系统对某些操作的支持可能会有所差异。在使用时，需要注意检查和处理这些差异。

## 参考

- [robotjs](https://github.com/octalmage/robotjs)