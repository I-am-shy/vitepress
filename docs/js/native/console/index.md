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
终端的打印样式可以通过 ANSI 转义序列来实现。
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