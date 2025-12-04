# Socket.IO

## 简介

[Socket.IO](https://socket.io/zh-CN/) 是一个用于实时双向通信的库，它使用了 WebSocket 作为底层通信协议，并提供了丰富的功能和易于使用的 API。

Socket.IO 不等同于 websocket，它内部还提供了降级处理，当浏览器不支持 WebSocket 时，会自动降级为 HTTP 长轮询 /iframe 等（自动兼容）。

## 使用场景

Socket.IO 适用于需要**实时双向通信**的场景，如聊天应用、实时通知、实时数据更新等。

## 核心 API 

| 方法 | 说明 |
| --- | --- |
| socket.emit('event', data) | 发送事件到客户端 |
| socket.on('event', (data) => {}) | 监听客户端事件 |
| socket.join(room) | 加入房间 |
| socket.leave(room) | 离开房间 |

socket.io 的通讯接口用法类似 node event 事件派发和事件监听。通过 on 方法监听事件，通过 emit 方法触发事件并传递数据。

此外 socket.io 还封装好了 **房间** 的概念，通过 join 方法加入房间，通过 leave 方法离开房间。通过房间可以实现跨链接的同房间通讯。

## 使用示例

创建一个简单的 socket.io 应用

1. 安装 socket.io 和相关依赖库
socket.io: 用于创建 socket.io 服务器
redis: 用于持久化房间数据
uuid: 用于生成房间ID
@socket.io/redis-adapter: redis 适配器，自动将 socket.io 的房间数据同步到 redis

```bash
npm install socket.io redis uuid @socket.io/redis-adapter
```

2. 服务端代码

```js
const { Server } = require('socket.io');
const Redis = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const { v4: uuidv4 } = require('uuid');

// 1. 初始化 Socket.IO 服务
const io = new Server(8080, {
  cors: { origin: "*" } // 开发环境允许跨域
});

// 2. （可选）Redis 适配器实现集群（单实例可省略）
const redisClient = Redis.createClient();
redisClient.connect().catch(console.error);
io.adapter(createAdapter(redisClient, redisClient.duplicate()));

// 3. 存储房间-房主映射（Redis 持久化，单实例也可内存存储）
const roomHostMap = new Map(); // key: roomId, value: socket.id

// 4. 核心逻辑
io.on('connection', (socket) => {
  console.log('客户端连接：', socket.id);

  // 房主创建房间
  socket.on('create_room', async () => {
    const roomId = uuidv4();
    roomHostMap.set(roomId, socket.id);
    socket.join(roomId); // 房主加入房间
    socket.emit('room_created', { roomId });
    console.log(`房主 ${socket.id} 创建房间：${roomId}`);
  });

  // 成员加入房间
  socket.on('join_room', async (roomId) => {
    if (!roomHostMap.has(roomId)) {
      socket.emit('error', { msg: '房间不存在或房主已离开' });
      return;
    }
    socket.join(roomId);
    // 状态追赶：获取房主缓存的全量数据，推送给新成员
    const fullData = await redisClient.get(`room:${roomId}:data`);
    if (fullData) {
      socket.emit('full_sync', { data: JSON.parse(fullData) });
    }
    console.log(`成员 ${socket.id} 加入房间：${roomId}`);
  });

  // 房主发送全量数据
  socket.on('host_full_data', async (payload) => {
    const roomId = Array.from(socket.rooms).find(id => id !== socket.id); // 获取房间ID
    if (!roomId || roomHostMap.get(roomId) !== socket.id) {
      socket.emit('error', { msg: '无房主权限' });
      return;
    }
    await redisClient.set(`room:${roomId}:data`, JSON.stringify(payload));
    io.to(roomId).emit('full_sync', { data: payload }); // 广播给房间所有成员（含自己）
  });

  // 房主发送增量数据
  socket.on('host_incremental_data', (delta) => {
    const roomId = Array.from(socket.rooms).find(id => id !== socket.id);
    if (!roomId || roomHostMap.get(roomId) !== socket.id) {
      socket.emit('error', { msg: '无房主权限' });
      return;
    }
    io.to(roomId).emit('incremental_sync', { delta }); // 广播增量数据
  });

  // 房主断线：解散房间
  socket.on('disconnect', () => {
    // 查找该socket是哪个房间的房主
    for (const [roomId, hostId] of roomHostMap.entries()) {
      if (hostId === socket.id) {
        io.to(roomId).emit('room_closed', { msg: '房主已离开，房间解散' });
        roomHostMap.delete(roomId);
        redisClient.del(`room:${roomId}:data`);
        console.log(`房主 ${socket.id} 断线，房间 ${roomId} 解散`);
        break;
      }
    }
    console.log('客户端断开：', socket.id);
  });
});

console.log('Socket.IO 服务启动，端口 8080');
```

3. 客户端代码

> 安装 socket.io-client 用于连接 socket.io 服务器
> 
> ```bash
> npm install socket.io-client
> ```


**房主：**
```js
const io = require('socket.io-client');
const socket = io('http://localhost:8080');

let roomId = null;
let localData = { content: '初始内容', cursor: { x: 0, y: 0 } };

// 连接成功创建房间
socket.on('connect', () => {
  socket.emit('create_room');
});

// 房间创建成功，发送全量数据
socket.on('room_created', (data) => {
  roomId = data.roomId;
  console.log('房间创建成功：', roomId);
  socket.emit('host_full_data', localData);
  console.log("输入任意字符，更新数据");
});

// 模拟增量更新
process.stdin.on("data",(data)=>{
  // console.log(data.toString().trim());
  if (!roomId) return;
  localData.content += `\n新增：${data.toString().trim()}`;
  socket.emit('host_incremental_data', { content: localData.content });
})
```

**成员：**

```js
const io = require('socket.io-client');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('输入房间ID：', (roomId) => {
  const socket = io('http://localhost:8080');
  let syncData = null;

  socket.on('connect', () => {
    socket.emit('join_room', roomId);
  });

  // 全量同步
  socket.on('full_sync', (data) => {
    syncData = data.data;
    console.log('全量数据：', syncData);
  });

  // 增量同步
  socket.on('incremental_sync', (data) => {
    syncData = { ...syncData, ...data.delta };
    console.log('增量更新：', syncData);
  });

  // 房间解散
  socket.on('room_closed', (msg) => {
    console.log(msg);
    socket.disconnect();
  });

  rl.close();
});
```