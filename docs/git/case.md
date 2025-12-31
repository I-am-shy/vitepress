# git 大小写更改的提交问题

---

git 默认是大小写不敏感的，当文件路径中大小写不一致时，git 会认为它们是同一个文件。
`/js/index.js` 和 `/JS/index.js` 会被认为是同一个文件。

通过配置 git 为大小写敏感，可以避免这个问题。

```bash
git config core.ignorecase false
```

配置后，`/js/index.js` 和 `/JS/index.js` 会被认为是不同的文件。

此时如果直接提交到远端，远端会保留两者而不是覆盖。例如，在远端创建了 `/JS/index.js` 文件，然后本地创建了 `/js/index.js` 文件，此时提交到远端，远端会保留两者而不是覆盖。

解决此情况可以直接在远端删除 `/JS/index.js` 文件，然后本地同步远端的修改`git pull origin main`，此时本地会出现`/js/index.js`被删除的变更，取消此变更即可恢复本地文件保持远端和本地一致。

## 总结

1. git 设置 `git config core.ignorecase false` 为大小写敏感。
2. 远端出现了大小写路径修改后未覆盖保留两者的情况，直接在远端删除，然后本地 pull 同步远端修改。