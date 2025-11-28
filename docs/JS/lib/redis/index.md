# Redis

--- 

[Redis](https://redis.io/) 是一个高性能的键值对数据库，通常用作缓存、消息队列和数据存储。它支持多种数据结构，如字符串、哈希表、列表、集合和有序集合。Redis 和其他数据库（如 MySQL、PostgreSQL 等）的主要区别在于 Redis 是内存数据库，数据存储在内存中，读写速度非常快。

一般的数据库（如 MySQL）都是将数据存储在磁盘上，使用时需要从磁盘读取数据到内存中传递使用。而 Redis 直接存放在内存中省去了磁盘操作。由于 Redis 是存放在内存中，当服务断开时数据会清空，因此主要存放需要高效使用的临时数据。也因此常和其他数据库配合使用，将需要持久化的数据存储到其他数据库中，服务重启时从其他数据库中读取数据。

## 安装

:::warning 说明
本地安装可以参考 [Redis 官网](https://redis.io/software/) 。
:::

使用 docker 安装 Redis 和启动服务。

```bash
docker run -p 6379:6379 -d redis:8.0-rc1
```

## node-redis

[node-redis](https://github.com/redis/node-redis) 是 Redis 的 Node.js 客户端，封装了 Redis 的功能提供了 javascript 友好的 API，可以方便的进行 Redis 的操作。

```bash
npm install redis
```

## 使用示例

```js
import { createClient } from "redis";

// npm redis 参考 (https://redis.nodejs.cn/docs/)
const client = await createClient() // 默认 localhost:6379
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

// Redis 命令
// 内置支持所有 开箱即用的 Redis (https://redis.io/docs/latest/commands/) 命令。它们使用原始的 Redis 命令名称（HSET、HGETALL 等）以及更友好的驼峰式版本（hSet、hGetAll 等）来暴露：

// 友好的 JavaScript 命令

// 读写值
const cmd_1 = async() => {
  await client.set("key", "value");
  const value = await client.get("key");
  console.log(value);
  return value;
}

// 哈希读写操作
const cmd_2 = async() => {
  await client.hSet("hKey", "field", "value");
  const value = await client.hGetAll("hKey");
  const vals = await client.hVals("hKey");
  console.log(value);
  console.log(vals);
  return { value, vals };
}

// 多任务操作
const cmd_3 = async()=>{
  const res = await client.multi()
    .set("anotherKey", "anotherValue")
    .get("anotherKey")
    .exec();
  console.log(res);// 返回一个数组，按顺序存放每个命令的执行结果
  return res;
};

for (const cmd of commands) {
  const result = await cmd();
}

// 销毁连接，立即拒绝所有命令。
client.destroy();

```

:::warning 注意
redis 默认的服务端口为 6379 ，createClient 默认连接 localhost:6379 。如果需要修改端口，可以在 docker 命令启动服务时指定其他端口，并在 createClient 时指定 URL 。
:::

