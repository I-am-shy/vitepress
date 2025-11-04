# git 恢复已删除的分支（文件变更）

恢复分支有两种情况：
1. 本地分支删除了，但是有对应的远程分支。此时可以从远端拉取分支到本地恢复分支。
2. 本地分支删除了，没有对应的远程分支。此时需要检索 git 的 reflog 日志，找到对应的 commit ，然后创建恢复分支。

:::warning 本地恢复分支（文件变更）的前提
- .git 目录没有被删除或修改
- 变更提交了 commit 

:::

## 通过远程分支恢复本地分支

有远端分支的情况下，可以 git fetch 拉取远端分支到本地，然后切换到对应分支。

```bash
git fetch origin <branchName> && git switch -c <branchName> origin/<branchName>
# 或
git fetch origin <branchName> && git checkout <branchName>
```

## 通过 reflog 恢复本地分支

没有远端分支的情况下，需要检索 git 的 reflog 日志，找到对应的 commit ，然后创建恢复分支。

```bash
# 查看 reflog 日志
git reflog

# 输出如下内容 <commit id> <节点> <commit message>

909a65c (HEAD -> main, origin/main, origin/HEAD) HEAD@{0}: commit: fix: 修复样式错误
ede152c HEAD@{1}: commit: docs: 新增图片示例
6aa708b HEAD@{2}: commit: docs: 新增 vercel 部署文档
524b954 HEAD@{3}: commit: docs: 新增 MCP 文档
ce7ce37 HEAD@{4}: commit: docs: 新增 function calling 文档
3b4e8fa HEAD@{5}: commit: docs: 新增 AI 相关文档
f09fbcd HEAD@{6}: commit: docs: 新增 TS 类型工具文档(调整)
3912445 HEAD@{7}: commit: docs: 新增 TS 类型工具文档
83d1e8a HEAD@{8}: commit: feat: 修改侧边栏和新增 sse 文档
f35df5f HEAD@{9}: commit: docs: 新增自定义事件文档(补充)
b76ba88 HEAD@{10}: commit: docs: 新增自定义事件文档
41dbc89 HEAD@{11}: commit: docs: 新增终端相关文档
9f66f11 HEAD@{12}: commit: feat: 更新首页展示

```


```bash
git checkout -b <branchName> <commit id>
```
commit id 是需要恢复的变更节点。根据 commit id 创建恢复分支。