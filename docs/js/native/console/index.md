# nodejs 实现终端流式输出
---
实现动态的流式输出效果依赖以下功能：
- process.stdout.write()：与 console.log() 不同，它不会自动添加换行符而是在光标处继续输出，适合连续输出
- 光标控制：通过 readline 模块的 cursorTo(移动光标到指定位置) 和 clearLine(清除当前行的打印输出) 方法可以实现内容覆盖（如进度条更新）

## 模拟流式输出
```js
/**
 * process.stdout.write()：与console.log()不同，它不会自动添加换行符，适合连续输出
 * 光标控制：通过readline模块的cursorTo和clearLine方法可以实现内容覆盖（如进度条更新）
 */

const readline = require('readline');

// 清空当前行
function clearCurrentLine() {
  readline.cursorTo(process.stdout, 0);
  readline.clearLine(process.stdout, 0);
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 模拟进度流式展示
async function showProgress() {
  console.log('等待数据加载...');
  
  for (let i = 0; i <= 100; i++) {
    // 清除当前行并输出新进度
    clearCurrentLine();
    if(i < 100){
      process.stdout.write(`进度：${i}% [${'='.repeat(Math.floor(i/2))}${' '.repeat(50 - Math.floor(i/2))}]`);
    }else{
      // 100%时
      console.log("\x1b[32m\x1b[1m",`进度：100% [${'='.repeat(50)}]`,"\x1b[0m");// 本行打印加粗绿色，后续重置默认
      // '\x1b[<code>m' 是 ANSI 转义序列，用于设置后续打印的文本颜色和样式。
      // 黑色：30
      // 红色：31
      // 绿色：32
      // 黄色：33
      // 蓝色：34
      // 紫色：35
      // 青色：36
      // 白色：37
      // 重置/恢复默认：0
      // 加粗：1
      // 下划线：4
    }
    // 控制更新频率
    await sleep(50);
  }
}

// 模拟流式数据输出
async function* streamData(){
  yield "以下开始输出流式数据:\n";
  const str = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";
  while(true){
    const random = Math.floor(Math.random() * 38); // 随机下标
    if(random === 38 || random === 0){
      break;
    }
    yield str[random];
    await sleep(100);
  }
  yield "\n流式数据输出结束";
}

async function main(){
  await showProgress();
  for await (const data of streamData()){
    process.stdout.write(data);
  }
}

main();
```


## 终端和浏览器控制台的打印样式

### 1. 终端打印样式

终端的打印样式可以通过 ANSI 转义序列来实现。更多 ANSI 彩色转义序列参考 [ANSI 色彩模式](#ANSI-色彩模式)
```bash
'\x1b[<code>m' 是 ANSI 转义序列，用于设置后续打印的文本颜色和样式。
```
code 码如下：
| code 码 | 样式          |
| ------- | ------------- |
| 30      | 黑色          |
| 31      | 红色          |
| 32      | 绿色          |
| 33      | 黄色          |
| 34      | 蓝色          |
| 35      | 紫色          |
| 36      | 青色          |
| 37      | 白色          |
| 0       | 重置/恢复默认 |
| 1       | 加粗          |
| 4       | 下划线        |

:::tip 提示
颜色和样式可以组合使用，如：
```bash
# 绿色加粗
'\x1b[32m\x1b[1m'
```
:::

**本行打印绿色字体**
```js
// \x1b[0m : 后续打印的文本颜色和样式重置为默认
console.log('\x1b[32m\x1b[1m' + '本行打印绿色字体' + '\x1b[0m');
```

### 2. 浏览器控制台打印样式

浏览器控制台的打印样式可以通过 css 样式来实现。
```js
console.log(`%c${str}`, `${cssStyle}`);
```

- str: 打印的文本。
- cssStyle: 打印的样式，如：

    ```css
    color: red;font-weight: bold;
    ```

**控制台自定义效果打印**
```js
const str = '这是自定义的打印效果';
const cssStyle = 'color: red;text-shadow:1px 1px 1px #000;font-size:2em;';
console.log(`%c${str}`, `${cssStyle}`);
```

:::tip 提示
可以打开控制台粘贴上面的代码查看效果。
:::


## ANSI 色彩模式

ANSI 转义序列支持的颜色数量取决于终端模拟器。分为以下 4 个阶段/级别：

| 颜色模式 | 颜色总数 | 包含内容 | 转义序列格式举例 |
|---|---|---|---|
| 3位 (3-bit) | 8 种 | 黑、红、绿、黄、蓝、洋红、青、白 | `\033[31m`（后续文本的前景色为红） |
| 4位 (4-bit) | 16 种 | 标准 8 色 + 对应的 8 种高亮度/明亮颜色 | `\033[91m`（后续文本的前景色为明亮红） |
| 8位 (8-bit) | 256 种 | 16 种标准色 + 216种RGB魔方色 + 24种灰度 | `\033[38;5;129m`（后续文本的前景色为 129 号色） |
| 24位 (24-bit) | 16,777,216 种 | 完整的 RGB 真彩色（True Color） | `\033[38;2;255;0;0m`（后续文本的前景色为纯红 RGB） |


打印带有 RGB 颜色的 “Hello” ，不同语言规则的嵌套方式如下（注意使用 `\033[0m`重置后续字符打印样式）：

:::code-group
```bash [bash]
# 必须加 -e 参数
echo -e "\033[38;2;255;100;0mHello\033[0m" 
```
```python [python]
print("\033[38;2;0;255;135mHello\033[0m")
```
```javascript [javascript]
console.log("\x1b[38;2;120;80;200mHello\x1b[0m");
```
```c [c 、c++]
printf("\033[38;2;255;0;255mHello\033[0m\n");
```
```go [go]
fmt.Println("\033[38;2;255;0;255mHello\033[0m\n");
```
:::

### 各模式详细解析

#### 1. 原始 8 色模式 (3-bit)
最早的 [ANSI X3.64](https://en.wikipedia.org/wiki/ANSI_escape_code) 标准，仅支持 8 种基础颜色。

代码格式为 `\033[<code>m`，其中：
- `\033[` 表示起始字符。
- `<code>`取值 30–37 表示前景色，40–47 表示背景色 ，**0 表示重置为默认**。
- `m`: 专门负责外观样式与色彩（SGR）。 
> [!TIP] 说明
> 除了 `m` 以外还有    
> - `A / B / C / D`：负责移动光标（上下左右）。   
> - `H`：负责将光标定位到指定的坐标。   
> - `J`：负责清除屏幕内容。   

#### 2. 高亮 16 色模式 (4-bit)
早期终端发现只有 8 色不够用，于是引入了“高亮（Bright/Bold）”属性（代码 1），将原有的 8 种颜色各变亮了一种，从而扩展到了 16 色。后来，Aixterm 规范直接为其分配了独立的专用代码（前景色 90–97，背景色 100–107），不需要额外加粗即可显示明亮色。 

代码格式为 `\033[<code>m`，code 增加前景色 90–97，背景色 100–107 。

#### 3. 256 色模式 (8-bit)
由 Xterm 终端扩展而来，使用固定索引来查找 256 种色彩。

代码格式为 `\033[38;5;<code>m`，其中：
* 38 表示前景色（文字颜色），替换为 48 表示背景色。
* 5 表示使用 256 色模式。
* code 取值为 0-255 ：
  - 0–15：前文提到的 16 种标准/高亮色。
  - 16–231：由 6 × 6 × 6 组成的 216 种 RGB 调色盘。
  - 232–255：从黑到白的 24 级纯灰度渐变。


#### 4. 真彩色模式 (24-bit True Color)
现代终端（如新版 Windows Terminal、iTerm2、VS Code 内置终端等）几乎都支持 24 位真彩色。它不再受限于调色板，而是让你可以像写 CSS 一样直接传入具体的 R、G、B 通道值，能够完美渲染出 1677 万种不同的颜色。

代码格式为 `\033[38;2;<R>;<G>;<B>m`或配合前景色和背景色 `\033[38;2;<R>;<G>;<B>;48;2;<R>;<G>;<B>m`，其中：

* 38 表示前景色（文字颜色），替换为 48 表示背景色。
* 2 表示使用真彩色模式。
* `<R>`、`<G>`、`<B>` 取值为 0-255（效果同 RGB 颜色代码）。
