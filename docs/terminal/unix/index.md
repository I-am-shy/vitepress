# unix 命令

---

:::tip
Linux（类 unix） 和 macOS（unix） 能兼容大部分 unix 命令。
:::

这些命令允许您创建目录和处理文件已经管理系统用户和权限。


| 命令   | 描述 | 用法示例 |
|--------|------|----------|
| cat | 显示文件内容 | `cat file.txt` / `cat -n file.txt` |
| cd | 更改目录到目录名 | `cd ~/Desktop` / `cd ..` |
| chmod | 更改权限 | `chmod 755 script.sh` / `chmod +x script.sh` |
| cp | 复制源文件到目的地 | `cp a.txt b.txt` / `cp -r folder/ backup/` |
| file | 确定文件类型 | `file image.png` |
| find | 查找文件 | `find . -name "*.md"` / `find /tmp -type f` |
| ll | 显示文件详细信息（相当于 `ls -l`） | `ll` / `ll -h` |
| ls | 显示文件和目录信息 | `ls` / `ls -la` |
| mkdir | 创建新目录 | `mkdir docs` / `mkdir -p a/b/c` |
| open | 打开文件或文件夹 | `open .` / `open file.txt` |
| mv | 移动或重命名文件 | `mv a.txt ~/Desktop/` / `mv old.txt new.txt` |
| pwd | 打印当前工作目录 | `pwd` |
| rm | 删除文件或目录 | `rm file.txt` / `rm -rf dir` |
| rmdir | 删除空目录 | `rmdir empty_dir` |
| touch | 更新文件时间或创建文件 | `touch new.txt` |
| vi,vim | 文本编辑器 | `vi file.txt` / `vim file.txt` |
| gzip | 压缩文件 | `gzip file.txt` / `gzip -d file.txt.gz` |
| who | 显示当前登录用户信息 | `who` |
| whoami | 显示当前用户名 | `whoami` |
| uname | 显示系统信息 | `uname -a` |
| uptime | 显示系统运行时间 | `uptime` |
| df | 显示磁盘空间使用情况 | `df -h` |
| du | 显示文件夹大小 | `du -sh .` / `du -h directory/` |
| free | 显示内存使用情况 | `free -h` |
| ps | 显示进程信息 | `ps aux` |
| top | 显示系统中所有进程的详细信息 | `top` |
| kill | 终止进程 | `kill 1234` / `kill -9 1234` |
| date | 打印系统时间 | `date` / `date +'%F %T'` |


## 常用的文件操作流程

### 查看文件

1. 切换到一个目录 `cd /doc` 
2. 查看当前目录下的文件和目录 `ls`
3. 查看文件内容 `cat 文件名`

### 新建文件
1. 查看当前目录下的文件和目录 `ls`
2. 切换到一个目录 `cd <file/dir>` 
3. 新建一个文件 `touch 文件名` 或 `cat > 文件名` 或 `echo "内容" >> 文件名` 或 `vim/vi 文件名`

### 编辑文件

1. 切换到一个目录 `cd <file/dir>` 
2. 查看当前目录下的文件和目录 `ls`
3. 编辑一个文件 `vim 文件名`

### 打开文件

1. 切换到一个目录 `cd <file/dir>` 
2. 查看当前目录下的文件和目录 `ls`
3. 打开一个文件 `open 文件名`

:::tip
`open .` 打开当前目录
:::

## 关于权限和环境变量

### permission denied

在 mac 中使用命令遇到 `permission denied` 的错误，通常是因为权限不足，需要使用 `chmod` 命令来修改文件的权限，或者在命令前加上 `sudo` 输入登录密码来获取更高的权限。

### 环境变量

### 查看环境变量
```bash
echo $PATH
```

### mac设置环境变量

1. 打开终端（Terminal）。
2. 输入以下命令来编辑你的shell配置文件。如果你使用的是bash，那么文件是.bash_profile；如果是zsh，则是.zshrc。如果你不确定使用的是哪个shell，可以通过在终端输入echo $SHELL来查看。
- 对于bash：
`nano ~/.bash_profile`
- 对于zsh：
`nano ~/.zshrc`
3. 在打开的文件中，在文件末尾添加你需要的环境变量。例如，设置PATH变量：
`export PATH=$PATH:/your/new/directory`

`$PATH` :  表示原来的环境变量参数，这里将新的环境变量接在后面
或者设置一个新的环境变量：
`export MY_VARIABLE="some_value"`
4. 保存并关闭文件。如果你使用的是 nano (也可以使用 vi，vim)，可以按 `Ctrl + X`，然后按 `Y` 确认保存，最后按 `Enter` 键。
5. 最后重新打开终端生效


## 查看设备 ip 地址

**mac/linux**:
```bash
#查看ip完整信息
ifconfig 

#查看en0 接口的 IP 地址（通常是 Wi-Fi 接口）
ipconfig getifaddr en0
```

**windows**:
```bash
ipconfig
```
## 解除端口占用

**mac/linux**:

```bash
# 查看端口的进程信息，找到对应的进程id，然后使用 kill 命令杀死进程
lsof -i:<端口号>

kill -9 <进程pid>
```

**window(powershell)**:
```powershell
# 查看端口的进程信息，找到对应的进程id，然后使用 kill 命令杀死进程
netstat -aon | findstr <端口号>

kill <进程pid>
```

## 管道符 `|`

管道符 `|` 用于将一个命令的输出作为另一个命令的输入。

**基本使用**： `命令A | 命令B`

```bash
# 查找包含nginx的进程
ps aux | grep "nginx" 
# 统计当前目录下文件和目录数
ls -l | wc -l 
# 排序并去重
cat file.txt | sort | uniq 
# 分页查看
cat long_file.txt | less 
```


> [!NOTE] 注意
> - 管道只处理前一个命令的标准输出（Stdout），不处理标准错误（Stderr）。
> - 若需处理标准错误，可使用 `|&`。
> - 部分命令（如 rm, cat）不支持管道直接传递参数，需配合 `xargs` 使用。


### 管道符参数化

`xargs` 用于将管道符的输出作为另一个命令的输入，并将其参数化。

- `-n` 参数：指定每个命令的参数数量。
- `-I` 参数：指定一个字符串，用于替换每个命令的参数，默认为 `{}`。


```bash
# 
cat file.txt | xargs echo
```

**使用示例**

- 批量删除文件
```bash
find . -name "*.tmp" | xargs rm -f
```

- 处理带空格的文件名
```bash
find . -name "*.txt" -print0 | xargs -0 rm
```

### 区分 `｜` 和 `| xargs`

- 直接用管道 `|`：传递输入、输出流（stdin、stdout）。相当于你把纸条塞进碎纸机，如果后一个命令不支持 stdin，它会直接忽略这张纸。
- 配合 `xargs`：传递 命令行参数 (Arguments)，泛用性更强。相当于你把纸条上的文字读出来，作为指令传达。

## 定时任务 

### cron 表达式

Cron 表达式是一种用来设定定时任务执行时间的字符串。它通常由 5 到 7 个空格分隔的字段组成，核心字段包括分钟、小时、日期。

标准的 Cron 表达式从左到右常见结构为：（秒）、分、时、日、月、周、（年）
```txt
field          allowed values
-----          --------------
second         0-59
minute         0-59
hour           0-23
day of month   1-31
month          1-12 (or names, see below)
day of week    0-7 (0 or 7 is Sunday, or use names)
year           1-9999
```

**常用特殊符号**
- `*`：代表所有可能的值（如月份中的 * 表示每个月）
- `,`：代表列出枚举值（如周 1,3,5 代表周一、周三、周五）
- `-`：代表范围（如时 9-17 代表上午 9 点到下午 5 点）
- `/`：代表步长/间隔（如分 */10 代表每隔 10 分钟）

**常见写法示例**
- `0 * * * *`：每小时的第 0 分钟执行一次
- `*/5 * * * *`：每隔 5 分钟执行一次
- `0 0 12 * * ?`：每天中午 12 点整执行一次
- `30 10 1 * *`：每月 1 号上午 10:30 执行一次

### crontab 命令

crontab 是用来设置和管理周期性定时任务的命令，核心操作命令包括：-e 编辑任务、-l 列出任务、-r 删除任务。


**每分钟打印日志**

```bash
crontab -e

# 在文件编辑器中使用 corn 表达式设置定时任务
# 此处的命令和文件位置都必须用绝对路径，不能使用别名
* * * * * echo "hello" >> /tmp/hello.log 2>&1
```

> [!TIP] 说明
> 以上命令包含 2 个部分：corn 表达式(* * * * *)，待执行的命令(echo "hello" >> /tmp/hello.log 2>&1)。    
>  ::: details 2>&1 表示将标准错误输出（Stderr）重定向到标准输出（Stdout）。
>  在 Linux 系统中，系统用数字来代表不同的输入输出流：
>  - `0`：标准输入（Stdin）
>  - `1`：标准输出（Stdout，即普通的正常屏幕输出）
>  - `2`：标准错误（Stderr，即程序报错时的屏幕输出）
>
>  在 `2>&1` 中：
>  - `2>`：准备重定向标准错误（2）。
>  - `&1`：代表标准输出（1）。这里的 & 是为了告诉系统 1 是一个文件描述符，而不是一个名叫 "1" 的普通文件。
>
>  通常情况下只有标准输出才能通过管道符传到下一个命令。加上 2>&1 后，无论是正常输出还是报错信息，都会统一写入到同一个日志文件中，方便后续排查问题。
>
>  :::

之后再检查 /tmp/hello.log 文件的内容，即可看见这个定时任务的输出。
```bash
cat /tmp/hello.log

# 输出 hello
```