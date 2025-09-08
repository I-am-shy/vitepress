# Deno --- 下一代JavaScript和TypeScript运行时
---
[Deno](https://deno.org.cn/)是基于V8引擎和Rust语言所建立的JavaScript、TypeScript、WebAssembly执行环境，由Node.js的原始开发者 瑞安·达尔 所创造，deno 这个名字就是来自 Node 的字母重新组合（Node = no + de），表示"拆除 Node.js"（de = destroy, no = Node.js）。

:::tip 与Node.js的比较:

Deno与Node.js的相同之处：

- 皆运行于V8上。
- 拥有相同的事件循环。
- 提供CLI让用户可以执行脚本语言。

Deno与Node.js的不同之处：

- 默认模块系统是使用ES Module，而不是CommonJS。
- 使用URL加载本地端或远程的dependencies,可以直接导入或者运行远端脚本

```bash
deno run https://deno.land/std/examples/welcome.ts
```
---
```js
import { serve } from "https://deno.land/std@0.121.0/http/server.ts";
```
- 不同于nodejs，deno的包管理器是内置的，不需要使用npm（没有node，npm之分）。
- 内置支持 TypeScript，开箱即用。
- 允许控制文件系统与网络访问，防止程序拥有过多的权限。
- 重新利用Promise、ES6、Typescript来设计API。
- 使用deno.json文件来配置项目。
:::

## 安装

```bash
# 使用 Shell
curl -fsSL https://deno.land/install.sh | sh

# 使用 Homebrew
brew install deno
```

## 初始化一个新项目

要初始化一个新的 Deno 项目，请在您的终端中运行以下命令

```bash
deno init my_project
```

这将创建一个名为 my_project 的新目录，包含以下结构

```
my_project
├── deno.json
├── main_test.ts
└── main.ts
```

运行项目

```bash
deno run main.ts
```

## 兼容nodejs

可以在deno中使用nodejs包和内置API，同样支持cjs模块;使用`node:`,和`npm:`前缀标记

```js
import * as fs from "node:fs";
```
```js
import * as emoji from "npm:node-emoji";
```

:::warning
默认情况下，当你使用 deno run 命令时，Deno 不会创建 node_modules 目录，依赖项将被安装到全局缓存中。
:::

## 安全和权限

Deno 提供了多种权限控制选项，以确保您的代码在安全的环境中运行。以下是一些常见的权限选项：

- 文件系统访问
`--allow-read`
`--allow-write`
- 环境变量
`--allow-env`
- 网络访问
`--allow-net`
- 运行命令
`--allow-run`
- 系统
`--allow-sys`


:::warning
`--allow-all`,`-A` 是允许所有权限，此时等同于一般的node命令
```bash
deno run --allow-all index.js
node index.js
```
:::

**参数和标志排序**
请注意，在脚本名称之后传递的任何内容都将作为脚本参数传递，而不是作为 Deno 运行时标志使用。这会导致以下陷阱。
```bash

deno run --allow-net net_client.ts ✅

deno run net_client.ts --allow-net ❌
```

## 参考

- [Deno 中文文档](https://docs.deno.org.cn/runtime/)
- [Deno 维基百科](https://zh.wikipedia.org/zh-cn/Deno#)
- [阮一峰的博客](https://www.ruanyifeng.com/blog/2020/01/deno-intro.html)
