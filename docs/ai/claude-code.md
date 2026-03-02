# Claude Code

## 简介

[Claude Code](https://code.claude.com/docs/zh-CN/overview) 是由 Anthropic 公司开发 的 AI 编码工具，支持在 Terminal 和 IDE 中使用。

## 安装

### 安装命令行工具

:::code-group
```bash [macOS、linux]
curl -fsSL https://claude.ai/install.sh | bash
```
```bash [Windows]
irm https://claude.ai/install.ps1 | iex
```
```bash [npm]
npm install -g @anthropic-ai/claude-code
```
```bash [Homebrew]
brew install --cask claude-code
```
:::

安装完成后首次使用需要登录 claude 账户。

```bash
claude
# 首次使用时系统会提示您登录

/login
```

### 安装 IDE 插件

以 VSCode 为例，安装 [Claude Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) 插件，登录后即可使用。


## 使用兼容 Anthropic API 的 AI 模型

>[!TIP] 说明
> 目前 Claude AI 在中国大陆不能直接使用，需要替换为其他兼容 Anthropic API 的 AI 模型。

以下是部分国内 AI 大模型厂商兼容 Anthropic API 的相关文档：
- [智谱清言](https://docs.bigmodel.cn/cn/coding-plan/tool/claude)
- [DeepSeek](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api)
- [MiniMax](https://platform.minimaxi.com/docs/coding-plan/claude-code)
- [通义千问](https://bailian.console.aliyun.com/cn-beijing/?spm=a2c4g.11186623.0.0.1a5e4c4dZB6OlB&tab=doc#/doc/?type=model&url=3023078)

需要获取模型的几个关键配置项：

1. 兼容 Anthropic API 的 Base URL
2. 调用大模型的 API Key
3. 模型名称

以通义千问为例，进行配置：

1. 获取模型配置项：
    1. 兼容 Anthropic API 的 Base URL：`https://coding.dashscope.aliyuncs.com/apps/anthropic`
    2. 调用大模型的 API Key：sk-xxx
    3. 模型名称：qwen3.5-plus

2. 编辑或创建 Claude Code 的配置文件 `settings.json` 和 `.claude.json`

    > [!Warning] 不同系统的配置文件路径不同
    > MacOS & Linux 为 `~/.claude/settings.json` 和 `~/.claude/.claude.json`
    > Windows 为`用户目录\.claude\settings.json` 和 `用户目录\.claude\.claude.json`

    :::code-group
    ```json [settings.json]
    {
        "env": {
        "ANTHROPIC_AUTH_TOKEN": "sk-xxx",
        "ANTHROPIC_BASE_URL": "https://coding.dashscope.aliyuncs.com/apps/anthropic",
        "API_TIMEOUT_MS": "3000000",
        "ANTHROPIC_MODEL": "qwen3.5-plus"
      }
    }
    ```

    ```json [.claude.json]
    {
      "hasCompletedOnboarding": true
    }
    ```
    :::
  
3. 启动 Claude Code 命令行工具或 IDE 插件，即可正常使用对话功能

## 进阶使用

claude code 支持多种特色功能高效处理任务。

### 注册 MCP 工具

注册 MCP 工具，可以扩展 Claude Code 的功能，使其能够调用外部工具。

```bash
# 基本语法
claude mcp add-json <name> <xxx.json>
# name: mcp 名称
# xxx.json: mcp 配置文件路径
```


或在项目根目录下编辑 `mcp.json` 文件，**内容格式**如下：
```json
{
  "mcpServers": {
    "my-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop",
        "/Users/username/Downloads"
      ]
    }
  }
}
```

### 注册 Plugin 插件

持续更新中...

### 使用 Skills 技能

持续更新中...


## 参考

- [Claude Code 官方文档](https://code.claude.com/docs/zh-CN/overview)
