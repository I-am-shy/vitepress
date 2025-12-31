# MCP 工具

[MCP（Model Context Protocol）](https://modelcontextprotocol.io/docs/getting-started/intro) 是一种通用协议，它定义了模型与工具之间的交互方式。即规范的 Function Calling ，借助 MCP 协议可以实现工具的泛用性适配任意的 LLM 。基于这种规范，我们实现的工具可以被任意的 LLM 所使用。

## MCP 核心概念

MCP 协议依靠两端协同工作来实现：

###  MCP Server 

MCP Server 是工具的提供者，它负责提供工具的实现，并将其暴露给 MCP Client 。

主要包括 2 个部分：

1. 工具的实现和描述。
2. 和 MCP Client 通信。

### MCP Client 

MCP Client 是工具的消费者，它负责调用 LLM 和使用工具，并将其结果返回给 MCP Server 。

主要包括 3 个部分：

1. LLM 的调用。
2. 工具的调用。
3. 和 MCP Server 通信。

## 实现一个 MCP 工具

使用 MCP typescript SDK 实现一个简单的加法工具服务，支持通过 MCP 客户端（如 Cursor）调用。


index.ts

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"; // 用于输入参数校验

// 1. 定义加法函数（你的原始函数）
function add(a: number, b: number) {
  return a + b;
}

// 2. 初始化 MCP 服务器
const server = new McpServer({
  name: "mcp-server", // 服务器名称
  version: "1.0.0" // 版本号
});

// 3. 将 add 函数注册为 MCP 工具
server.registerTool(
  "add", // 工具唯一名称（客户端将通过此名称调用）
  {
    // 工具元数据（供 LLM 或客户端理解工具用途）
    title: "加法计算器",
    description: "计算两个数字的和，返回结果",
    // 输入参数校验规则（使用 zod 定义，确保输入为合法数字）
    inputSchema: {
      a: z.number().describe("第一个加数"),
      b: z.number().describe("第二个加数")
    }
  },
  // 工具执行逻辑（调用 add 函数，并格式化返回结果）
  async (args) => {
    const result = add(args.a, args.b); // 调用原始 add 函数
    // 返回 MCP 规范要求的格式（text 类型的内容）
    return {
      content: [{
        type: "text",
        text: `计算结果：${args.a} + ${args.b} = ${result}`
      }]
    };
  }
);

// 4. 启动服务器（使用 stdio 传输，通过标准输入输出与客户端通信）
const transport = new StdioServerTransport();
server.connect(transport).then(() => {
  console.log("mcp 工具服务已启动，可接收 MCP 客户端调用");
});

// 注意：使用 index.ts 以外的入口文件时，需要在 package.json 中的 "main" 字段，指向该文件
```

:::details mcp.json 配置示例：

```json
{
  "mcpServers": {
    "mcp-server": {
      "command": "ts-node", 
      "args": [
        "/xxx/xxx/index.ts" // 工具服务入口文件的绝对路径
      ]
    }
  }
}
```
:::



完成上述配置后，就可以通过 MCP 客户端（如 Cursor）调用 add 工具了。如此 add 函数就可以被任意的 LLM 所使用。

## 实践案例

在实际运用中，一个 MCP Server 通常会包含多个工具，我们可以将工具函数与 MCP 的注册和通讯分离开。

```bash
├── main.ts // 工具服务入口文件
├── tools.ts // 工具函数文件
```

:::warning 注意
在 package.json 文件中，如果入口文件不是 index.ts ，则需要在 main 字段指定工具服务入口文件。
:::

:::details tools.ts

```ts
import { z } from "zod";

// 自定义工具


function getWeather(city: string) {
  return `${city}的天气是：晴天`;
}

function getAddress(){
  return `当前的地址是：北京市海淀区`;
}

const tools = [
  {
    name: "getWeather",
    config:{
      title: "获取天气",
      description: "获取某个城市的天气",
      inputSchema: {
        city: z.string().describe("城市名称"),
      }
    },
    func: async(args:{city:string})=>{
      const weather = getWeather(args.city);
      return {
        content: [{
          type: "text" as const,
          text: weather
        }]
      };
    } 
  },
  {
    name: "getAddress",
    config:{
      title: "获取地址",
      description: "获取当前的地址",
    },
    func: async()=>{
      const address = getAddress();
      return {
        content: [{
          type: "text" as const,
          text: address
        }]
      };
    }
  }
];

export default tools;
```
:::
:::details main.ts

```ts
import { McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import tools from "./tool";

const server = new McpServer({
  name: "mcp-server",
  version: "1.0.0"
});

// 注册自定义工具服务到 MCP 服务器
tools.forEach(tool => {
  server.registerTool(tool.name, tool.config, tool.func);
});

// 启动 MCP 服务器并连接到客户端
const transport = new StdioServerTransport();
server.connect(transport).then(() => {
  console.log("mcp 工具服务已启动，可接收 MCP 客户端调用");
});
```
:::

以上分离开了 tool 和 MCP 的注册和通讯，当新增工具时，只需要在 tools.ts 中新增工具函数而不必关注 MCP 的注册和通讯。