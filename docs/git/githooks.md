# Git Hooks

git hooks 是 git 工作流的钩子，用于在 git 的各个阶段执行一些操作控制整个 git 流程。相当于 git 操作的生命周期中的一些事件，可以在事件发生时设置一个脚本去执行一些操作。

## git hooks 的类型

打开一个开启了 git 管理的项目，项目的根目录下会有一个 .git 文件夹（通常会隐藏）。这个文件夹中会有一个 hooks 文件夹，hooks 文件夹中的 sample 文件就是 git hooks 脚本文件的示例。

```bash
# mac/linux
cd .git/hooks/ && ls

# windows
cd .git\hooks\ && dir

# 查看结果类似：

applypatch-msg.sample     pre-applypatch.sample     pre-rebase.sample         update.sample
commit-msg.sample         pre-commit.sample         pre-receive.sample
fsmonitor-watchman.sample pre-merge-commit.sample   prepare-commit-msg.sample
post-update.sample        pre-push.sample           push-to-checkout.sample

```

这些 sample 文件是 git 的示例脚本，当去掉 .sample 后缀后，就是可以执行的 git hooks 脚本。

常用的 git hooks 如下：

| hooks | 描述 |
| --- | --- |
| pre-commit | 在 commit 之前执行 |
| pre-push | 在 push 之前执行 |
| pre-rebase | 在 rebase 之前执行 |
| pre-receive | 在 receive 之前执行 |
| post-commit | 在 commit 之后执行 |
| post-push | 在 push 之后执行 |
| post-rebase | 在 rebase 之后执行 |
| post-receive | 在 receive 之后执行 |

## hooks 脚本

hooks 脚本是一个可执行文件，通常使用 shell 脚本编写。可以简单理解成带返回值的命令行程序，成功的返回 0，失败的返回 1。

:::tip 说明
因为在 shell 脚本中可以执行各种命令，所以 hooks 脚本可以通过shell 命令来调用其他程序，比如 git 命令、shell 命令、python 命令、node 命令等。
:::

## commit hooks 示例

commit hooks 是用于在 commit 之前执行的 hooks 脚本。

以下实现一个每次提交前打印提交信息的 hooks 脚本。

```bash
#!/bin/sh

echo "🔍 运行 pre commit hooks 脚本..."
echo "这是 pre commit hooks 脚本，在 commit 之前执行"
exit 0

```

提交测试结果如下：

```bash
git commit -m  "测试"     
🔍 运行 pre commit hooks 脚本...
这是 pre commit hooks 脚本，在 commit 之前执行
[main b7435da] 测试
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### 跳过 hooks 脚本

如果想要跳过 hooks 脚本，可以在 git 命令添加 `--no-verify` 参数：

```bash
git commit -m  "测试" --no-verify
```
此时不会触发 hooks 脚本，直接提交。



## husky 工具

[husky](https://typicode.github.io/husky/zh/) 是一个用于管理 git hooks 的工具，可以自动生成 hooks 脚本，并自动执行 hooks 脚本。

husky 的安装和使用非常简单，只需要在项目根目录下执行以下命令：

- 安装 husky
```bash
npm install husky --save-dev
```

- 初始化 husky

初始化 husky 会生成一个 .husky 文件夹，里面包含了 `.husky/_/` 文件夹。这里面包含了各种 hooks 脚本的示例，类似git hooks 文件夹中的 sample 文件。

```bash
npx husky init
```

- 添加 hooks 脚本

添加 hooks 脚本会生成一个 hooks 脚本文件。

```bash
npx husky add .husky/commit-msg "echo '这是 commit-msg hooks 脚本，在 commit 之前执行'"
```

此时会在 .husky 文件夹中生成一个 `.husky/commit-msg` 文件，内容如下：

> commit-msg hooks 用于提交信息被保存之后运行。


```bash
#!/bin/sh

echo "这是 commit-msg hooks 脚本，在 commit 之前执行"
exit 0
```

### 使用 commitlint 检查提交信息

在 @commitlint/config-conventional 的规范中，为我们提供了一下规则。

**git commit 规范**

| 分类      | 描述                     |
| --------- | ------------------------ |
| feat      | 新特性                   |
| fix       | 修复 bug                 |
| perf      | 性能优化                 |
| refactor  | 代码重构                 |
| build     | 外部依赖项的更改         |
| chore     | 测试文件的更改           |
| ci        | 修改构建配置或脚本       |
| docs      | 仅文档修改               |
| revert    | 撤销之前的提交           |
| test      | 添加或修正测试用例       |


新建文件 `commitlint.config.js` 导入 `@commitlint/config-conventional` 规则。

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

在 `package.json` 文件中添加 `commitlint` 命令。

```json
"scripts": {
  "commitlint": "commitlint --config commitlint.config.js --edit"
}
```

`.husky/commit-msg` 文件内容如下：

```bash
#!/usr/bin/env sh

echo "🔍 运行 commitlint 检查..."
npm run commitlint
RESULT=$?

if [ $RESULT -ne 0 ] ; then
  echo "❌ 由于 commitlint 错误，提交被中止。"
  exit 1
fi

echo "✅ commitlint 检查通过，继续提交。"
exit 0
```

此时在提交时，会自动运行 commitlint 检查提交信息，不符合 git commit 规范的提交信息，会提示错误并中止提交。
