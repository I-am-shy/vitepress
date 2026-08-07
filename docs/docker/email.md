# docker 本地部署电子邮件系统

> [!TIP] 
> 构建方案：[Poste.io](https://poste.io/) + [Caddy](https://caddyserver.com.cn/docs/) + [Cloudflare](https://dash.cloudflare.com/)
>
> 电子邮件（email），是一种使用电子设备通过计算机网络传递消息的通信方法。自建电子邮件系统是一项涉及服务器、域名、网络协议以及安全反向解析的综合工程。

## 前提条件

1. 具有公网独立 IPv4 的云服务器（如腾讯云、阿里云、海外 VPS 等），开启 TCP 25 端口（云厂商通常会把 25 端口的出站封禁，防止恶意发送邮件）。
2. 拥有一个顶级域名，并使用 DNS 解析一个二级域名作为邮件服务器主机名。


## 核心部署与服务配置

### 1. 防火墙端口放行
在云服务器控制台（安全组）和系统内部防火墙（如 UFW / Firewalld）中，必须完全放行以下端口的 TCP 流量：

* 网页与证书：80, 443
* 邮件收发核心：25 (SMTP)
* 客户端收发信：143, 993 (IMAP收信，可选)

### 2. Docker 运行 Poste.io 容器
使用 `-e "HTTPS=OFF"` 参数关闭容器内强制跳转（不关闭可能会导致重定向次数过多，无法打开邮箱后台），将管理端口映射到宿主机高位端口（如 8880），防止与反向代理冲突。

启动 mailserver 邮件服务

```bash
docker run -p 25:25 -p 993:993 -p 127.0.0.1:8880:80 \
  -v /app/email-data:/data \
  --name "mailserver" \
  -h "email.shyshi.top" \
  -e "TZ=Asia/Shanghai" \
  -e "HTTPS=OFF" \
  --restart always \
  -d analogic/poste.io
```

参数说明：

* `-d`：后台运行（Daemon 模式）。让容器在后台持续运行，不会占用当前的终端窗口。
* `--restart always`：自动重启策略。无论是因为报错崩溃，还是 Docker 服务本身重启，该容器都会自动重新启动。
* `analogic/poste.io`：镜像名称。指定使用 Poste.io 官方提供的邮件服务器镜像。

> [!WARNING] 网络与端口映射 (-p)
> 格式通常为 `宿主机端口:容器端口` 或 `IP:宿主机端口:容器端口`

* `-p 25:25`：SMTP 端口。用于邮件服务器之间发送和接收邮件。
* `-p 993:993`：IMAPS 端口。用于客户端（如 Outlook、Foxmail）通过加密安全连接收取邮件。
* `-p 127.0.0.1:8880:80`：Web 管理面板端口。将容器内的 80 端口（HTTP）映射到宿主机的 8880 端口。特别的是，它限制了 127.0.0.1，意味着该管理后台只能在服务器本地访问（或通过 SSH 隧道访问），无法从外网直接通过 IP 访问，提高了安全性。

* `-v /app/email-data:/data`：数据卷挂载。将宿主机的 `/app/email-data` 目录(自定义目录即可)映射到容器内的 `/data` 目录。邮件、账号、配置等所有核心数据都会保存在宿主机上，即使容器被删除，数据也不会丢失。
* `--name "mailserver"`：容器别名。将这个容器命名为 mailserver，方便后续使用 docker stop mailserver 等命令进行管理。
* `-h "email.shyshi.top"`：设置容器内的主机名 (Hostname)。这是邮件服务器的关键设置，Poste.io 会使用它作为发件时的邮件服务器域名身份（HELO/EHLO 域名）。
* `-e "TZ=Asia/Shanghai"`：设置时区。将容器内部的时区设置为上海时间（北京时间），确保邮件收发的时间戳准确。
* `-e "HTTPS=OFF"`：关闭内置 HTTPS。告诉 Poste.io 内部不需要自己生成 SSL 证书，通常用于通过外部的 Nginx、Caddy 或 Traefik 等反向代理来统一处理 HTTPS 证书的场景。


### 3. Caddy 反向代理配置

> [!WARNING] 为什么需要反向代理？
> Poste.io 默认使用的是 80 端口服务，前面的启动命令改成了映射到宿主机的 8080。80 端口通常是代理工具（nginx，caddy）在使用，此时不使用反向代理会造成冲突 (Poste.io 和代理工具争夺端口)。
>    
> **这一步也可以使用 nginx 配置反向代理**。

配置 Caddy 将网页流量转发至 Poste.io 的管理端口：

Caddyfile:
```caddy
email.shyshi.top {
    reverse_proxy 127.0.0.1:8880
}
```

配置完成后按顺序执行：  
1. 检查配置：`caddy validate --config /etc/caddy/Caddyfile` 检查配置是否正确
2. 重启服务：`sudo systemctl restart caddy` 使配置生效


## 关键的 DNS 域名解析配置 (以 Cloudflare 为例)

| 记录类型 | 主机名 (Name) | 记录值 (Value/Target) | TTL / 代理状态 | 作用说明 |
|---|---|---|---|---|
| A | email(自定义的二级域名) | 你的服务器公网 IP | 仅限 DNS (灰色云朵) | 必须关掉代理，否则邮件协议无法穿透，收发信必失败。 |
| MX | @ (或留空) | `email.[你的域名]`(优先级: 10) | 仅限 DNS (默认，灰色云朵) | 指向邮件服务的 A 记录（二级域名），表示通过域名收发邮件时（xxx@你的域名）将流量执行此记录。这样可以使域名（你的域名）既可以作为网页服务，也可以作为邮件服务。 |


**Cloudflare 网页访问联动设置**：
当 `email.[你的域名]` 的 A 记录改为灰色云朵直连后，为了让 Caddy 顺畅申请 SSL 证书且不触发重定向死循环，需将 Cloudflare 控制台的 SSL/TLS 加密模式修改为 “完全 (Full)” 或 “严格 (Strict)”。


## 后台初始化

1. 初始化安装：浏览器首次访问 `https://email.[你的域名]`，填写邮件服务器主机名（email.[你的域名]），并设置管理员邮箱（如 admin@[你的域名]）及密码。
2. 创建邮箱账号：登录后台进入 Virtual domains -> 点击域名 -> 点击 Create user 即可为自己或团队创建任意前缀的邮箱（如 me@[你的域名]）。
3. 进入邮箱页面：访问 `https://email.[你的域名]/webmail` 进入邮箱页面即可使用。


## 参考

- [什么是电子邮件？| 电子邮件的定义](https://www.cloudflare-cn.com/learning/email-security/what-is-email/)
