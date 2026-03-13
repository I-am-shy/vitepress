# Github Actions


## 简介

Github Actions 是 Github 提供的一个自动化工作流工具，它允许用户在 Github 上创建自动化工作流，自动化工作流可以用于构建、测试、部署等。

## 如何使用 Github Actions

1. 创建一个 Github Actions 工作流文件 `.github/workflows/main.yml`
2. 在 yml 文件中配置工作流，核心内容如下：
  - 设置触发条件，比如在 `main` 分支上推送时触发
  - 设置执行环境，比如使用 `ubuntu-latest` 环境
  - 设置权限，比如允许读取仓库内容，允许写入仓库内容，允许读取和写入 ID 令牌
  - 设置任务执行（job），比如构建、测试、部署等

## github actions 原理

github 向仓库提供了一个服务器，它会按照 yml 文件中的配置，在服务器上执行相应的任务。

## yml 配置示例

部署 github actions 工作流示例：

```yaml
name: 部署我的页面

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 检出仓库
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: 设置 Node 环境
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: 设置 Pages 环境
        uses: actions/configure-pages@v4
      - name: 安装依赖
        run: npm install
      - name: 构建
        run: npm run build
      - name: 上传构建产物
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: 部署到 GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4 
```

将上述配置保存到 `.github/workflows/main.yml` 文件中，即可在 Github 上创建一个自动化工作流，当在 `main` 分支上推送时，会自动执行构建和部署任务。

## 参考

- [Github Actions 官方文档](https://docs.github.com/en/actions)
