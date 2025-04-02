# npm 

npm 是 Node.js 的包管理工具（Node Package Manager），用于管理 Node.js 的依赖包。

## 安装 npm

npm 是 Node.js 的包管理工具，通常随 Node.js 一起安装，在 [nodejs官网](https://nodejs.org/en/download/) 下载安装包安装即可。


## 一些常用的 npm 命令

- `npm -v` 查看 npm 版本
- `npm init` 初始化项目(生成 `package.json` 文件),`npm init -y` 跳过用户输入快速生成 `package.json` 文件
- `npm install` 安装依赖，在高版本的 npm 中 默认会携带 `--save` 参数，表示将依赖安装到 `package.json` 文件的 `dependencies` 中，没有指定依赖包是，会安装 `package.json` 文件 `dependencies` 和 `devDependencies` 中的依赖包
- `npm install --save-dev` 安装开发依赖，表示将依赖安装到 `package.json` 文件的 `devDependencies` 中
- `npm install --save` 安装生产依赖，表示将依赖安装到 `package.json` 文件的 `dependencies` 中
- `npm install -g` 全局安装依赖
- `npm run` 运行  `package.json` 文件中 `scripts` 中的命令
- `npm config set registry` 设置 npm 镜像源
- `npm config get registry` 获取 npm 镜像源
- `npm config list` 查看 npm 配置
- `npm login` 登录 npm
- `npm logout` 退出 npm
- `npm publish` 发布包
- `npm update` 更新包
- `npm uninstall` 卸载包
- `npm ls` 查看依赖
- `npm cache clean` 清除 npm 缓存

:::tip 提示
常用的两个镜像源切换
`npm config set registry https://registry.npmjs.org/` 设置 npm 镜像源为官方源
`npm config set registry https://registry.npmmirror.com/` 设置 npm 镜像源为淘宝源
:::


## 关于全局使用本地的 npm 包 

### 准备一个标准的 npm 项目 （包含 package.json 文件）

在项目根目录下初始化一个 `package.json` 文件，该文件可对项目的元数据、依赖项等进行管理。你可以在终端运行如下命令来初始化：
```bash
npm init -y
```
`-y` 参数会使用默认值快速生成 `package.json` 文件。

### 编写 JavaScript 程序
准备一个入口程序 `index.js` ，内容如下：
```js
#!/usr/bin/env node

// 打印传递给脚本的参数
console.log('接收到的参数:', process.argv.slice(2));
```

文件开头的 `#!/usr/bin/env node` 是一个 shebang 行，它告知系统使用 Node.js 来执行该脚本。有这个注释时，可以直接通过文件路径来执行程序（`./index.js`），否则需要通过 `node index.js` 来执行。

:::warning 注意
这个注释只在类 Unix(Linux, macOS) 系统上有效，在 Windows 系统上无效。
:::

### 在 `package.json` 中配置 `bin` 字段

在 `package.json` 文件里添加 `bin` 字段，以此指定可执行文件的名称与对应的文件路径。示例如下：
```json
{
  "name": "your-global-js-program",
  "version": "1.0.0",
  "description": "一个全局可用的 JavaScript 程序",
  "bin": {
    "your-command": "./index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
在上述示例中，`your-command` 是你在命令行中要使用的命令名称，`./index.js` 是对应的 JavaScript 脚本文件路径。

### 全局安装项目
在项目根目录下，使用 `npm` 进行全局安装：
```bash
npm install -g .
```
`-g` 参数表明进行全局安装，`.` 代表当前目录。

### 5. 验证全局使用
全局安装完成后，你就可以在任何目录下使用之前在 `package.json` 中定义的命令了。例如：
```bash
your-command hello world
```
执行上述命令后，程序会打印出 `接收到的参数: [ 'hello', 'world' ]`。

### 注意事项

- **权限问题**：在某些系统中，全局安装可能需要管理员权限。如果遇到权限问题，可以尝试在命令前加上 `sudo`（仅适用于 Linux 和 macOS）。
- **环境变量**：全局安装会将可执行文件链接到系统的 `PATH` 环境变量所包含的目录中，这样系统就能找到并执行这些命令。
