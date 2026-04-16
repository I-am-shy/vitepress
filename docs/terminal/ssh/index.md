# ssh 

## 什么是 ssh

SSH（Secure Shell）是一种加密的网路传输协议，常用语远程登录和文件数据传输。例如，远程服务器登录，github 仓库克隆等。

ssh 包含客户端和服务端两个部分：客户端保存了加密私钥，用户配置等信息；服务端保存了加密公钥，登录配置项等信息。

ssh 的配置信息都存储在 `~/.ssh/` 目录下，包括：
- `id_ed25519`：私钥文件，命名可自定义
- `id_ed25519.pub`：公钥文件，.pub 文件 命名可自定义
- `authorized_keys`：授权的公钥列表 （服务端配置）
- `known_hosts`：已知的主机列表
- `config`：ssh 配置文件

常用的 ssh 命令有：
- [ssh](#ssh-命令)：登录远程服务器
- [ssh-keygen](#ssh-keygen-命令)：生成 ssh 公钥和私钥
- [ssh-copy-id](#ssh-copy-id-命令)：将公钥复制到远程服务器
- [scp](#scp-命令)：在本地和远程服务器之间复制文件

## ssh 命令

使用以下命令登录远程服务器：

```bash
ssh [选项] [用户名]@[主机名或IP地址]
# 例如：ssh root@192.168.1.1
```

| 选项 | 描述 |
|------|------|
| -p | 指定端口，默认 22 |
| -i | 指定私钥文件 ， 默认会读取 known_hosts 文件中的记录选择|
| -o | 指定配置文件，默认 `~/.ssh/config` |

> [!tip] 关于 known_hosts 文件
> known_hosts 文件记录了连接过的主机列表。使用 ssh 命令时使用 tab 会根据 known_hosts 文件中的记录补全命令。  
>
> known_hosts 文件格式
> ```text 
> [主机 ip 或域名] [ssh 公钥值]
> [主机 ip 或域名] [ssh 公钥值]
> ...
> ```

### ssh 密码登录

ssh 支持使用密码登录，需要对服务器端的 SSH 配置文件进行修改。

```bash
sudo vim /etc/ssh/sshd_config
```

在配置文件里，找到以下两行内容，并进行相应修改：

```bash
PasswordAuthentication yes # 启用密码登录
PermitRootLogin yes      # 若需要以 root 账号通过密码登录，则启用此项
```

修改后保存并重启 SSH 服务：

```bash
sudo service ssh restart
```

此时可以使用 ssh 密码登录远程服务器。

```bash
ssh root@192.168.1.1
# root@192.168.1.1's password:
```

输入 root 账户的密码即可连接。

## ssh-keygen 命令

ssh-keygen 命令用于生成 ssh 公钥和私钥。

```bash
ssh-keygen [选项]
```

**常用参数**

| 选项 | 描述 |
|------|------|
| -t | 指定密钥类型（rsa, dsa, ecdsa, ed25519）。 |
| -b | 指定密钥长度（RSA 通常为 4096）。 |
| -C | 提供一个注释（通常为邮箱）。 |
| -f | 指定保存密钥的文件名，默认为 `id_[密钥类型]` |

**示例**

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

执行后会生成 `id_ed25519` 和 `id_ed25519.pub` 两个文件。

- `id_ed25519`：私钥文件，个人身份认证文件
- `id_ed25519.pub`：公钥文件，需要上传到服务器，服务器中验证私钥的文件

> [!warning] 注意
> 使用过的密钥对务必要保管好私钥，不要泄露给他人，以免造成安全风险。

## ssh-copy-id 命令

ssh-copy-id 命令用于将公钥复制到远程服务器。使用 ssh-copy-id 命令需要先使用 ssh-keygen 生成密钥对。

```bash
ssh-copy-id [选项] [用户名]@[主机名或IP地址]
```

**常用参数**

| 选项 | 描述 |
|------|------|
| -i | 指定私钥文件 |
| -p | 指定端口，默认 22 |

**示例**

```bash
ssh-copy-id root@192.168.1.1
# root@192.168.1.1's password:
```

执行后会提示输入密码，输入密码即可将公钥复制到远程服务器。后续登录远程服务器时，会自动使用该密钥进行认证无需输入密码。

## ssh config 配置

ssh config 配置文件（~/.ssh/config）用于配置 ssh 的连接信息，包括主机名，端口，用户名，私钥文件等。


```bash
Host [自定义的账户名，用于区分不同的主机，使用 `*` 通配符表示通用配置]
    HostName [主机名或IP地址]
    User [用户名]
    Port [端口]
    IdentityFile [私钥文件位置]
    ForwardAgent: 设置为 yes 可启用 Agent 转发。
```

**示例**

```bash
# 通用配置
Host *
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa

# server1 登录配置
Host server1
    HostName 192.168.1.100
    User admin
```

此时可以使用 `ssh server1` 命令登录到 192.168.1.100 服务器。

## scp 命令

scp (secure copy) 命令用于在本地和远程服务器之间复制文件。

```bash
scp [选项] [源文件] [目标文件]
```

源文件和目标文件都可以是本地文件或远程服务器文件的地址。其中远程服务器文件的地址格式为：`[用户名]@[主机名或IP地址]:[文件路径]`。

**常见参数**

| 选项 | 描述 |
|------|------|
| -r | 递归复制整个目录。 |
| -P | 指定远程主机的 SSH 端口号。 |
| -p | 保留原文件的修改时间、访问时间和权限。 |
| -C | 在传输过程中压缩数据。 |
| -v | 显示详细的传输进度信息，用于调试。 |

**示例**

本地文件复制到远程服务器：
```bash
scp ./local_file.txt root@192.168.1.100:/root/remote_file.txt
```

远程服务器文件复制到本地：
```bash
scp root@192.168.1.100:/root/remote_file.txt ./local_file.txt
```

> [!tip] 注意
> 如果没有配置密钥登录，每次复制文件都需要输入密码。

