# git和git命令
---

基本概念：
理解Git 的工作区、暂存区、仓库区、远程仓库
- 工作区：即本地代码所存放的地方（电脑磁盘中）
- 暂存区：临时存放改动的文件的区域
- 仓库区：存放了所有版本的数据
- 远程仓库：即github、gitlab、gitee等代码托管平台

![alt text](./img/image-1.png)
![alt text](./img/image.png)

:::details 关于pr[pull request]

pr是拉取请求，在协作项目中它提供了一个审核机制，管理员可以审核提交并决定是否要整合到项目中；
pr的流程：

1. fork原项目：这会在自己的GitHub上创建原项目的一个副本，这个副本属于你的GitHub账户
2. clone副本到本地：在本地进行代码修改。
3. 创建新的分支进行修改（若已有分支可忽略）
4. 修改完后add，commit，push到远端：将自己修改的代码上传给项目管理
:::

## 常用的git命令

### 查看命令

#### 查看git版本
```bash
git --version
```

#### 查看git配置和配置文件
```bash
# 查看配置
git config --list
# 查看配置文件
git config --global --edit
```

#### 查看git仓库状态
```bash
git status
```
#### 查看git仓库历史
```bash
git log
```

#### 查看已经添加的远程仓库
```bash
git remote -v
```
#### 查看分支
```bash
git branch
```

### 操作命令

#### 新建git仓库
```bash
git init
```

#### 添加文件到git仓库
```bash
git add <file>
```

#### 提交文件到git仓库
```bash
git commit -m "commit message"
```

#### 拉取远程仓库
```bash
git pull origin <branchName>
# 拉取远程仓库并合并差异
git pull origin <branchName> --rebase
```

#### 拉取远程分支到本地
```bash
# origin --- 远程仓库名称,可是通过git remote -v查看
# branchName --- 要拉取的远程分支名称
git fetch origin <branchName>
```

#### 推送文件到远程仓库
```bash
git push origin <branchName>
```

#### 创建分支
```bash
# 创建本地分支
git branch <branchName>
# 创建远程分支
git push origin <branchName>
```

#### 删除分支
```bash
# 删除本地分支
git branch -d <localBranchName>
# 删除远程分支
git push origin --delete <remoteBranchName>

```

#### 切换分支
```bash
# 切换分支
git checkout <branchName>
# 创建并切换分支
git checkout -b <branchName>
```


#### 合并分支
```bash
git merge <branchName>
git rebase <branchName>
```

#### 取消合并分支
```bash
git merge --abort
git rebase --abort
```

#### 克隆远程仓库
```bash
# url --- [远程仓库地址]
git clone <url>
```

#### 添加远程仓库
```bash
# remoteName --- 远程仓库名称 url --- 远程仓库地址
git remote add <remoteName> <url>
```
#### 撤销删除操作
```bash
# file --- 具体的文件路径（可通过git status查看），没有file参数时会取消所有提交
git reset <file>
# 回退到一次commit   
# --soft：回退并保留更改，--hard：回退不保留更改
git reset [--soft][--hard] HEAD^
# commit --- commit id 
git checkout <commit id>
# 删除工作区的文件，并同步到暂存区
# file --- [文件路径]
git rm <file>
```

:::warning 更多

删除本地git仓库(删除根目录下的.git文件夹，慎用)
```bash
find . -name ".git" | xargs rm -rf
```
:::

## 可视化学习 git

git 的可视化学习网站： https://learngitbranching.js.org/?locale=zh_CN
