# wireguard 


[WireGuard](https://zh-wireguard.com/) 是一款极其简单但快速且现代的 VPN。


wg_conf:
```
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

```
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