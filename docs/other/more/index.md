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




