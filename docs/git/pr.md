# 如何修改别人提交的pr
---

1. 拉取pr到本地

```bash
git fetch [主仓库] pull/[pr的id]/head:[保存到本地的分支名]
# 例如 ： git fetch upstream pull/247/head:pr/247
# 获取upstream仓库的247号pr，并保存到本地的pr/247分支（注意：pr/247分支不能提前被占用）
```

2. 修改提交
```bash
git add .
git commit -m ""
```

3. 同步远端pr
```bash 
 git pull [主仓库] pull/[pr的id]/head
 # 先同步最新的修改在push
```

4. 上传修改到原pr
```bash
git push [发起pr的远端仓库] HEAD:[发起pr的远端仓库对应的分支]
# git push app HEAD:main

# 提交最新的修改到 app 仓库的 main 分支发起的pr

# 注意区分·主仓库· 和 ·发起pr的仓库·
```

