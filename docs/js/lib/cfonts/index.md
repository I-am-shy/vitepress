# cfonts 

## 简介
[cfonts](https://github.com/dominikwilkowski/cfonts) 是一个用于在终端中显示彩色文本的库。它支持多种字体样式、颜色和背景色，可以用于创建炫酷的终端输出。

## 安装

首先通过 npm 安装 `cfonts` 包（Node.js 版本）：
```bash
# 本地安装（项目内使用）
npm install cfonts --save

# 全局安装（命令行直接使用）
npm install cfonts -g
```

## 使用方式
`cfonts` 支持**命令行（CLI）** 和**Node.js 代码调用（API）** 两种方式，以下重点讲解 API 用法。

在 Node.js 代码中引入 `cfonts`：
```javascript
const { say ,render} = require('cfonts');
// 或 ESModule 方式（若项目支持）
import { say ,render} from 'cfonts';
```

### say 方法
最常用的核心方法，用于生成并输出格式化的终端文字，支持丰富配置。

```javascript
say(text, options);
```

- `text`：要渲染的文字（建议短文本，长文本可换行）                            
- `options`：配置项，控制字体样式、颜色、对齐、输出位置等（见下方详细配置）       |

:::details options 核心配置项

| 配置项        | 类型     | 默认值       | 说明                                                                 |
|---------------|----------|--------------|----------------------------------------------------------------------|
| `font`        | `string` | `'block'`    | 字体样式，可选值：`block`/`slick`/`3d`/`simple`/`huge`/`chrome`/`shade`/`tiny` 等 |
| `align`       | `string` | `'left'`     | 文字对齐方式：`left`/`center`/`right`                                |
| `colors`      | `array`  | `['system']` | 字体颜色，支持：<br>- 基础色：`red`/`green`/`yellow`/`blue`/`magenta`/`cyan`/`white`/`gray`<br>- 十六进制：`#ff0000`<br>- 系统色：`system`（跟随终端）<br>示例：`['red', 'blue']`（多色渐变） |
| `background`  | `string` | `'transparent'` | 背景色，取值同 `colors`（仅支持单一颜色）                            |
| `letterSpacing`| `number` | `1`          | 字符间距（单位：像素）                                               |
| `lineHeight`  | `number` | `1`          | 行高                                                                 |
| `space`       | `boolean`| `true`       | 是否保留文字周围的空白                                               |
| `maxLength`   | `number` | `0`          | 每行最大字符长度（0 表示不限制）                                     |
| `gradient`    | `array`  | `false`      | 渐变颜色，示例：`['red', 'orange']`（优先级高于 `colors`）            |
| `independentGradient`| `boolean` | `false` | 每个字符独立渐变（需配合 `gradient` 使用）|
| `transitionGradient`| `boolean` | `false` | 渐变过渡动画（终端支持时生效）|
| `env`         | `string` | `'node'`     | 运行环境，固定为 `node`（无需修改）|
:::


```javascript
// 示例1：基础用法
CFonts.say('HELLO', {
  font: '3d',        // 3D 字体样式
  align: 'center',   // 居中对齐
  colors: ['red', 'yellow'], // 红黄双色
  background: 'transparent',
  letterSpacing: 2
});

// 示例2：渐变文字
CFonts.say('Cfonts', {
  font: 'chrome',
  gradient: ['#ff0000', '#00ff00'], // 红到绿渐变
  independentGradient: true,
  transitionGradient: true
});
```

### render 方法
与 `say` 功能一致，但**不直接输出到终端**，而是返回渲染后的字符串（适合自定义处理输出）。

```javascript
const result = render(text, options);
console.log(result.string); // 手动输出
```

```javascript 
type RenderResult = {
  string: string; // 渲染后的 ANSI 字符串
  array: string[]; // 每行渲染后的字符串数组
  lines: number; // 行数
  options: Options; // 最终生效的配置项
}
```
示例：
```javascript
const rendered = CFonts.render('NODE', {
  font: 'slick',
  colors: ['blue']
});

// 自定义输出（比如拼接其他内容）
console.log('===== 自定义输出 =====');
console.log(rendered.string);
console.log('======================');
```

## 完整示例代码
```javascript
const { say ,render} = require('cfonts');

// 1. 基础输出
say('HELLO', {
  font: '3d',
  align: 'center',
  colors: ['green', 'cyan'],
  letterSpacing: 1
});

// 2. 渲染后自定义输出
const renderResult = render('WORLD', {
  font: 'chrome',
  gradient: ['#ff6600', '#ffcc00'],
  transitionGradient: true
});

console.log('\n===== 自定义分隔线 =====');
console.log(renderResult.string);

```

## CLI 快速使用
若全局安装了 `cfonts`，可直接在终端使用（无需写代码）：
```bash
# 基础用法
cfonts "HELLO" --font 3d --colors red,yellow --align center

# 查看所有 CLI 参数
cfonts --help
```

## 注意事项
1. 颜色/渐变效果依赖终端对 ANSI 颜色的支持（大部分现代终端都支持，如 iTerm2、Windows Terminal、VS Code 终端）；
2. 长文本建议拆分（`maxLength` 配置），避免终端渲染错乱；
3. 部分字体（如 `huge`/`3d`）对短文本（1-4 个字符）效果最佳。
