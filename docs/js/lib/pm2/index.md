# PM2 

## 简介

[PM2](https://pm2.keymetrics.io/) 是一个守护进程管理器，适用于生产环境下应用持续运行和重载。

P(roject) M(anager) 2 可管理多种类型的应用和服务，并且支持应用服务监控和日志管理。

## 安装

::: code-group
```bash [npm]
npm install pm2 -g
```
```bash [bun]
bun install pm2 -g
```
:::

## 使用

### pm2 start 

启动应用，并将其作为守护进程运行。

```bash
pm2 start <可执行文件、打包后的二进制文件、可执行命令>

pm2 start app.js

pm2 start ./bin/www

pm2 start "npm run dev"
```
通过 `--name(n)` 参数可以为应用指定一个名称（默认使用文件名），方便后续管理。
```bash
pm2 start app.js --name "my-app"
pm2 start app.py -n "python-app"
```

### pm2 list(ls)

列出所有运行的应用。

```bash
pm2 list
```

### pm2 stop

停止应用。

```bash
pm2 stop <app_name|namespace|id|'all'|json_conf>

pm2 stop app

pm2 stop 0
```

### pm2 restart

重启应用。

```bash
pm2 restart <app_name|namespace|id|'all'|json_conf>

pm2 restart app

pm2 restart 0
```


### pm2 delete(del)

删除应用。

```bash
pm2 delete <app_name|namespace|id|'all'|json_conf>

pm2 delete app

pm2 delete 0
```

### pm2 kill

停止 pm2 守护进程，关闭所有应用。

```bash
pm2 kill
```

### pm2 logs

查看应用的日志。

```bash
pm2 logs  # 显示所有应用的日志
pm2 logs APP-NAME       # 显示 APP-NAME 日志
pm2 logs --json         # JSON 输出
pm2 logs --format       # 格式化输出
```

### pm2 monit

监控应用的资源使用情况。

```bash
pm2 monit
```