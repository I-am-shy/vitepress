# 可执行的 2 进制 npm 包

---

一般情况下，在 [npm 仓库](https://www.npmjs.com/) 下载的包都是由 JS、TS 构建的应用（依赖库，cli 工具，可执行脚本等）。但实际上 npm 参考还可以发布由其他语言构建的应用，例如给 node 使用的 c++ 库，python 或者 shell 脚本，rust 和 go 构建的 cli 工具，以及可执行的 2 进制程序（如 [claude CLI](https://www.npmjs.com/package/@anthropic-ai/claude-code)，[lark CLI](https://www.npmjs.com/package/@larksuite/cli)）。

本质上 npm 仓库是一个通过 js 程序进行分发应用的商店，只要将其他语言构建的应用放到 js 程序中，就可以上传的 npm 仓库并支持 npm 下载到本地。理论上来说你可以将任何文件都上传到 npm 仓库中。



## 发布一个可执行的 2 进制 npm 包

准备一个包含 2 进制文件的 npm 项目：

1. 可执行的 2 进制文件
2. 入口文件
3. 标准的 package.json


参考 [run-compile](https://www.npmjs.com/package/run-compile) 包。
```
.
├── bin/
│   ├── compile          # macOS (darwin-arm64)
│   ├── compile.exe      # Windows (win32-x64)
│   └── compile-linux    # Linux (linux-x64)
├── script/
│   └── compile.ts       # 编译源文件
├── index.js             # 入口脚本，按平台分发执行二进制
└── package.json
```

```json
{
  "name": "run-compile",
  "version": "0.0.2",
  "description": "通过 npm 发布的可执行 2 进制文件",
  "main": "index.js",
  "private": false,
  "type": "module",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "scripts": {
    "build-darwin": "bun build ./script/compile.ts  --compile --target=bun-darwin-arm64  --outfile ./bin/compile",
    "build-win": "bun build ./script/compile.ts  --compile --target=bun-windows-x64  --outfile ./bin/compile.exe",
    "build-linux": "bun build ./script/compile.ts  --compile --target=bun-linux-x64  --outfile ./bin/compile-linux"
  },
  "bin": {
    "run-compile": "index.js"
  },
  "files": [
    "bin/",
    "script/",
    "index.js",
    "README.md"
  ],
  "author": "shyshi",
  "license": "MIT"
}
```

核心的字段为 `bin`，`files` 。bin 为注册的全局命令，即可执行的 2 进制文件。files 为需要上传到 npm 仓库的项目文件（通常不包含源码，此处仅为演示）。

```bash
# 登录并发布，注意不要使用镜像源，否则会跳到镜像源的登录页
npm login 
npm publish --access public --//registry.npmjs.org/:_authToken=<Your Access Token>

npm notice
npm notice 📦  run-compile@0.0.2
npm notice Tarball Contents
npm notice 1.4kB README.md
npm notice 63.4MB bin/compile
npm notice 94.6MB bin/compile-linux
npm notice 98.5MB bin/compile.exe
npm notice 1.2kB index.js
npm notice 804B package.json
npm notice 41B script/compile.ts
npm notice Tarball Details
npm notice name: run-compile
npm notice version: 0.0.2
npm notice filename: run-compile-0.0.2.tgz
npm notice package size: 100.7 MB
npm notice unpacked size: 256.5 MB
npm notice shasum: 69cdf9a331e73eeaaf73ae7c49358fb1d5855c39
npm notice integrity: sha512-gX8hZzXjieY2E[...]wp7Av7FkEzonw==
npm notice total files: 7
npm notice
npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access
+ run-compile@0.0.2

```

> [!NOTE] 使用 token 验证发布 npm 包
> 参考 [npm 安装时安全性和 GAT 绕过 2FA 弃用](https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/)，现在无法仅凭登录状态直接使用 npm publish 发布 npm 包（账号未开启 2FA 验证），需要配合 token 发布 。
>
>  npm v12 版本起以下的自动运行行为将不再默认启用：
> - allowScripts 默认关闭： 依赖生命周期脚本（即，preinstall、install、postinstall）和隐式 node-gyp 构建不再运行，除非明确允许。
> - --allow-git 默认设置为 none： 除非明确允许，否则不再解析 Git 依赖项（直接或传递）。
> - --allow-remote 默认值为 none： 除非明确允许，否则不再解析来自远程 URL 的依赖项（例如，https 归档）。
> 这表示后续在安装 npm 包时自动下载远程资源（比如 2 进制文件）的行为将失效。

完成后即可进行安装运行 2 进制文件
```bash
# 全局安装
npm install -g run-compile

# 直接运行
run-compile

# 或者使用 npx
npx run-compile
```

