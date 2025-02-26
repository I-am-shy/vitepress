# vscode 插件开发

## 第一个扩展插件

使用官方提供的脚手架，推荐全局安装脚手架，使用命令构建扩展项目

```bash
npm install --global yo generator-code

yo code

```

然后根据提示输入相关信息

```bash
# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? HelloWorld
### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? helloworld
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Y
# ? Which bundler to use? unbundled
# ? Which package manager to use? npm

# ? Do you want to open the new folder with Visual Studio Code? Open with `code`


```

进入项目可以看到类似以下的项目结构

```bash
.
├── .vscode
│   ├── launch.json     // Config for launching and debugging the extension
│   └── tasks.json      // Config for build task that compiles TypeScript
├── .gitignore          // Ignore build output and node_modules
├── README.md           // Readable description of your extension's functionality
├── src
│   └── extension.ts    // Extension source code
├── package.json        // Extension manifest
├── tsconfig.json       // TypeScript configuration

```

在编辑器中，打开 src/extension.ts 并按 F5 或从命令面板（⇧⌘P）运行“调试：开始调试”命令，此时会出现一个调试窗口，在新窗口的命令面板中（⇧⌘P）输入 `Hello World` 触发弹窗（默认的插件功能）


## 主要内容

在项目中，我们主要关注的部分如下：
- package.json 文件，包含插件的名称、版本、描述、入口文件、权限、触发插件事件等信息
- src/extension.ts 文件，插件的主要功能和逻辑，这里实现插件的功能
- README.md 文件，插件的描述和使用方法

:::warning

package.json中要注意 engines.vscode 字段，这标识插件支持的最低vscode版本，

README.md 必须要修改填写内容，否则无法打包插件

:::

## 插件的打包
打包插件需要使用官方提供的工具包 vsce
```bash
npm install -g @vscode/vsce

```
vsce 可以用来打包和发布插件，发布插件需要登录官网获取、配置token，有兴趣可以参考[vscode 插件发布文档](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

进入到项目文件夹，执行打包命令

```bash
# 打包插件
vsce package

# 发布插件
vsce publish
```

打包后会生成一个.vsix文件，这个文件是插件的安装包，可以手动安装到vscode中

## 参考

- [vscode 插件开发文档](https://code.visualstudio.com/api/get-started/your-first-extension)
