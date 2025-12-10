# JS(TS) 代码片段

## 命令行 loading 效果

```js
/**
 * 命令行加载动画工具
 * @returns {Object} 包含 start 和 stop 方法的对象
 */
function createLoadingAnimation(options = {}) {
  // 默认配置
  const config = {
    text: "Loading", // 加载时显示的文本
    states: ["|", "/", "-", "\\"], // 动画状态
    interval: 200, // 动画更新间隔（毫秒）
    stream: process.stdout, // 输出流
  };

  // 合并用户配置
  Object.assign(config, options);

  let intervalId = null;
  let index = 0;

  /**
   * 启动加载动画
   */
  function start() {
    // 清除之前的动画（如果有）
    if (intervalId) {
      clearInterval(intervalId);
    }

    // 重置索引
    index = 0;

    // 启动新的动画
    intervalId = setInterval(() => {
      const state = config.states[index];
      config.stream.write(`${config.text} ${state} \r`);
      index = (index + 1) % config.states.length;
    }, config.interval);
  }

  /**
   * 停止加载动画并清除输出
   * @param {string} [finalText] 停止时显示的最终文本
   */
  function stop(finalText) {
    clearInterval(intervalId);
    config.stream.clearLine();
    config.stream.cursorTo(0);

    if (finalText) {
      config.stream.write(`${finalText}\n`);
    }
  }

  return { start, stop };
}

// // 示例用法
// if (require.main === module) {
//   // 创建一个加载动画实例
//   const loading = createLoadingAnimation({
//       text: ' '
//   });

//   // 启动加载动画
//   loading.start();

//   // 模拟 3 秒后停止加载
//   setTimeout(() => {
//       loading.stop('Processing complete!');
//   }, 3000);
// }
```

---

## HTML 表格到 MD 表格

```ts
function convertHtmlTableToMarkdown(htmlTable: string) {
	// Split HTML table into rows
	const rows = htmlTable.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi);
	if (!rows) return '';

	let markdownTable = '';
	let isHeaderRow = true;

	// Process each row
	rows.forEach((row, index) => {
		// Split row into header cells or regular cells
		const headerCells = row.match(/<th[^>]*>[\s\S]*?<\/th>/gi) || [];
		const dataCells = row.match(/<td[^>]*>[\s\S]*?<\/td>/gi) || [];
		const cells = headerCells.length > 0 ? headerCells : dataCells;
		if (cells.length === 0) return;

		// Process each cell
		const rowContent = cells.map(cell => {
			// Extract cell content
			const cellContent = cell.replace(/<\/?(td|th)[^>]*>/gi, '');

			// Remove leading/trailing whitespace and convert line breaks to spaces
			return cellContent.trim().replace(/\n/g, ' ');
		}).join(' | ');

		// Add row content to markdown table
		markdownTable += '| ' + rowContent + ' |\n';

		// Add the header separator after the header row
		if (isHeaderRow && headerCells.length > 0) {
			markdownTable += '| ';
			cells.forEach(() => markdownTable += ':-- | ');
			markdownTable += '\n';
			isHeaderRow = false;
		}
	});

	return markdownTable;
}
```

---

## VSCode extension 获取选中文本

```ts
// 获取选中鼠标选中编辑页面的范围
const selection = editor.selection;
// 获取指定编辑页面范围的字符
const selectedText = editor.document.getText(selection);

```

---

## 线程休眠函数(Sleep)

```js
// 利用事件循环机制实现休眠
function Sleep(time){
  return new Promise(resolve => setTimeout(resolve, time))
}
```

---

## 颜色输出

```js

function colorLog(color = "default", message = "") {
  const colors = {
    default: '\x1b[0m', // 默认颜色
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m'
  };

  console.log(`${colors[color]}${message}${colors.default}`);
}
```

---

## 解析命令行参数

```js
// 解析命令行参数
// 例如：node script.js -v --help
function parseArgs() {
  // process.argv : [node, script.js, -v, --help]
  const args = process.argv.slice(2);
  const options = {
    version: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '-v':
        options.version = true;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
    }
  }

  return options;
}

```

## 进度条显示

```js
/**
 * 创建进度条
 * @param {number} current 当前进度
 * @param {number} total 总进度
 * @param {number} barLength 进度条长度
 * @returns {string} 进度条字符串
 */
function createProgressBar(current=0, total=1, barLength = 30) {
  if(current > total){
    return `[${'█'.repeat(barLength)}] ${Math.floor((current / total) * 100)}% (${current}/${total})`;
  }
  const percentage = Math.round((current / total) * 100);
  const filledLength = Math.round((current / total) * barLength);
  const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
  return `[${bar}] ${percentage}% (${current}/${total})`;
}
```