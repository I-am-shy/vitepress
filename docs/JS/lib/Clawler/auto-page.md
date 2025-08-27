# puppeteer 和浏览器自动化

puppeteer 将浏览器的各部分抽象为对象，并提供了操作这些对象的 API 用于控制浏览器行为。整体核心围绕 `Browser（浏览器）→ Page（页面）→ 元素 / 事件 / 网络 `三层结构。

以下是 puppeteer 的核心对象：

## Browser 

Browser 对象用于管理浏览器实例，是所有操作的入口。

puppeteer.launch 启动浏览器实例，返回 Browser 对象。

  - headless: boolean：是否无头模式（false 显示浏览器窗口，便于调试）。
  - executablePath: string：指定浏览器路径（puppeteer-core 必传）。
  - args: string[]：传递浏览器启动参数（如 ['--start-maximized'] 最大化窗口）。

```js
const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage() // 创建新页面
await browser.close() // 关闭浏览器


```

## Page 

Page 对象代表一个浏览器标签页面，可以进行各种页面操作。例如，导航、事件、DOM 操作等。

```js
const page = await browser.newPage() // 创建新页面
await page.goto('https://www.baidu.com') // 访问页面
await page.close() // 关闭页面
```

### 页面导航

`page.goto(url[, options])` 跳转到指定 URL，默认等待 load 事件完成。

  - `url`: 要访问的 URL。
  - `waitUntil`: `load` | `domcontentloaded` | `networkidle0`：等待条件（如 networkidle0 等待网络空闲）。

```js
await page.goto('https://baidu.com', { waitUntil: 'networkidle0' });
```

`page.goBack()` / `page.goForward()` 模拟浏览器的 “后退”/“前进” 按钮。

```js
await page.goBack()
await page.goForward()
```

### 元素操作

`page.$(selector)` 选择单个元素（类似 document.querySelector），返回 ElementHandle 对象。

```js
const btn = await page.$('#btn'); // id 为 btn 的按钮

```

`page.$$(selector)` 选择多个元素（类似 document.querySelectorAll），返回元素数组。

```js
const btns = await page.$$('.btn'); // 选择所有 class 为 btn 的按钮

```

`elementHandle.type(text[, options])` 向元素输入文本（模拟键盘输入）。

```js
await page.$('input').then(input => input.type('hello', { delay: 100 })); // 延迟100ms输入，模拟真人输入

```

`elementHandle.click([options])` 点击元素（支持 clickCount 双击等参数）。

```js
await page.$('button').then(btn => btn.click()); // 点击按钮
```

### 等待机制

这是 puppeteer 的核心机制，确保页面加载完成后再进行操作。

`page.waitForSelector(selector[, options])` 等待元素出现（超时抛出错误），适合依赖动态加载的元素。

```js
await page.waitForSelector('img', { timeout: 5000 }); // 等待 img 标签出现，超时5秒


```

`page.waitForXPath(xpath[, options])` 通过 XPath 获取元素，进行等待。

```js
await page.waitForXPath('//img', { timeout: 5000 }); // 等待图片出现，超时5秒
```

`page.waitForFunction(pageFunction[, options])` 等待自定义函数返回 true（灵活处理复杂条件）。

```js
// 等待页面标题包含“百度”
await page.waitForFunction(() => document.title.includes('百度'));

```

### 页面状态控制

`page.setViewport(viewport)` 设置页面尺寸。

  - `viewport`: 页面尺寸对象，如 { width: 1280, height: 720 }。

```js
await page.setViewport({ width: 1280, height: 720 });

```

`page.cookies([urls])` 获取 Cookie。

`page.setCookie(...cookies)` 设置 Cookie。

```js
const cookies = await page.cookies(); // 获取 Cookie
await page.setCookie({ name: 'token', value: '123456' }); // 设置 Cookie
```

### 截图与 PDF

`page.screenshot([options])` 截取页面或元素截图。

  - `path`: 截图保存路径。
  - `fullPage`: 是否截取全屏（默认 false）。

```js
await page.screenshot({ path: 'baidu.png', fullPage: true }); // 全屏截图
```

`page.pdf([options])` 生成页面 PDF（仅无头模式支持）。

  - `path`: 保存路径。
  - `format`: 文件格式。
  - `printBackground`: 是否打印背景（默认 false）。

```js
await page.pdf({ path: 'baidu.pdf' }); // 生成 PDF
```

### 页面检测与数据交互

`page.evaluate(pageFunction[, ...args])` 在浏览器上下文执行函数，实现 Node.js 与页面的通信。

  - `pageFunction`: 在页面上下文执行的函数（相当于在浏览器控制台中执行的函数）。
  - `...args`: 传递给函数的参数。

```js
// 获取页面标题（返回值自动序列化传递到 Node.js）
const title = await page.evaluate(() => document.title);

```

`page.evaluateHandle(pageFunction[, ...args])` 类似 evaluate，但返回 JSHandle（可操作页面的对象，修改会同步到页面中）。

```js
const title = await page.evaluateHandle(() => document.title);
```

`page.on('console', callback)` 监听页面控制台输出（调试可用）。


```js
page.on('console', msg => console.log('页面日志:', msg.text()));
```

`page.on('load', callback)` 页面加载完成时触发。

```js
page.on('load', callback)
```

### 网络控制

`page.setExtraHTTPHeaders(headers)` 设置请求头（如 User-Agent）。

```js
await page.setExtraHTTPHeaders({ 'User-Agent': 'Mozilla/5.0...' });


```

`page.waitForResponse(urlOrPredicate)` 等待特定网络响应。

```js
// 等待接口返回并获取数据
const response = await page.waitForResponse(res => 
  res.url().includes('/api/data') && res.ok()
);
const data = await response.json();

```
