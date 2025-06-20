# git和git命令
---

基本概念：
理解Git 的工作区、暂存区、仓库区、远程仓库
- 工作区：即本地代码所存放的地方（电脑磁盘中）
- 暂存区：临时存放改动的文件的区域
- 仓库区：存放了所有版本的数据
- 远程仓库：即github、gitlab、gitee等代码托管平台

![alt text](./image-1.png)
![alt text](./image.png)

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
#### 撤销和删除操作
```bash
# file --- 具体的文件路径（可通过git status查看），没有file参数时会取消所有提交
git reset <file>
# 回退一次commit   
# --soft：回退并暂存更改，--hard：回退不暂存更改
git reset [--soft][--hard] HEAD^
# commit --- commit id 
git checkout <commit id>
# 删除工作区的文件，并同步到暂存区
# file --- [文件路径]
git rm <file>
```

```bash
# 撤销add操作 
git reset HEAD <file> 
git reset HEAD .
# 放弃更改
git checkout - <file>
git checkout .
```

:::warning 更多

删除本地git仓库(删除根目录下的.git文件夹，慎用)
```bash
find . -name ".git" | xargs rm -rf
```
:::

#### 解决冲突

**变基冲突解决流程**
1. 遇到冲突：
```bash
$ git rebase main
CONFLICT (content): Merge conflict in file.txt
```
2. 查看冲突文件：
```bash
$ git status
# 显示未合并的文件
```
3. 手动解决冲突：
  - 编辑冲突文件，删除冲突标记（<<<<<<<、=======、>>>>>>>）。
  - 保留正确的代码。
4. 标记冲突已解决：
```bash
$ git add file.txt
```
5. 继续变基：
```bash
$ git rebase --continue
```


```bash
git rebase (--continue | --abort | --skip)
```

**控制 rebase 流程**

1. git rebase --continue   
作用：在解决冲突或执行完手动操作后，继续进行变基过程。   
场景：当 git rebase 因冲突暂停时，你需要   
  - 手动解决冲突文件。
  - 使用 git add 将冲突文件标记为已解决。
  - 执行 git rebase --continue 继续应用剩余的提交。

2. git rebase --abort   
作用：完全放弃当前变基操作，恢复到变基前的状态。      
场景：   
  - 遇到无法解决的复杂冲突。
  - 发现变基策略错误，需要重新开始。
  - 变基过程中出现意外问题。

3. git rebase --skip      
作用：跳过当前导致冲突的提交，继续应用后续提交。   
场景：   
  - 某个提交包含不必要的更改，希望忽略它。
  - 提交内容已通过其他方式合并，无需重复应用。


| 参数|作用|适用场景|
| --- | --- | --- |
|continue | 解决冲突后继续变基         | 冲突已手动解决，希望继续应用剩余提交  |
|abort    | 放弃变基，恢复到变基前状态 | 遇到无法解决的冲突或需要重新开始变基   |
|skip     | 跳过当前提交，继续变基     | 当前提交内容不需要或已通过其他方式合并 |



## git 提交规范

**格式**：\<<span class="text-font">type</span>>(\<<span class="text-font">scope</span>>): \<<span class="text-font">description</span>>

**示例**：`feat(login): 新增用户登录功能`

### 字段说明 
  - 类型（type）：使用明确动词，推荐类型： 
    - feat：新功能
    - fix：修复问题
    - docs：文档变更
    - style：代码样式调整（不影响功能）
    - refactor：代码重构
    - test：测试相关
    - chore：构建工具或辅助脚本变更
  - 范围（scope）：可选，用括号包裹，如模块名 user 或文件名 api.js。
  - 描述（description）：简明扼要（≤50字符），以动词开头，如 修复登录超时问题。



## 可视化学习 git

git 的可视化学习网站： https://learngitbranching.js.org/?locale=zh_CN


<style>
  .text-font{
    color:rgb(67, 155, 244);
  }
</style>