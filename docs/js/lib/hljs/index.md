<script setup>
import Hljs from "../../../components/hljs/hljs.vue" 
</script>


# Highlight.js
---
[Highlight.js](https://highlightjs.org/) 是一个给代码语法高亮的 js 库，支持在 nodejs 和 web 中使用。 最新版本中已经内置了 192 种语言和 512 个主题。

:::tip 原理
highlight.js 会对代码进行语法识别，将特定的代码块（例如，关键字---keyword、数字---number、字符串---string、变量---variable等等）使用特定元素标注（改变代码块的元素结构），再导入对应的 css 样式进行语法高亮。

```text
function func(){
  console.log("hello world")
} 

```

以上代码片段使用 js 语法识别后页面结构如下

```html
<span class="hljs-keyword">function</span> <span class="hljs-title function_">func</span>(<span class="hljs-params"></span>){
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"hello world"</span>)
} 
```
再导入内置或者自定义的 css 类名样式，即可实现语法高亮展示

```js
function func(){
  console.log("hello world")
} 
```

:::

## 导入 highlight.js

### 作为模块导入

1. 安装依赖
```bash
npm install highlight.js
#或
yarn add highlight.js
```
2. 导入模块


```js
// 使用 require 导入
const hljs = require('highlight.js');

// 使用ES6导入语法
import hljs from 'highlight.js';
```

如果对打包大小有要求，可以仅导入核心包并按需导入需要识别的语言

```js
// 使用 require 导入
const hljs = require('highlight.js/lib/core');

// 只注册需要的语言
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

// 使用ES6导入语法
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

// 只注册需要的语言
hljs.registerLanguage('javascript', javascript);
```

3. 高亮代码块

```html
<pre>
  <code id="code" class="language-javascript">console.log("hello world")</code>
</pre>

```


```js
hljs.highlight(
  document.getElementById('code'),
  { language: 'javascript' }
).value
```

4. 引入 css 高亮主题

:::details css 高亮主题示例
```css
/* Atom One Dark style for https://highlightjs.org/demo */

.theme-atom-one-dark pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em
}

.theme-atom-one-dark code.hljs {
  padding: 3px 5px
}

.theme-atom-one-dark .hljs {
  color: #abb2bf;
  background: #282c34
}

.theme-atom-one-dark .hljs-comment,.theme-atom-one-dark .hljs-quote {
  color: #5c6370;
  font-style: italic
}

.theme-atom-one-dark .hljs-doctag,.theme-atom-one-dark .hljs-formula,.theme-atom-one-dark .hljs-keyword {
  color: #c678dd
}

.theme-atom-one-dark .hljs-deletion,.theme-atom-one-dark .hljs-name,.theme-atom-one-dark .hljs-section,.theme-atom-one-dark .hljs-selector-tag,.theme-atom-one-dark .hljs-subst {
  color: #e06c75
}

.theme-atom-one-dark .hljs-literal {
  color: #56b6c2
}

.theme-atom-one-dark .hljs-addition,.theme-atom-one-dark .hljs-attribute,.theme-atom-one-dark .hljs-meta .hljs-string,.theme-atom-one-dark .hljs-regexp,.theme-atom-one-dark .hljs-string {
  color: #98c379
}

.theme-atom-one-dark .hljs-attr,.theme-atom-one-dark .hljs-number,.theme-atom-one-dark .hljs-selector-attr,.theme-atom-one-dark .hljs-selector-class,.theme-atom-one-dark .hljs-selector-pseudo,.theme-atom-one-dark .hljs-template-variable,.theme-atom-one-dark .hljs-type,.theme-atom-one-dark .hljs-variable {
  color: #d19a66
}

.theme-atom-one-dark .hljs-bullet,.theme-atom-one-dark .hljs-link,.theme-atom-one-dark .hljs-meta,.theme-atom-one-dark .hljs-selector-id,.theme-atom-one-dark .hljs-symbol,.theme-atom-one-dark .hljs-title {
  color: #61aeee
}

.theme-atom-one-dark .hljs-built_in,.theme-atom-one-dark .hljs-class .hljs-title,.theme-atom-one-dark .hljs-title.class_ {
  color: #e6c07b
}

.theme-atom-one-dark .hljs-emphasis {
  font-style: italic
}

.theme-atom-one-dark .hljs-strong {
  font-weight: 700
}

.theme-atom-one-dark .hljs-link {
  text-decoration: underline
}
```
:::

### 使用 cdn 导入 

在元素 html 中可以使用 cdn 进行导入（注意导入区分 hljs核心js、语法识别js 和 高亮主题css）

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/go.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/default.min.css">

<!-- 直接使用 hljs 对象 -->
<script>hljs.highlightAll();</script>
```

## 完整高亮代码示例

:::details index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="index.css">
  <style>
    body {
      
      color: #fff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 16px;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .container {
      width: 80%;
      padding: 2em;
      height: fit-content;
      background-color: #1e1e2f;
    }
    </style>
</head>
<body>
  <div class="container theme-atom-one-dark">
    <pre>
      <code id="code" class="language-javascript"></code>
    </pre>
  </div>
</body>
<script src="index.js" type="module"></script>
</html>
```
:::

:::details index.js
```js
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

const code = document.getElementById('code');

code.textContent = (await (await fetch("index.js")).text()).split("\n").slice(0,-1).join("\n");

hljs.registerLanguage('javascript', javascript);
hljs.highlightElement(code, { language: "javascript" });
```
:::

:::details index.css

```css
/* Atom One Dark style for https://highlightjs.org/demo */

.theme-atom-one-dark pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em
}

.theme-atom-one-dark code.hljs {
  padding: 3px 5px
}

.theme-atom-one-dark .hljs {
  color: #abb2bf;
  background: #282c34
}

.theme-atom-one-dark .hljs-comment,.theme-atom-one-dark .hljs-quote {
  color: #5c6370;
  font-style: italic
}

.theme-atom-one-dark .hljs-doctag,.theme-atom-one-dark .hljs-formula,.theme-atom-one-dark .hljs-keyword {
  color: #c678dd
}

.theme-atom-one-dark .hljs-deletion,.theme-atom-one-dark .hljs-name,.theme-atom-one-dark .hljs-section,.theme-atom-one-dark .hljs-selector-tag,.theme-atom-one-dark .hljs-subst {
  color: #e06c75
}

.theme-atom-one-dark .hljs-literal {
  color: #56b6c2
}

.theme-atom-one-dark .hljs-addition,.theme-atom-one-dark .hljs-attribute,.theme-atom-one-dark .hljs-meta .hljs-string,.theme-atom-one-dark .hljs-regexp,.theme-atom-one-dark .hljs-string {
  color: #98c379
}

.theme-atom-one-dark .hljs-attr,.theme-atom-one-dark .hljs-number,.theme-atom-one-dark .hljs-selector-attr,.theme-atom-one-dark .hljs-selector-class,.theme-atom-one-dark .hljs-selector-pseudo,.theme-atom-one-dark .hljs-template-variable,.theme-atom-one-dark .hljs-type,.theme-atom-one-dark .hljs-variable {
  color: #d19a66
}

.theme-atom-one-dark .hljs-bullet,.theme-atom-one-dark .hljs-link,.theme-atom-one-dark .hljs-meta,.theme-atom-one-dark .hljs-selector-id,.theme-atom-one-dark .hljs-symbol,.theme-atom-one-dark .hljs-title {
  color: #61aeee
}

.theme-atom-one-dark .hljs-built_in,.theme-atom-one-dark .hljs-class .hljs-title,.theme-atom-one-dark .hljs-title.class_ {
  color: #e6c07b
}

.theme-atom-one-dark .hljs-emphasis {
  font-style: italic
}

.theme-atom-one-dark .hljs-strong {
  font-weight: 700
}

.theme-atom-one-dark .hljs-link {
  text-decoration: underline
}
```
:::

**效果如下：**

<Hljs />

:::tip 启动命令
```bash
npx vite
```
:::

