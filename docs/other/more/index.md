# 更多

## npm 和 npx 的区别
npm 是 Node.js 的包管理器，是 Node.js 的默认包管理器。

:::tip 关于npx和npm
npx:包执行器
npm:包管理器

npx 的原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。
[参考来源](https://www.ruanyifeng.com/blog/2019/02/npx.html#comment-text)
:::

## WebSocket 和 WebRTC 的区别

1. 设计初衷不同
浏览器通信有主要两种传输信道：HTTP 和 WebSockets。WebSocket 的作用就是用于实现浏览器的双向机制通信。
- 对于HTTP：主要用于获取网页内容，文字或图片等，是一种客户服务类型协议，其中浏览器是客户端，而网页服务器是服务端；
- 而对于 WebSocket：浏览器通过一个 WebSocket 连接到网页服务器，与 HTTP 相同也是一个C/S类型协议。但是 HTTP 是一个单向的信道，而 WebSocket 是双向的，意味着服务器和客户端之间的连接可以一直保持到两者主动断开。
2. WebSocket 主要用于实时网页应用和IM聊天应用等,而 WebRTC 相较于 WebSocket 的特点在于：
- WebRTC 是为高质量音视频实时通信设计的；
- WebRTC 提供的浏览器端到端通信远比 WebSocket 提供的服务延迟更低。
3. 实现上的区别,主要是两点：
- WebRTC 使用 UDP 协议，而 WebSocket 使用 TCP 协议；
- WebRTC 可以同时提供高质量且低延迟的推流。
4. WebRTC 其实也使用了 WebSocket
WebRTC 其实也使用了 WebSocket，不过是用于搭建 WebRTC的信令机制，但是在连接建立结束后，由于 WebRTC 是端到端连接，因此也不再需要额外服务器。


## python 虚拟环境
python 虚拟环境:
类似于js的node_modules，可以建立一个非全局的依赖环境，单独给一个或者多个项目使用
```bash
python -m venv myVenv
source myVenv/bin/activate
```

## js中的类，函数，方法的区别
| | 类 | 函数 | 方法 |
| --- | --- | --- | --- |
| 定义方式 | 通过class构造<br>`class Fn(){}` | 通过function构造<br>`function fn(){}` | 在对象内定义<br>`{fn(){}}` |
| 调用方式 | 只能通过new调用 | 可以直接调用，也可以通过new调用 | 不能使用new调用 |

函数可以通过函数名直接调用，方法需要通过对象得到上下文调用

- 对象：一个对象就是若干属性的集合。
- 函数：一个函数就是一个可调用的对象。
- 方法：挂在对象属性上的函数就叫方法。

[参考文档](https://www.zhihu.com/question/327545153)

## 编程概念 --- 类，对象，方法，函数，接口

1. 类
类是一个抽象的数据结构，一般包含了变量（成员变量，静态变量）和方法（成员方法，静态方法），可以理解为类是一个模版，可以创建结构相似的实例对象（一般通过 new）。通常会说，存在一个类，创建这个类的实例（对象）
2. 对象
对象是一个实际存在的数据集合（和类对应），包含了属性和方法，一般情况下，类实例化可以得到对象
3. 方法
方法是类（对象）的一部分，描述对象的行为，和函数类似，但是依托于对象存在。通常会说，对象的xxx方法
4. 函数
函数是一段独立的、可重用的代码块，函数通常用于完成某个特定的任务，与类和对象没有直接的关联。已定义或者导入的函数只需要函数名即可使用，一般情况下   xxx() 这样使用的都是函数
5. 接口
接口是一种特殊的抽象类型，它只包含方法签名，不包含方法的实现，相当于告诉你类里有这样一个方法，具体是什么没有给出。接口不能直接使用，需要有具体的实现（一般通过类来实现接口），才能作为方法使用

## 匿名函数在不同语言下的实现：
- js：普通匿名函数
- java：匿名内部类
- object-c：块（block）
- swift：闭包
- c++：lambda表达式
- c#：lambda表达式、匿名方法


## 使用 powershell 创建简单的 Windows 窗体

在 windows 操作系统中使用 powershell 即可创建简单的 Windows 窗体，具体可参考[此处](https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.forms.form?view=windowsdesktop-8.0)

```bash
Add-Type -AssemblyName System.Windows.Forms
$form = New-Object System.Windows.Forms.Form
$form.Text = "程序"
$form.Size = New-Object System.Drawing.Size(500, 300)
# 显示窗口
$form.ShowDialog()
$form.ShowDialog()

```

:::tip 原理
powershell 使用的是 .net 语言，是一个标准的编程语言提供了很多操作系统相关的 API。这里用的就是 `System.Windows.Forms` 对象创建的窗口。
:::

## Linux 设置 ssh 密码连接

启用 SSH 密码认证，需要对服务器端的 SSH 配置文件进行修改。

```bash
sudo vim /etc/ssh/sshd_config
```

在配置文件里，找到以下两行内容，并进行相应修改：

```bash
PasswordAuthentication yes
PermitRootLogin yes      # 若需要以 root 账号通过密码登录，则启用此项
```

之后就可以在本地使用 ssh 密码连接

```bash
ssh root@127.0.0.1
```

输入 root 账户的密码即可连接

:::tip 设置账户密码

输入 `passwd` 设置密码，如果有旧密码则需要输入旧密码进行验证

:::