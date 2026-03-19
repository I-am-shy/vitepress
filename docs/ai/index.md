# AI 相关概念

## LLM --- 大语言模型

LLM（Large Language Model）是一种基于深度学习的语言模型，它能够理解自然语言，并生成自然语言。它的基本原理为通过庞大的矩阵运算关联文本。


## Chat GPT --- 聊天机器人

Chat GPT 是 LLM 的一种应用，它接收并理解用户输入的文本，并输出生成的文本。类似的还有 Claude、DeepSeek、Gemini 、Qwen 等。


## Function Calling --- 函数调用

Function Calling （函数调用，工具调用）是大模型扩展出来的一种能力，它能够调用外部工具来，使大模型能够将文本转换为行为（action）。它的原理为：大模型提供工具的输入并得到工具的输出，工具执行即为大模型的行为（action）。

## MCP --- 模型上下文协议

[MCP](https://modelcontextprotocol.io/docs/getting-started/intro)（Model Context Protocol）是一种通用协议，它定义了模型与工具之间的交互方式。即规范的 Function Calling ，借助 MCP 协议，可以实现工具的泛用性适配任意的 LLM 。

## Agent --- 智能体

Agent 是基于 LLM 、具备 Function Calling 能力、遵守 MCP 协议的 AI 智能体，它能理解用户的自然语言，并根据用户的需求选择调用相应的工具，完成用户的任务（文本，行为）。Agent 能够不断循环输入、思考、行动、输出，直到完成用户任务。

## Sub-Agent --- 子智能体

Sub-Agent 是 Agent 的子集，当 Agent 需要处理特定类型任务时，可以将任务拆分为一个或多个并交给相关的 Sub-Agent 来处理。Sub-Agents 是处理特定类型任务的专门 AI 助手。每个 Sub-Agent 在自己的 context window 中运行，具有自定义系统提示、特定的工具访问权限和独立的权限。

## Skills --- 技能

Skills 是一种轻量级的开放格式，用于扩展 AI Agent 的功能。在任务处理中 Skills 指定了处理流程，以及额外的工具的调用（若有）。在处理某一类任务时，可以复用 Skills 标准化的完成任务。Skills 是渐进式的，只有需要使用到 Skills 时才会进入到模型的上下文中。

