# 内网穿透

---

内网穿透（NAT Traversal）是指允许外部网络（互联网）设备直接访问处于私有网络（局域网）内部设备或服务的技术，它可以有很多种方案，比如 花生壳、cloudflare Tunnel 等等。大多数内网穿透方案采用 **“反向代理隧道”** 或 **“中转服务器”** 机制。

> [!NOTE] 核心原理：
> 将内网设备（比如本地计算机）环境和公网服务器建立连接，后续即可通过公网服务器访问内网设备。    
> **安全提示**：内网穿透相当于在安全的局域网防火墙上“开了一扇窗”，注意配置强密码防止本地设备被入侵。

``` md
[局域网设备] ──(主动向外连接)──> [公网中转服务器] <──(发起访问)── [外网用户客户端]
     │                                    ▲
     └─────────────── (建立数据隧道) ──────┘
```

## 使用案例

### 通过 cloudflare Tunnel 连接服务器

> [!NOTE] 背景
> 服务器与本地设备无法建立连接，通过 cloudflare Tunnel 中转（需要一个在 cloudflare 解析的域名）。[这里吐槽一下某里云的海外服务器，客服的回复是：海外服务器有可能会无法直连，后续可能会恢复，但是通过控制台是可以连上的。反正就是变成了薛定谔的服务器，可能能连上，也可能连不上]

**原理**：服务器将 22 端口（ssh 服务）挂到 cloudflare Tunnel 上，本地设备可以通过 cloudflare Tunnel 的服务连上服务器。

![cloudflare](https://developers.cloudflare.com/_astro/handshake.eh3a-Ml1_26dKUX.webp)

**实现流程**：

1. 进入 [cloudflare](https://dash.cloudflare.com/) 控制台的 Tunnels 页面。
2. 创建一个隧道，按照提示在服务器中安装 `cloudflared` 工具并连接到隧道（创建副本）。
3. 开启一个路由（需要代理的服务），选择`添加已发布应用程序` -> 输入一个新的子域名（比如 ssh.xxx.com ）和服务 URL（服务器的服务连接，这里需要代理 ssh ，url 为 tcp://localhost:22）
4. 路由开启后，本地按以下示例配置 ssh 配置文件，即可通过 `ssh myDomain` 连接到服务器的 ssh 服务（22 端口的 tcp 服务）

    `~/.ssh/config`（ Windows 为 `C:\Users\用户名\.ssh\config`）：

    ``` text
    Host myDomain
        ProxyCommand cloudflared access ssh --hostname %h
    ```

**注意事项**：
1. 服务器使用的 cloudflared 工具，建议开启守护进程确保终端关闭后能够保持隧道连接。
2. ssh 服务默认是 22 端口，如果修改过 ssh 服务的端口号以实际的端口号为准。

### 通过 cloudflare DNS 代理 http（websocket）服务

> [!WARNING] 注意
> 需要准备一个在 cloudflare 解析的域名

**实现流程**：

1. 进入 [cloudflare](https://dash.cloudflare.com/) 控制台，选择域名 - DNS 记录。
2. 新建一个 A 记录（子域名）指向服务器的公网 IP 地址，并保持橙云代理按钮打开（默认开启）。
3. 在服务器中解析子域名（通常使用 nginx 反向代理），将服务的端口号和子域名绑定。绑定成功后即可通过子域名访问指定端口号的 http 和 websocket 服务。

::: details 域名、ip、端口之间的关系
1. 域名通过 DNS 服务器解析和服务器的 ip 进行绑定，但无法和具体的端口号关联。即通过域名只能得到 ip 地址。
2. 通过 ip 可以直接关联到服务器的端口，例如 x.x.x.x:3000，表示此 ip 下的 3000 服务。即通过 ip 可以得到服务端口号。
3. 域名和端口直接关联需要通过服务器本地的反向代理，通常使用 nginx。通常在 80（http），443（https） 端口进行代理，将不同的子域名和端口服务进行绑定。
    ```nginx
    server {
        listen 80;
        server_name server.xxx.com; # 需要和端口服务绑定的子域名

        location / {
            proxy_pass http://127.0.0.1:8080; # 将请求转发给本机的 8080 端口
        }
    }
    ```
:::


## 关于反向代理

1. 什么是反向代理？

> 反向代理是服务端使用的，隐藏了真实提供服务的服务端。

反向代理是服务端对客户端隐藏真实 ip 提供服务。即直接请求的服务器是一个中转（代理）服务器，不是提供服务的服务器，服务并没有部署到这上面。

2. 反向代理和正向代理是什么关系？

> 正向代理是客户端使用的，隐藏了真实发起请求的客户端。

正向代理是客户端对服务端隐藏真实 ip 请求服务。即直接发起请求的客户端是一个中转（代理）服务器，不是真正的客户端，中转服务器拿到响应后真实的客户端再从中获取响应结果。


## 参考

- [Create your first tunnel](https://developers.cloudflare.com/tunnel/setup/)
