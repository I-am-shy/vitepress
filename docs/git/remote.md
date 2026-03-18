# git 远程仓库

---

通常我们会使用 github、gitlab、gitee 等代码托管平台作为远程仓库管理项目。本文介绍什么是 git 远程仓库以及如何搭建自己专属的远程仓库。

## git 远程仓库的本质

git 远程仓库本质是服务端的一个提供对外服务的文件夹（xxx/xx.git），通过 ssh 协议提供服务。使用 git clone/push/pull 等命令时，会通过 ssh 协议与远程仓库进行交互。

例如，你可以尝试使用 ssh 来访问 git 仓库。假设远程仓库的地址为 `git@github.com:user/repo.git`，你可以尝试使用以下命令：

```bash
ssh git@github.com
```
如果成功，你会看到类似以下输出：
```bash
Hi user! You've successfully authenticated, but GitHub does not provide shell access.
```

github.com 给 git 用户分配了一个 ssh 公钥，用于验证 git 用户的身份（user）。验证成功后即可访问 user 的 repo.git 仓库。


## 搭建自己的 git 远程仓库

:::tip 前提条件
1. 一台服务器
2. 安装了 git 工具
:::

### 登录服务器

使用 ssh 或其他方式登录服务器，进入服务器的 shell 终端。
```bash
ssh <username>@<server_ip>
```


### 创建 git 仓库

在服务器上创建一个文件夹，作为 git 远程仓库。

```bash
mkdir -p /root/workspace/repo.git

cd /root/workspace/repo.git

# 设置默认分支为 main
git config --global defualtBranch main

# 初始化 git 远程仓库（--bare 表示裸仓库，即不包含工作区 .git）
git init --bare
```

到这里，一个 git 远程仓库就创建好了。 它的远程地址如下：

```bash
root@<server_ip>:/root/workspace/repo.git
```

### 本地连接远程仓库并提交

在本地项目中添加远程仓库。

```bash
git remote add origin root@<server_ip>:/root/workspace/repo.git
```

提交到远程仓库。

```bash
git push -u origin main
```

:::warning 注意

提交后服务器的远程仓库内不会出现本地提交的文件，需要通过 git clone 命令将远程仓库克隆到服务器的其他目录下查看

```bash
# 创建一个目录用于存放远程仓库
mkdir -p /root/workspace/repo

cd /root/workspace/repo

# 将远程仓库克隆到服务器
git clone /root/workspace/repo.git

# 查看远程仓库内容
ls -l

```
:::

## 无法连接到远程仓库

如果无法连接到远程仓库，检查远程仓库是否被防火墙拦截。