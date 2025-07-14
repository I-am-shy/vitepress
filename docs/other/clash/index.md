# clash
---

:::danger 本站声明
本文仅作为知识记录分享，请勿违反法律法规，造成的一切后果由个人承担。
:::

## 什么是 clash

clash 是一个客户端网络代理工具，它可以通过特殊的协议与代理服务器建立连接，然后可以将访问的流量通过代理服务器代理，再返回到客户端，从而实现绕过防火墙访问特定资源。

:::tip 原理
网络代理，本质上是当客户端通过网络请求访问资源时，将请求转让给代理服务器由代理服务器去请求，并将请求的结果转发给客户端。

当网络请求访问的资源被防火墙阻止时（通常是黑名单，即指定域名或 ip 不可访问），此时通过另外一台在防火墙外的服务器（代理服务器）去请求这个资源。由于这个服务器不在防火墙黑名单中，客户端可以访问到这个服务器，即可获取到服务器请求的资源。

![clash.svg](./clash.svg)
:::



## 搭建Trojan节点代理服务器

Trojan是一种代理协议，设计的目标是为了提供一种更加隐蔽的翻墙方式，其主要原理是模拟HTTPS协议，使得墙不能通过简单的数据包分析来确定是否为代理流量。在Trojan的设计中，代理服务器会模仿一个正常的web服务器，所有的代理流量都会伪装成正常的HTTPS流量。

### 前置条件

1. 一台可连接外网的远程服务器
2. 一个可访问的域名

:::details 怎么判断服务器能不能连接外面？
可以用服务器去连接一个外网的域名或 ip ，例如使用 ping 命令
```bash
ping 1.1.1.1 # ping google.com
```
返回结果如下：
``` bash
正在 Ping 1.1.1.1 具有 32 字节的数据:
来自 1.1.1.1 的回复: 字节=32 时间=634ms TTL=53
来自 1.1.1.1 的回复: 字节=32 时间=420ms TTL=53
来自 1.1.1.1 的回复: 字节=32 时间=314ms TTL=53
来自 1.1.1.1 的回复: 字节=32 时间=277ms TTL=53

1.1.1.1 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 277ms，最长 = 634ms，平均 = 411ms
```
此时说明服务器可以访问外网，如果丢包率为 100% 则说明不能连接外网。
:::

### 获取 trojan 工具

连接到服务器的root用户 （通过服务器供应商控制台或者 ssh 连接），执行以下命令。

```bash
source <(curl -sL https://git.io/trojan-install)
```

安装完成后获得 `trojan` 命令

```bash
$ trojan

欢迎使用trojan管理程序

1.trojan管理            2.用户管理

3.安装管理              4.web管理

5.查看配置              6.生成json

请选择: 3   

1.更新trojan

2.证书申请  

3.安装mysql
```

### 服务端配置

1. 安装 trojan ： 按顺序执行安装管理的 1，2，3 ，（证书选择 1），证书申请时需要使用域名，域名的解析 ip 需要和服务器的公网 ip 一致。（使用 cloudflare DNS 解析时需要关闭默认的代理）

2. 注册节点用户：注册一个用户，设置用户名，密码，端口需要使用 443 （伪装 https 流量）。

完成以上步骤后选择 5 查看配置 ，可以看到以下类似内容

```bash
1.
用户名: 🇺🇸美国
密码: zYMFWngc
上传流量: 1.90M
下载流量: 10.53M
流量限额: 无限制
到期日期: 无限制
分享链接: trojan://zYMFWngc@xxx.com:443#xxx.com%3A443

```
此时服务端配置完成。

### 客户端配置

安装 [clash](https://github.com/I-am-shy/vitepress/releases/download/assets/Clash.for.Windows-0.20.39-win-CN.7z) （此处以 windows 系统为例，clash 由多种版本支持windows，Android，iOS，macOS，Linux） 

配置 [yaml](https://github.com/I-am-shy/vitepress/releases/download/assets/clash_trojan_config.yaml) 文件，在如下位置进行修改，其他地方不变（注意内容需要严格缩进，不要有多余的换行和空格）

```yaml
# Trojan
- name: trojan 节点用户名
  type: trojan
  server: 代理服务器的域名（可以使用二级域名，如 vpn.xxx.com)
  port: 443
  password: trojan 节点密码
  udp: true
  sni: 代理服务器的域名（可以使用二级域名，如 vpn.xxx.com)
  alpn:
     - h2
     - http/1.1

```

在 clash 客户端界面，选择 “管理” ---> “导入” ，选择配置号的 yaml 文件，此时可以看到代理界面出现了 “节点的用户名”（显示延迟 xxx ms 表示节点连接成功，显示失败则表示连接失败或者无法访问外网）。



# 参考

- [Clash代理服务器自建节点一键搭建-Trojan搭建教程](https://clashyun.com/264.html)