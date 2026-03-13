# gh-pages

## 简介

[gh-pages](https://www.npmjs.com/package/gh-pages) 是一个 npm 包，它提供了将本地资源部署到 Github Pages 的功能。通常在打包好静态网站后，使用 gh-pages 将静态网站部署到 Github Pages 上。

> [!tip] Github Pages
>
> Github Pages 是 [Github](https://github.com/) 提供的一个**免费**静态网站托管服务，它允许用户将静态网站部署到 Github 上，并可以通过分配的域名访问。

## 在项目中安装 gh-pages

```bash
# 安装到 devDependencies 中
npm install gh-pages -D 
```

## 使用 gh-pages 部署静态网站

gh-pages 提供了 cli 命令和 API 两种方式使用。

### 使用 cli 命令部署

将打包好的 dist 目录部署到 Github Pages 上。

```bash
gh-pages -d dist
```

通常会配合打包命令一起使用，在 package.json 中添加如下配置：

```json
"scripts": {
  "build": "vite build",
  "deploy": "npm run build && gh-pages -d dist"
}
```

```bash
npm run deploy
```

这会在远程仓库新增一个 `gh-pages` 分支，并将 `dist` 目录的内容推送到该分支上，最终将 `gh-pages` 分支部署到 Github Pages 上。

### 使用 API 部署

使用 `publish` 方法将本地资源部署到 Github Pages 上。

```js
const ghPages = require('gh-pages');

ghpages.publish(dir, callback);
// or...
ghpages.publish(dir, options, callback);
```

```js
ghPages
  .publish('dist', // 本地资源目录
  {
    branch: 'gh-pages',
    repo: 'https://github.com/user/repo.git' // 仓库地址
  },
  (err)=>{
    if(err){
      console.error(err);
    }else{
      console.log('部署成功');
    }
  });
```


> [!NOTE] 其他部署方式
>
>除了使用 gh-pages 部署静态网站外，还可以使用 [Github Actions](./github-actions/index.md) 部署静态网站。