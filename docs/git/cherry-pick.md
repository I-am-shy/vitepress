# git 提交指定 commit 

---

通过 `git cherry-pick <commit id>` 命令，将指定的 commit 提交到当前分支。

## 使用场景

当其他分支的提交出现 A - B - C 三个提交，但是你只需要 B 和 C 两个提交，此时你可以使用 `git cherry-pick <commit id>` 命令，将 B 和 C 提交到当前分支。

:::tip 提示
通过 git log 可以得到对应的 commit id。
:::

## 示例

```bash
# 切换到 dev 分支
git checkout dev
# 查看 commit id
git log

```
```bash
commit 323f77e7af3f7c9bbeabbd85d16447a4e0e9cfed (HEAD -> main, origin/main, origin/HEAD)
Author: xxx
    A 提交
commit 909a65c135930f8e394d00db52f24667fffcd887 (HEAD -> main, origin/main, origin/HEAD)
Author: xxx
    B 提交
commit  ede152c50fac4037f174d3892b7a1ebdcf45c09b (HEAD -> main, origin/main, origin/HEAD)
Author: xxx
    C 提交
```

```bash
# 切换到 main 分支
git checkout main 
# 将 dev 分支的 C 提交同步到 main 分支
git cherry-pick ede152c50fac4037f174d3892b7a1ebdcf45c09b
```