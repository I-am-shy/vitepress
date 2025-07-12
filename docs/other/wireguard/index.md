# wireguard 


[WireGuard](https://zh-wireguard.com/) 是一款极其简单但快速且现代的 VPN。

 wg genkey | tee privatekey | wg pubkey | tee publickey

wg_conf:
```conf
[Interface]
Address = 10.8.0.1/24       # 服务端 VPN 内网 IP（建议使用 `/24` 子网）
ListenPort = 51820
PrivateKey = uBkU2x5mlRPMRIaaGzMS7KVJdJylk3gVB5tlkFbNHUg=
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE  # 指定实际网卡
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
PublicKey = mXbKJgTfUS1FwKvbzkkb5ovGoYSnM4KMm7Z8SxA0DGA=
AllowedIPs = 10.8.0.2/32, 10.8.0.3/32  # 允许客户端1 访问客户端2
PersistentKeepalive = 25               # 服务端主动发送心跳（可选）

[Peer]
PublicKey = lcDWSowK0CHPY6BVq1tFTxGdygxbvr+BsofegY34rkQ=
AllowedIPs = 10.8.0.3/32
```

peer.conf:

```conf
[Interface]
PrivateKey = SB5wir76VVHasdnMhpr5djzYozv7kPhfCZoC5jyeFGI=
Address = 192.168.196.2 # 客户端内网 IP，需与服务器网段一致
DNS = 1.1.1.1

[Peer]
PublicKey = rmxDiYAufdPQQeHFcDF+UNYostgQ6gZS1XHSXTGU3xA=
Endpoint = 47.117.73.91:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
                 
```

# 用 wg-quick 调用 wg0.conf 管理 WireGuard

可以把 WireGuard 的配置保存在一个配置文件中，启动虚拟网卡时直接调用。配置文件可以起任何文件名，扩展名必须为 .conf ，默认存储在 `/etc/wireguard/` 目录，也可以存储到其它系统默认的查找路径中，以下假设使用的配置文件为 `wg0.conf` 。

## 1. wg0.conf 参数

配置文件分两部分，一个是 [Interface] 部分，用于设置本机的参数；一个是 [Peer] 部分，用于设置连接到本机的其它电脑的参数，[Peer] 部分可以包含多个节点。

```conf
[Interface]
Address =  
ListenPort =  
PrivateKey =  
DNS =  

[Peer]
AllowedIPs =  
Endpoint =  
PublicKey =  
PersistentKeepalive =  
```

### 1.1  [Interface] 部分介绍

1. Address：设置虚拟网卡的内网地址（可选子网掩码），填写规则：
   - 可以填写任何符合规范（内网地址可选范围见链接 1,2）的内网地址，但要保证不与虚拟局域网内其它电脑的内网地址相同；
   - 可以写两行；（可选）可以写成自己的IPV6地址： `Address = fd86:ea04:1115::1/64`  。
2. ListenPort：设置 udp 监听端口，可选范围为 49152 到 65535 。
3. PrivateKey：填写本机的私钥，默认存储在本机的 `/etc/wireguard/private.key` 文本中。
4. PostUp：`wg-quick up wg0` 启动后执行的内核防火墙（ iptables ）规则，可以打通 VPN ，服务器端需此参数。
5. PostDown：`wg-quick down wg0` 执行删除启动时定义的内核防火墙（ iptables ）规则 ，服务器端需此参数。
6. DNS ，设置 DNS ，不正确设置客户端浏览器网页会无法访问外网地址。
7. SaveConfig：设为 true 之后，每次重启服务（stop service时）都会自动保存 config 。
8. MTU：一般不用改，1500没问题

### 1.2 [Peer] 部分介绍

1. PublicKey ：连接来节点的公钥，默认存储在其它电脑的 `/etc/wireguard/public.key` 文本中。
2. AllowedIPs：允许连接的内网 ip 地址。

   - 服务器与客户端应该在同一网段，如客户端的IP为 10.0.2.1/24 ，那么这里可以设置为 10.0.2.0/24 ；
   - 可以写多个，用逗号隔开。
   - 如果写为 0.0.0.0/0 表示允许任何节点连接。
3. Endpoint ：节点的外网 IP 及端口号，服务器端不需要填写。
4. PersistentKeepalive：用来保持连接检查的，每过25s会自动检查连通性，如果IP有变化，也是通过这个自动更新endpoint。

## 2. 服务器配置实例

以下是一对实际可用的服务器及本地机配置文件。

文件位置：服务器 `/etc/wireguard/wg0.conf`

```conf
[Interface]
Address = 10.0.0.1
ListenPort = 39814
PrivateKey = UA0je5EciV9i2+dSbf5mWAvRkUDVLxE/4ijMb1VnWWw=
DNS = 8.8.8.8
PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[peer]
AllowedIPs = 10.0.0.2
PublicKey = odnA2mMWrxRuKydr61bOL3xyGcKiD0KY7O33X8Rm4Hg=
```

注：服务器端必须填写路由规则，也就是 PostUp 、PostDown ；如果执行 ifconfig 显示服务器的网卡设备名称不是 eth0 而是别的名称 ，需要把 PostUp 与 PostDown 参数中的 eth0 改为你设备的名称。

## 3. 本地机可用配置

文件位置：本地机 `/etc/wireguard/wg0.conf`

```conf
[Interface]
Address = 10.0.0.2
ListenPort = 39815
PrivateKey = +JzG3eOIR0gNPzU3IDIDSR0sYgHKGH3Otr4ronpAVHw=
DNS = 8.8.8.8

[Peer]
AllowedIPs = 0.0.0.0/0
Endpoint = 139.162.88.79:39814
PublicKey = hIGcDUcR1Ob+GyLKQ9NJhx4qjWmXpOcKURXWkMDYKjc=
PersistentKeepalive = 25
```

## 4. 虚拟网络的启动与关闭

启动虚拟网络执行 `wg-quick up wg0` ，正确执行后显示如下：

```conf
[#] ip link add wg1 type wireguard
[#] wg setconf wg1 /dev/fd/63
[#] ip address add 10.0.0.2 dev wg1
[#] ip link set mtu 1420 dev wg1
[#] ip link set wg1 up
[#] resolvconf -a tun.wg1 -m 0 -x
[#] wg set wg1 fwmark 51820
[#] ip -4 route add 0.0.0.0/0 dev wg1 table 51820
[#] ip -4 rule add not fwmark 51820 table 51820
[#] ip -4 rule add table main suppress_prefixlength 0
```

关闭虚拟网络执行 `wg-quick down wg0` ，正确执行后显示如下：

```conf
[#] ip -4 rule delete table 51820
[#] ip -4 rule delete table main suppress_prefixlength 0
[#] ip link delete dev wg1
[#] resolvconf -d tun.wg1
```

## 5. 参考链接

1. 内网地址的范围（中文）：https://zh.wikipedia.org/wiki/%E4%B8%93%E7%94%A8%E7%BD%91%E7%BB%9C
2. 内网地址的范围（英文）：https://en.wikipedia.org/wiki/Private_network 
3. TCP/UDP 端口列表：https://zh.wikipedia.org/wiki/TCP/UDP%E7%AB%AF%E5%8F%A3%E5%88%97%E8%A1%A8
4. [Iptables (简体中文)]( https://wiki.archlinuxcn.org/wiki/Iptables?rdfrom=https%3A%2F%2Fwiki.archlinux.org%2Findex.php%3Ftitle%3DIptables_%28%25E7%25AE%2580%25E4%25BD%2593%25E4%25B8%25AD%25E6%2596%2587%29%26redirect%3Dno )