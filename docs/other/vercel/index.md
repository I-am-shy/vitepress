# vercel 部署 node 服务和解决 vercel 不可访问的问题

:::danger 前言
本文假定你已具备以下条件：
- 掌握 node 基础知识
- 拥有 github 账号并掌握 git 基础知识
- 对域名 DNS 解析和服务部署有一定的了解
:::

## 什么是 Vercel

[Vercel](https://vercel.com/) 是一个为开发者提供的平台，它提供了构建和部署您的网络应用所需的所有工具、工作流程和基础设施，无需额外配置。

Vercel 支持开箱即用的流行的前端框架 ，其可扩展、安全的基础设施在全球范围内分布，以便从靠近用户的数据中心提供内容，以实现最佳速度。

开发过程中，Vercel 提供了实时协作工具，例如自动预览和生产环境，以及预览部署的评论功能。(此功能需要升级到 Pro 服务非免费提供)

:::details what is vercel

Vercel is a platform for developers that provides the tools, workflows, and infrastructure you need to build and deploy your web apps faster, without the need for additional configuration.

Vercel supports popular frontend frameworks out-of-the-box, and its scalable, secure infrastructure is globally distributed to serve content from data centers near your users for optimal speeds.

During development, Vercel provides tools for real-time collaboration on your projects such as automatic preview and production environments, and comments on preview deployments.

:::

:::tips 说明
vercel 免费提供部署静态网站和Serverless Functions 服务。但是 vercel 的部署服务默认提供的域名在国内无法访问，需要更换自己的域名来访问服务。

:::

## 使用 vercel 部署 node 服务

1. 进入到项目中，点击右上角的 `add new.. --> project` 选择 `express.js on vercel` 模版进行创建项目，绑定到自己的 github 仓库中。

2. 使用 git clone 到本地，并安装依赖。

3. 使用 vercel cli 本地预览 vercel 服务。


vercel cli 是 vercel 的命令行工具，可用于本地预览 vercel 服务。
安装 Vercel CLI：

````bash
npm i -g vercel
````

登录 vercel 账号（如果还没有账号，请先注册）：

````bash
vercel login
````

然后在存储库的根目录运行该应用程序：

````bash
vercel dev 
````

调试好代码后提交到 github 仓库中，vercel 会自动部署服务。

:::warning 注意
这里有几个坑需要注意：
1. vercel 环境与普通 node 环境有所不同，无法直接移植运行一般的 express 项目。代码会略有不同，例如，vercel 会自动分配端口，不需要使用 listen 方法监听端口。详细的差异请参考 [官方文档](https://vercel.com/docs/frameworks/backend/express)
2. vercel 的部署默认情况下只有和 vercel 绑定的 git 账户提交的 commit 才会自动部署，其他账户提交的commit 不会自动部署。如果需要其他账户提交的commit 也自动部署，需要将其他账户的 git 账户添加到 vercel 中（此功能需要升级服务非免费提供）。
:::

## 解决 vercel 不可访问的问题

vercel 部署服务默认提供的域名在国内无法访问，需要更换自己的域名来访问服务。

1.  准备好一个域名，在 vercel 项目 settings 中点击 `Domains --> Add domain` ，添加域名解析记录并复制项目部署的 ip 地址。例如 `xxx.xxx.com`，ip 地址为 `xx.xx.xx.xx`。

2. 在域名的 DNS 服务商中添加 `xxx.xxx.com` 的解析记录，解析记录的 ip 地址为 `xx.xx.xx.xx`。

3. 回到 vercel 项目 `settings--> Domains` 中查看域名解析生效后即可通过 `xxx.xxx.com` 访问服务。