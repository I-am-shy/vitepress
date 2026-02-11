# Bun 

> [!NOTE] Bun 是一个快速的 JavaScript 运行时、包管理器、捆绑器、测试运行器和一体化工具包。
> **Bun is a fast JavaScript runtime, package manager, bundler, test runner, and all-in-one toolkit.**

## 简介
[Bun](https://bun.com/) 是一个用于开发现代 JavaScript/TypeScript 应用的一体化工具包。它由以下几个部分组成：

- `runtime`：几乎无开销地执行 JavaScript/TypeScript 文件和包脚本。
- `package manager`：使用 bun 安装实现快速安装、工作区、覆盖和审计。
- `test runner`：兼容 Jest，先支持 TypeScript 测试，支持快照、DOM 和监控模式。
- `bundler`：原生捆绑 JS/TS/JSX，支持拆分、插件和 HTML 导入。

Bun 的核心是 Bun Runtime ，一个快速的 JavaScript Runtime，设计为可直接替代 Node.js。它用 Zig 编写，底层由 JavaScriptCore 驱动，极大地缩短了启动时间和内存使用。


:::details Bun Runtime

- **极致的速度**：Bun 的运行速度很快，在同类工具中相比速度高出了几十倍。 
- **支持 TypeScript 和 JSX**：支持直接执行 `.jsx`、`.ts` 和 `.tsx` 文件，Bun 的转译器会在执行前将这些数据转换为原版 JavaScript。
- **支持 ESM 和 CommonJS**：ES 模块是未来的趋势，但数百万个 npm 包仍然需要 CommonJS。Bun 推荐使用 ES 模块，但支持 CommonJS。
- **Web 标准 API**：Bun 实现了标准的 Web API，如 `fetch`、`WebSocket` 和 `ReadableStream`。Bun 由苹果为 Safari 开发的 JavaScriptCore 引擎提供支持，因此一些 API 如 `Headers` 和 `URL` 直接使用 Safari 的实现 。
- **兼容 Node.js**：除了支持节点式模块解析外，Bun 还致力于与内置的 Node.js 全局（ 进程 、 缓冲区）和模块（ 路径 、`fs`、`http` 等 ）完全兼容（这是一个正在进行的工作）。
:::

## 安装

:::code-group
```bash [mac、linux]
curl -fsSL https://bun.sh/install | bash
```
```bash [Windows]
powershell -c "irm bun.sh/install.ps1|iex"
```
```bash [Homebrew]
brew install oven-sh/bun/bun
```
```bash [npm]
npm install -g bun
```
:::

## 使用

### 初始化一个新项目

用 bun 初始化初始化一个新项目。

```bash
bun init my-app

? Select a project template - Press return to submit.
❯   Blank
    React
    Library
```
它会提示你选择一个模板，比如 Blank、React 或 Library。默认选择 Blank。

### 运行项目

进入项目目录，运行 Bun。

```bash
cd my-app
bun run index.ts

# Hello via Bun!
```

启动后终端会打印出 "Hello via Bun!" 表示项目运行成功。

## 使用 bun 命令

bun 是运行时，也是包管理器。尽可能的使用 bun 来代替 node 、 npm。

- ~~`node index.js`~~ --> `bun index.js[index.ts]`

- ~~`npm install`~~ --> `bun install[add]`

- ~~`npm run <script>`~~ --> `bun run <script>`

- ~~`npx`~~ --> `bunx`

详细用法可以参考 [bun 命令](https://bun.com/docs/pm/cli/install)。

### 打包

bun 还提供了 `bun build` 命令来打包项目。

```bash
bun build <entry> --outdir <output>
```

### 静态资源服务

文件，并提供静态资源服务。

```bash
# bun <asset[]> <options>
bun ./index.html ./index.css --port 3000
```

启动的本地服务，将 `index.html` 、`./index.css` 等静态资源文件挂载到服务上，并指定端口号为 3000。

```bash
Bun v1.3.3
ready in 6.62ms
→ http://localhost:3000/
Routes:
  / ./index.html
Press h + Enter to show shortcuts
```