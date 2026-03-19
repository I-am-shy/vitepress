# hono

## 简介

[hono](https://hono.dev/docs/) 是一个轻量，简洁，高性能的 web 框架。它支持运行在多种运行时环境下：Cloudflare Workers，Fastly Compute，Deno，Bun，Vercel，Netlify，AWS Lambda，Lambda@Edge，和 Node.js。

## 安装

::: code-group
```bash [npm]
npm create hono@latest
```
```bash [yarn]
yarn create hono
```
```bash [pnpm]
pnpm create hono@latest
```
```bash [Bun]
bun create hono@latest
```
:::

## 使用

hono 的使用与 express 类似，但是更加简洁，性能更好。

```js
import { Hono } from 'hono';
const app = new Hono();

app.get('/', (c) => c.json({ message: 'Hello World' }));

export default app;
```

### 启动服务隔离

不同于 express ，hono 的主包仅提供了服务构建功能，node 启动服务需要通过引入额外的中间件来实现。这也是 hono 轻量且适配多个运行时的原因。

```js
import { Hono } from 'hono'
import { serve } from '@hono/node-server'

// 构建服务
const app = new Hono()

app.get('/', (c) => c.json({ message: 'Hello World' }));
// 启动服务
serve(app,{port:3000},(info)=>{
  console.log(`Server is running on port ${info.port}`);
})
```

> [!TIP] 提示
> 在 vercel ，cloudflare 等边缘运行时环境下，只需要导出 app 即可，无需手动启动服务。

### 路由和中间件

在 Hono 中，路由（Route）和中间件（Middleware）是构建应用的核心。Hono 的设计深受 Express 启发，但利用了更现代的 Web 标准和 TypeScript 特性。 

1. 路由 (Route)
Hono 提供了一个极速的路由引擎（基于 RegExpRouter），支持多种灵活的路径匹配模式。 

* 基础路由：支持标准的 HTTP 方法，如 app.get()、app.post()、app.put() 和 app.delete()。
* 路径参数 (Path Parameters)：使用冒号 : 定义动态片段，通过 c.req.param() 获取。
```js
app.get('/user/:id', (c) => {
  const id = c.req.param('id')
  return c.text(`User ID is ${id}`)
})
```
* 嵌套路由 (Nested Routes)：可以使用 app.route() 将一个 Hono 实例作为子路由挂载到主应用上，方便模块化管理。
```js
const api = new Hono()
api.get('/posts', (c) => c.json({ posts: [] }))

app.route('/api', api) // 访问路径为 /api/posts
```

2. 中间件 (Middleware)
Hono 的中间件采用类似“洋葱模型”的执行机制，允许在请求处理（Handler）前后执行逻辑。

- 全局与局部应用：
  - 全局：`app.use('*', ...)` 匹配所有路径。
  - 局部：`app.use('/admin/*', ...)` 仅匹配特定路径前缀。
- 内置中间件：Hono 自带了常用的功能，无需额外安装依赖：
  - [CORS](https://hono.dev/docs/middleware/builtin/logger)：处理跨域资源共享。
  - Logger：记录请求日志。
  - JWT/Basic Auth：身份验证。
- 自定义中间件：使用 createMiddleware 可以编写类型安全的自定义逻辑，并通过 c.set 和 c.var 在中间件与路由间传递数据。

```js
app.use(async (c, next) => {
  console.log(`Before: ${c.req.method} ${c.req.url}`)
  await next() // 执行后续中间件或 Handler
  console.log('After')
})

```

### context 上下文对象

在 Hono 中，Context (简称 c) 是整个框架的核心对象。它封装了 **HTTP 请求 (req)**、**HTTP 响应 (res)** 以及 **环境变量**、**状态传递**等所有上下文信息。

1. 处理请求 (Request)
通过 `c.req`，你可以轻松获取客户端发送的数据：

* 路径参数：`c.req.param('id')` 获取 /user/:id 中的 ID。
* 查询参数：`c.req.query('page')` 获取 ?page=1。
* 请求体 (JSON)：`await c.req.json()`。
* 表单数据：`await c.req.parseBody()`。
* Header/Cookie：`c.req.header('User-Agent')` 或 `c.req.cookie('session')`。  

2. 生成响应 (Response)
Hono 提供了多种便捷的辅助函数来返回内容，这些函数会自动设置正确的 `Content-Type`： 

* JSON：`c.json({ success: true })`。
* 文本：`c.text('Hello Hono')`。
* HTML：`c.html('<h1>Hi</h1>')`。
* 状态码：`c.status(404)`（通常链式调用，如 `return c.json({}).status(404)`）。
* 直接返回 Response：由于符合 Web Standard，你可以直接 `return new Response('...')`。 

3. 变量传递 (Variables)
这是中间件与路由之间共享数据的关键。

* 设置值：在中间件中使用 `c.set('user', userData)`。
* 获取值：在后续的 Handler 中使用 `c.get('user')`。
* 提示：配合 TypeScript 使用 `new Hono<{ Variables: { user: string } }>()` 可以获得完整的类型提示。

4. 环境与执行 (Execution Context) 

* 环境变量：通过 `c.env` 访问（在 Cloudflare Workers 中尤其重要，用于访问 KV、D1、Bindings 等）。
* 异步任务：`c.executionCtx.waitUntil(promise)` 允许你在响应发送后继续执行后台任务（常用于日志或统计）。

5. 渲染支持 (Renderer)
Hono 拥有强大的 `c.render()` 功能，通常配合 JSX 使用，可以让你像写 React 一样在服务端渲染 UI。

**示例代码**：
```js
app.get('/hello', async (c) => {
  const name = c.req.query('name') || 'Guest'; // 获取请求数据
  c.header('X-Custom-Header', 'Hono');       // 设置响应头
  return c.json({ message: `Hello ${name}` }); // 返回 JSON
});
```

## 参考

[hono 官方文档](https://hono.dev/docs/)



