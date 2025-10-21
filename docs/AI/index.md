# AI 相关概念

## LLM --- 大语言模型

LLM（Large Language Model）是一种基于深度学习的语言模型，它能够理解自然语言，并生成自然语言。它的基本原理为通过庞大的矩阵运算关联文本。


## Chat GPT --- 聊天机器人

Chat GPT 是 LLM 的一种应用，它接收并理解用户输入的文本，并输出生成的文本。类似的还有 Claude、DeepSeek、Gemini 、Qwen 等。


## Function Calling --- 函数调用

Function Calling （函数调用，工具调用）是大模型扩展出来的一种能力，它能够调用外部工具来，使大模型能够将文本转换为行为（action）。它的原理为：大模型提供工具的输入并得到工具的输出，工具执行即为大模型的行为（action）。

## MCP --- 模型上下文协议

MCP（Model Context Protocol）是一种通用协议，它定义了模型与工具之间的交互方式。即规范的 Function Calling ，借助 MCP 协议，可以实现工具的泛用性适配任意的 LLM 。

## Agent --- 智能体

Agent 是基于 LLM 、具备 Function Calling 能力、遵守 MCP 协议的 AI 智能体，它能理解用户的自然语言，并根据用户的需求选择调用相应的工具，完成用户的任务（文本，行为）。Agent 能够不断循环输入、思考、行动、输出，直到完成用户任务。