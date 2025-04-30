# 使用命令行工具创建一个 Express 应用

`@shyshi/express` 是一个用于快速生成 Express 应用的工具。通过 `@shyshi/express` 可以快速启动一个 Express 服务。

:::tip 提示
为什么使用 `@shyshi/express` ？对于初次使用的 express 用户，使用 `@shyshi/express` 可以快速的启动一个 Express 服务，且不需要复杂的配置参数（足够简单且够用）。
:::

使用 `npm` 全局安装 `@shyshi/express`
```bash
npm install -g @shyshi/express
```

创建一个 Express 应用
```bash
express-server 
```

或者直接使用 `npx`
```bash
npx @shyshi/express 
```

创建完成后，项目目录结构如下：

```bash
.
├── app.js // 应用入口
├── bin // 启动脚本
├── package.json // 项目配置
├── public // 静态文件
├── routes // 路由
├── README.md // 项目说明
```

## 项目核心点

**app.js:**

设置 api 的请求路径（已经预设好了各类中间件），如：

```js
app.use('/api', require('./routes/api'));
```

**routes/api.js:**

设置 api 的路由，处理外部请求，如：

```js
app.get('/', (req, res) => {
  res.send('Hello World');
});
```

**bin/www:**

设置启动脚本，开启http服务，同时提供对服务的监听处理。

**public(非必须):**

对外暴露的静态资源文件，如：`html`、`css`、`js`、`image`、`video` 等。

