# 如何修改别人提交的pr

1. 拉取pr到本地

```bash
git fetch [需要合并pr的仓库] pull/[pr的id]/head:[pr拉取到本地的分支名]
# 例如 ： git fetch upstream pull/247/head:pr/247
# 需要添加了远端仓库
```

2. 修改提交
```bash
git add .
git commit -m ""
```

3. （同步远端pr）
```bash 
 git pull [需要合并pr的仓库] pull/[pr的id]/head
 # 先同步最新的修改在push
```

4. 上传到原pr
```bash
git push [提交pr的仓库] HEAD:[提交pr的仓库分支]
# git push Match-Yang HEAD:main
# 注意区分·需要合并pr的仓库· 和 ·pr所属的仓库·
```

