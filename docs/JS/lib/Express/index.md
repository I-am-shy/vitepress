# Express 网络框架

## 什么是 Express

[Express](https://express.nodejs.cn/) 是一个基于 Node.js 平台的快速、开放、极简的 Web 开发框架（基于 Node.js 的 HTTP 模块）。通过express可以快速创建一个web应用，并提供一系列强大的功能来处理HTTP请求和响应数据。

## 安装 Express

在项目中使用 npm 安装 Express
```bash
npm install express
```

## 创建一个简单的 Express 应用

1. 在项目中创建一个 `app.js` 文件，并添加以下代码：
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

2. 在项目根目录下运行以下命令：
```bash
node app.js
```

3. 在浏览器中访问 `http://localhost:3000`，可以看到页面显示一串 json 数据。
```json
{
  "message": "Hello World"
}
```

## 使用 express-generator 创建一个 Express 应用

:::tip 提示
也可以使用更简单的命令行工具来创建一个 Express 应用，具体可以参考 [express-server](./express-server.md)
:::

express-generator 是一个用于快速生成 Express 应用的工具。通过 express-generator 可以快速创建一个包含路由和静态资源结构的 Express 应用。


使用 npm 全局安装 express-generator
```bash
npm install express-generator -g
```

使用 express-generator 创建一个 Express 应用
```bash
express myapp --no-view
```

:::warning 注意
使用 `express myapp --no-view` 创建的应用不包含视图引擎(pug)，只包含路由和静态资源结构。后续可以通过 html 作为实图渲染
:::

创建完成后，项目目录结构如下：
```bash
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   ├── stylesheets
│   │   └── style.css
│   └── index.html
└── routes
   ├── index.js
   └── users.js

```

进入项目目录并启动项目
```bash
cd myapp
npm run start
```

在浏览器中访问 `http://localhost:3000`，可以看到页面显示
```
Express

Welcome to Express
```
这个页面的内容来自于index.html文件

### 路由

路由是 Express 应用中非常重要的一个概念，用于定义 URL 路径和对应的处理函数。通过路由，可以实现不同的 URL 路径对应不同的处理逻辑。

在 Express 中，路由是通过 `app.get`、`app.post`、`app.put`、`app.delete` 等方法来定义，通过 `app.use` 来使用这些路由中间件。

在项目中，路由文件位于 `routes` 目录下，默认包含 `index.js` 和 `users.js` 两个文件。这两个文件在app.js中作为中间件引入并使用。

:::tip 提示
`app.use` 和中间件：

中间件是 Express 应用中的一个重要概念，用于处理 HTTP 请求和响应。
它可以将这些后端的服务切割成不同的模块，每个模块负责处理一个特定的功能，然后通过 `app.use` 来使用这些中间件。
例如：处理cookie的中间件，处理session的中间件，处理日志的中间件，处理请求的中间件，处理错误的中间件等。

`app.use` 是使用中间件的函数，它接收一个函数作为参数，这个函数就是中间件，中间件的函数接收三个参数：请求对象(req)、响应对象(res)、以及下一个中间件(next)。

当 `app.use` 处理请求中间件和暴露静态资源中间件时，会接收两个参数：请求路径和静态资源路径。

例如：
```js
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
```
以上代码表示：
- 处理静态资源请求，当请求路径以 `/static` 开头时，会去 `public` 目录下查找对应的静态资源。
- 处理用户请求，当请求路径为 `/users` 时，会触发 `usersRouter` 的路由处理。

:::


#### req, res, next 参数

在 Express 中，路由处理函数通常接收三个参数：`req`, `res` 和 `next`。这三个参数是 Express 中间件系统的核心组成部分。

1. req (Request 对象)

`req` 是 HTTP 请求对象，包含了客户端发送的所有信息：

```javascript
router.get('/', function(req, res, next) {
  // 获取查询参数
  const type = req.query.type;
  
  // 其他常用属性和方法
  // req.params - 路由参数
  // req.body - 请求体数据（需要 body-parser 中间件）
  // req.headers - 请求头
  // req.cookies - Cookie（需要 cookie-parser 中间件）
  // req.ip - 客户端 IP 地址
  // req.path - 请求路径
  // req.method - HTTP 方法（GET, POST 等）
});
```

2. res (Response 对象)

`res` 是 HTTP 响应对象，用于向客户端发送响应：

```javascript
router.get('/', function(req, res, next) {
  // 发送 JSON 响应
  res.status(200).json({ msg: 'users' });
  
  // 其他常用方法
  // res.send() - 发送各种类型的响应
  // res.render() - 渲染视图模板
  // res.redirect() - 重定向请求
  // res.sendFile() - 发送文件
  // res.cookie() - 设置 Cookie
  // res.clearCookie() - 清除 Cookie
  // res.download() - 提示下载文件
});
```

3. next (下一个中间件函数)

`next` 是一个函数，调用它会将控制权传递给下一个中间件函数：

```javascript
router.get('/', function(req, res, next) {
  // 如果满足某个条件，继续执行下一个中间件
  if (someCondition) {
    return next();
  }
  
  // 处理请求
  res.send('Response');
  
  // 传递错误给错误处理中间件
  // next(new Error('Something went wrong'));
});
```

`next` 的主要用途：
- 链式处理请求
- 错误传递（当传入参数时）
- 实现中间件的可组合性

### bin/www --- 服务的启动页

#### 为什么使用 HTTP 模块启动 Express 服务

查看整个项目文件可以发现，在项目中（通常在 `bin/www` 文件中）使用 Node.js 的 HTTP 模块来启动服务而不是直接使用 Express 的 `listen()` 方法，主要有以下几个原因：

1. **分离关注点**

```javascript
var app = require('../app');
var http = require('http');
var server = http.createServer(app);
server.listen(port);
```

- **应用逻辑与服务器配置分离**：`app.js` 专注于应用程序的中间件、路由和业务逻辑，而 `bin/www` 负责服务器的配置和启动
- **职责单一原则**：每个文件有明确的单一职责，使代码更易于维护

2. **增强的服务器控制**

```javascript
var server = http.createServer(app);
```

- **更灵活的服务器配置**：可以直接访问底层 HTTP 服务器实例，进行更多自定义配置
- **支持高级功能**：例如设置超时、保持连接参数等 HTTP 服务器特定选项

3. **支持 WebSocket 等协议**

```javascript
var server = http.createServer(app);
var io = require('socket.io')(server); // 示例：添加 WebSocket 支持
```

- **协议扩展**：可以在同一个服务器上添加 WebSocket 等其他协议支持
- **共享端口**：HTTP 和 WebSocket 可以共享同一个端口，简化部署

4. **更好的错误处理**

```javascript
server.on('error', onError);
server.on('listening', onListening);
```

- **细粒度事件处理**：可以为服务器的各种事件（如错误、监听开始等）注册专门的处理函数
- **优雅的错误处理**：可以针对不同类型的服务器错误（如端口被占用）提供特定的处理逻辑

5. **便于扩展到 HTTPS**

```javascript
// 可以轻松切换到 HTTPS
var https = require('https');
var options = { key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem') };
var server = https.createServer(options, app);
```

- **协议灵活性**：可以轻松地从 HTTP 切换到 HTTPS，或者同时支持两者

6. **符合 Express 生成器的标准模式**

- **标准实践**：Express 生成器创建的项目结构采用这种模式，成为了事实上的标准
- **熟悉度**：大多数 Express 开发者熟悉这种模式，便于团队协作

#### 直接使用 Express 的替代方式

如果直接使用 Express 的 `listen()` 方法，代码会更简洁：

```javascript
// 在 app.js 中直接启动服务
var app = express();
// ... 中间件和路由配置 ...
app.listen(3000, () => console.log('Server started on port 3000'));
```

这种方式适合简单应用，但对于需要更多控制和扩展的应用，使用 HTTP 模块启动服务器提供了更大的灵活性和功能性。

总之，使用 HTTP 模块启动 Express 应用是一种更加灵活、可扩展的方法，适合中大型应用和需要支持多种协议的场景。如果是比较小的个人项目，使用 `app.listen()` 方法启动服务会更加简单、便捷。

