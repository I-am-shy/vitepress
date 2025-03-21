# docker基本命令

## 拉取镜像 
从docker hub拉取镜像
```bash
docker  pull [镜像名]
# 例如：docker  pull ubuntu:latest
```

## 查看镜像
查看本地镜像
```bash
docker image ls
```
```bash
➜  ~ docker image ls         
REPOSITORY    TAG       IMAGE ID       CREATED       SIZE
node          latest    990d0ab35ae1   7 days ago    1.6GB
ubuntu        latest    72297848456d   7 weeks ago   139MB
hello-world   latest    7e1a4e2d11e2   8 weeks ago   17kB
```

## 新建并且启动容器
```bash
docker run [OPTIONS] [镜像名] [命令]
```
:::tip 提示
OPTIONS说明（常用）：有些是一个减号，有些是两个减号
- `--name=“容器新名字”`: 为容器指定一个名称
- `-d`: 后台运行容器，并返回容器ID，也即启动守护式容器
- `-i`: 以交互模式运行容器，通常与 `-t` 同时使用
- `-t`: 为容器重新分配一个伪输入终端，通常与 `-i` 同时使用
- `-P`: 随机端口映射
- `-p`: 指定端口映射，有以下四种格式:
  1. `ip:hostPort:containerPort`
  2. `ip::containerPort`
  3. `hostPort:containerPort`
  4. `containerPort`
:::

## 查看正在运行的容器
```bash
docker ps / docker container ls
```
```bash
➜  ~ docker ps       
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
➜  ~ 
```

## 启动容器
已经根据镜像创建过容器，只不过创建的容器暂时未启动
```bash
docker start [容器ID或者容器名]
```


## 停止容器
停止正在运行的容器
```bash
docker stop [容器ID或者容器名]
```

## 退出并停止容器
```bash
exit
```

## 删除容器
删除容器
```bash
docker rm [容器名]
```

## 删除镜像
删除镜像
```bash
docker rmi [镜像名] / docker image rm [镜像名]
```

## 查看容器日志
查看容器日志
```bash
docker logs [容器名]
```


## 使用一个镜像

1. 拉取镜像
```bash
docker pull ubuntu:latest
```
`latest` 表示最新版本(默认值)

2. 运行容器
```bash
docker run -it ubuntu 
```

3. 退出容器
```bash
exit
```

:::warning 注意
docker 中的 Linux 系统没有 sudo 命令，默认为最高权限
:::

## 更多

- [Docker 入门教程|阮一峰的网络日志](https://ruanyifeng.com/blog/2018/02/docker-tutorial.html)
- [Docker的基本使用|阿里云开发者社区](https://developer.aliyun.com/article/1589388)