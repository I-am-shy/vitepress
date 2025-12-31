# 长轮询 和 SSE

---

SSE（Server-Sent Events） 和长轮询（long polling）都是用于实现服务器向客户端主动推送数据的技术，解决了传统 HTTP “请求 - 响应” 模式中客户端需频繁轮询的低效问题。它们的核心都是实现服务端向客户端持续发送数据。


## 长轮询

客户端向服务器发起一个长时间保持的 HTTP 请求，服务器不立即返回响应（即使没有数据），而是 “挂起” 请求等待直到有新数据产生或请求超时，才返回响应。客户端收到响应后，立即发起下一个长轮询请求，形成 “请求 - 等待 - 响应并发起下一次请求” 的循环。

**特点：** 多请求多响应。即客户端需要多次发起请求，服务端多次响应。本质上还是“客户端主动请求 - 服务器被动响应”。

```
客户端 --> 服务端 --> 客户端 --> (循环直到客户端停止请求)...
```
## SSE(Server-Sent Events)

基于 HTTP 的单向通信协议(专属的请求头 `Content-Type: text/event-stream`)，客户端与服务器建立一次持久化的 HTTP 连接后，服务器可通过该连接持续向客户端推送数据（无需客户端重复发起请求），且数据仅从服务器流向客户端（单向）。

**特点：** 单请求多响应。即在一个连接中，服务端单向向客户端持续发送数据。


```
客户端 --（建立连接）--> 服务端 --（持续发送数据，直到断开连接）--> 客户端
```

## 使用场景

1. 适合用长轮询的场景
    - 需要双向通信：如客户端需向服务器发送指令，同时接收服务器的响应（如 “客户端发起任务，服务器推送任务进度”）；
    - 需支持旧浏览器：如需兼容 IE 等不支持 SSE 的浏览器；
    - 需传输二进制数据：如推送图片、文件片段等（无需编码，直接传输二进制流）；
    - 简单场景，不想处理 SSE 的格式规范：如小型项目，自定义 JSON 响应更灵活。

2. 适合用 SSE 的场景
    - 单向推送需求：如 AI 聊天、股票行情推送、日志实时打印（仅需服务器推数据，客户端无需反馈）；
    - 追求低开销：避免长轮询的 “重连开销”，一次连接减少网络损耗；
    - 希望简化开发：依赖EventSource的自动重连、状态监听，减少客户端手动逻辑（如无需写重连定时器）；
    - 仅传输文本数据：如 JSON 格式的消息、文本日志等（无需二进制）。

## 示例代码
以下示例代码使用 [express](../../lib/express/index.md) 实现。

### 长轮询示例

```js
const express = require('express');
const router = express.Router();

// 存放请求的数组
let requestList = [];

// 模拟一个耗时任务
function task(num){
  // 每 3 秒计算一次
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(num + Math.floor(Math.random()*10));
    },3000);
  })
}

// 对于一个请求来说，不使用 end 就不会主动断开连接
// 建立长轮询接口（不主动断开链接，不使用res.send响应）
router.get('/', (req, res) => {
  // 每次请求将请求存入数组，并重置30s等待
  const timeout = 30000;// 30s超时

  if(requestList.length >= 10){
    res.json({
      code: 0,
      message: '请求频繁，请稍后再试',
    })
    return;
  }
  requestList.push(res);

  const timer = setTimeout(() => {
    // 30s超时后（30s没有响应本次请求），将本次请求从数组中移除并响应超时消息
    requestList = requestList.filter(item => item !== res);

    res.json({
      code: 0,
      message: '连接超时，没有响应新数据',
    })
  }, timeout);

  // 监听客户端主动断开链接
  res.on("close",()=>{
    clearTimeout(timer);
    // 移除本次请求
    requestList = requestList.filter(item => item !== res);
  })

});

// 处理轮询的请求,真正处理请求的接口。此处触发了数据更新
router.post("/update",(req,res)=>{
  // 遍历数组，响应所有请求（也可以根据具体需求，指定响应某个请求），广播或者单播
  requestList.forEach(async item => {
    const result = await task(1);

    item.json({
      code: 1,
      message: '连接成功，数据已更新',
      data: result,
    })
  })

  res.json({
    code: 1,
    message: '数据更新',
  })
})

module.exports = router;
```

### SSE 示例

```js
const express = require('express');

const router = express.Router();

// 存放客户端的数组
let clients = [];

// 模拟一个连续的耗时任务
function task(num){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(num >= 10){
        resolve("done");
        return;
      }
      num += Math.floor(Math.random()*10);
      resolve(num);
    },1000);
  })
}

// SSE端点
router.get('/', (req, res) => {
  // 设置响应头
  res.setHeader('Content-Type', 'text/event-stream');// 设置 sse 响应头
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive'); // 保持连接
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // 生成唯一客户端ID
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res: res
  };
  
  // 添加到客户端列表
  clients.push(newClient);
  console.log(`客户端 ${clientId} 已连接，当前连接数: ${clients.length}`);
  
  // 发送连接成功事件
  res.write(`event: connected\n`);
  res.write(`data: ${JSON.stringify({ message: '连接成功', clientId: clientId })}\n\n`);
  
  setInterval(async()=>{
    const result = await task(0);
    if(result === "done"){ // 如果任务完成，则结束连接
      res.end();
    }
    res.write(`data: ${JSON.stringify({clientId: clientId, result: result })}\n\n`);
  },1500)

  // 客户端断开连接时清理
  req.on('close', () => {
    console.log(`客户端 ${clientId} 已断开连接`);
    clients = clients.filter(client => client.id !== clientId);
  });
});


module.exports = router;
```

### 客户端请求示例

:::details index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Express</title>
  <link rel="stylesheet" href="style/style.css">
</head>
<body>
  <h1>Express</h1>
  <p>Welcome to Express</p>
  <button id="btn">开始获取sse数据</button>
  <div id="result"></div>
  <script src="./script/index.js"></script>
</body>
</html>

```
:::

```js
const computeButton = document.getElementById('btn');
const result = document.getElementById('result');

// 长轮询检测是否有数据更新
function longPolling() {
  fetch('/long-polling', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('请求失败');
    })
    .then(data => {
      console.log(data);
      longPolling();
    })
    .catch(err => {
      // 请求失败
      console.log(err.message);
      setTimeout(() => {
        longPolling();
      }, 3000);
    })
}

// 获取流式数据
async function sse() {
  const res = await fetch('/sse', {
    method: 'GET',
    headers: {
      'Content-Type': 'text/event-stream',
    },
  })
  if (!res.ok) {
    console.log('请求失败');
    return;
  }

  const decode = new TextDecoder('utf-8');
  const reader = res.body.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const data = decode.decode(value,{stream: true});
    result.innerHTML +=`<p>${data}</p>`;
  }
}

longPolling();

setInterval(() => {
  // 5 秒更新一次数据
  fetch('/long-polling/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('请求失败');
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err.message);
    })
}, 5000);

computeButton.addEventListener('click', () => {
  sse();
});
```