# 打包一个镜像


## 准备一个初始项目

此处使用一个简单的web程序为例，项目结构如下：

```bash
.
├── index.html
└── index.js
```

## 编写dockerfile 和 .dockerignore

在项目根目录下创建一个Dockerfile和.dockerignore文件，内容如下：

```dockerfile
# dockerfile
FROM node:20.11.0
COPY . /app
WORKDIR /app
RUN npm install http-server -g --registry=https://registry.npmmirror.com/
EXPOSE 5500
CMD ["http-server", "-p", "5500", "-o", "/app/index.html"] 
```

以下是dockerfile每行命令的说明：
  - FROM 指定基础镜像，这里使用node:20.11.0作为基础镜像。
  - COPY 将当前目录下的所有文件复制到镜像中的/app目录下。
  - WORKDIR 设置工作目录为/app。
  - RUN 安装http-server。
  - EXPOSE 暴露5500端口。
  - CMD 运行http-server。

**RUN命令与CMD命令的区别：**   
简单说，RUN命令在 image 文件的构建阶段执行，执行结果都会打包进入 image 文件；CMD命令则是在容器启动后执行。另外，一个 Dockerfile 可以包含多个RUN命令，但是只能有一个CMD命令。

```bash
# .dockerignore

.git
node_modules
.gitignore
.DS_Store
.vscode
.idea
.env

```

::: warning 注意

.dockerignore文件中的内容会被忽略，不会被打包到镜像中。这里的web示例比较简单，没有忽略任何东西。这个示例中.dockerignore文件并没有作用可以省略。

:::

此时的目录结构如下：

```bash
.
├── .dockerignore
├── dockerfile
├── index.html
└── index.js
```



## 构建镜像

在项目根目录下执行以下命令：

```bash
docker image build -t my-web-app .
```
或
```bash
docker image build -t my-web-app:0.0.1 .
```

这里可以指明镜像的版本号，也可以不指明。

::: warning 注意

命令中的 `.` 表示Dockerfile文件所在目录，也可以指定一个具体的Dockerfile文件。

:::

构建完成后可以在命令行中输入 `docker image ls` 查看镜像列表，结果类似：

```bash
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
my-web-app          latest              d7163b7f2928        10 minutes ago      947MB
my-web-app          0.0.1               d7163b7f2928        10 minutes ago      947MB
```

或者可以在docker桌面程序中查看


## 运行镜像

在项目根目录下执行以下命令：

```bash
docker run -p 5501:5500 my-web-app:latest
```
或
```bash
docker run -p 5501:5500 my-web-app:0.0.1
```

运行的镜像名称需要根据打包时的版本后来选择 `my-web-app:latest` 或 `my-web-app:0.0.1`。

`-p 5501:5500` 表示将本机的5501端口映射到容器的5500端口。 这样在浏览器中访问本机的5501端口，即可看到docker打包的网页。


运行结果如下：
```bash
Starting up http-server, serving ./

http-server version: 14.1.1

http-server settings: 
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://127.0.0.1:5500
  http://172.17.0.4:5500
Hit CTRL-C to stop the server
Open: http://127.0.0.1:5500
```

此时打开命令行中提示的链接（根据run命令本机端口映射，这里为127.0.0.1:5501），即可看到docker打包的网页


## 参考

- [Docker 入门教程|阮一峰的网络日志](https://ruanyifeng.com/blog/2018/02/docker-tutorial.html)