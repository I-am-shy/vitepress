# puppeteer 

[puppeteer](https://pptr.dev/category/introduction) 是一个 Node 库，它提供了一个高级 API 来控制 Chrome 或 Chromium 浏览器。它可以实现在浏览器的页面上执行本地脚本，并将执行结果返回给 Node 进程（保存到内存中）。

:::warning 普通爬虫的局限性

一般的爬虫是通过设置请求头来模拟浏览器，请求获取网页内容。再对网页内容进行解析，获取需要的数据。这对于一些简单的展示数据网页来说是可行的。但是对于一些复杂的网页，比如需要通过 js 动态加载的网页（SPA），原始内容中没有直接数据，而是一堆浏览器环境的 js 程序，此时就无法拿到需要的数据了。

:::

## 安装 puppeteer

```bash
npm install puppeteer
```
或
```bash
npm install puppeteer-core
```

如果安装 puppeteer 失败且已安装了chrome浏览器，可以尝试安装 puppeteer-core

puppeteer-core 是 puppeteer 的轻量级版本，相比于 puppeteer ，它不包含浏览器，需要在使用过程中指定浏览器路径。

## 使用 puppeteer 控制浏览器

```js
const puppeteer = require('puppeteer');

(async () => {
  // 打开浏览器
  const browser = await puppeteer.launch();
  // 打开新页面
  const page = await browser.newPage();
  // 访问页面
  await page.goto('https://www.baidu.com');
  
  // 等待页面脚本执行完成（可以根据需要设置等待条件）
  await new Promise(resolve => setTimeout(resolve, 2000));
  // 将本地脚本通过字符串的格式注入到页面中
  await page.evaluate(`
    window.fun = function() {
      console.log("done")
      return window.origin
    }
    // window.fun = fun.toString()
  `);
  // 执行页面上的 JavaScript 脚本
  const res = await page.evaluate(() => {
    return window.fun()
  });
  console.log(res) // https://www.baidu.com
  await browser.close();
})();
```

**使用 puppeteer-core 控制浏览器**

因为 puppeteer-core 不包含浏览器，需要在使用过程中指定浏览器路径。
```js
const puppeteer = require('puppeteer-core');

(async () => {
  // 打开浏览器
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // 必传！Puppeteer Core 需指定浏览器路径，传入本地chrome浏览器路径
    headless: false, // 显示浏览器图形界面（调试时常用）
    args: ['--start-maximized'] // 启动时最大化窗口
  });
  // 打开新页面
  const page = await browser.newPage();
  // 访问页面
  await page.goto('https://www.baidu.com');
  
  // 等待页面脚本执行完成（可以根据需要设置等待条件）
  await new Promise(resolve => setTimeout(resolve, 2000));
    // 将本地脚本通过字符串的格式注入到页面中
  await page.evaluate(`
    window.fun = function() {
      console.log("done")
      return window.origin
    }
    // window.fun = fun.toString()
  `);
  // 执行页面上的 JavaScript 脚本
  const res = await page.evaluate(() => {
    return window.fun()
  });
  console.log(res) // https://www.baidu.com
  await browser.close();
})();
```

拿到页面数据后，就可以在本地进行数据解析了。


