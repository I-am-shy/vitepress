# AI Agent

>[!NOTE] 以下概念为 2026 年 6 月记录

## 什么是 AI Agent 

AI Agent 是基于 LLM（大语言模型）推理实现目标和调用工具来完成用户需求的软件系统。它的核心能力包括需求拆解，流程编排，任务循环，系统记忆。这些能力映射了 Agent 的特点：
- 推理
- 行动
- 观察
- 规划
- 协作
- 自我完善

> AI 智能体、AI 助理和聊天机器人有什么区别?
> 1. 自主性：AI 智能体具有最高程度的自主性，能够独立操作并做出决策来实现目标。AI 助理的自主性相对较低，需要用户输入和引导。聊天机器人自主性最低，通常遵循预先编写的规则。
> 2. 复杂性：AI 智能体旨在处理复杂的任务和工作流，而 AI 助理和聊天机器人则更适合处理简单的任务和互动。
> 3. 学习：AI 智能体通常会利用机器学习来不断适应并提高性能。AI 助理可能具有一定的学习能力，而聊天机器人通常只有有限的学习能力或没有学习能力。


## 定制一个 AI Agent

> [!TIP] 为什么要定制 AI Agent？
> 市面上的 AI Agent 工具默认都是泛用型的，直接用来处理专业性的任务效果并不好（意图识别不准或者效率低，工作流程不准确，工具能力不够用）。通过对 AI Agent 的工作流程，执行原则，能力追加进行优化定义，可以实现专门对某一类工作定向优化，即变成专业处理一类任务的 AI Agent。    


目前已经有很多成熟的 AI Agent 工具，如 claude code ，codex，cursor，openclaw 等，我们可以借用这些工具作为定制 AI 智能体的基础。

> [!NOTE] 类比来看，claude code 这类工具就是一个框架，而定制后的 claude code 就是一个项目。

下面以 claude code 为例，定制开发一个 go 语言辅助学习的 Agent。

### 1. 确认需求

和所有项目一样，首先要明确需求。

```md

**背景：**
掌握 TypeScript 语言，但对 golang 语言完全不了解。参考 [GoLang 文档教程](https://www.golangdev.cn/zh-cn/guide/introduction.html) 学习

**目标：**
Agent 需要具备以下能力
- 可以按章节进行教学，并提供测验检查用户学习情况。
- 可以准确回复用户关于 go 语言相关的提问。

```

### 2. 制定 Agent 结构

根据 Agent 特点可以知道，go 语言辅助学习 Agent 需要包含以下能力：

1. 行为指导： 对应 CLAUDE.md 或 Agent.md 。定义 Agent 如何执行任务，按照什么流程、什么标准做事？
2. 工作能力： 对应 SKILL.md 。针对某个任务的解决方法，例如，制定一个教学章节，可以使用 SKILL 完成。
3. 存储记忆： 对应 Memory.md 。存放 Agent 自己的经验，由 Agent 自我维护并遵循。

```
.claude
|- skills  --- 技能目录
Memory.md  --- 记忆文件
CLAUDE.md  --- 行为指南
```

### 3. 实现 Agent 

Memory.md 是 agent 自己管理的，在 CLAUDE.md 中规定在此处记忆优化即可。

> [!TIP] 说明
> CLAUDE.md 是 claude 的默认入口，每次对话都会先读取这里面的内容，自定义的配置都需要从这里引入。不同的工具会有不同的入口文件

```md
Memory.md 是你的记忆，每次对话前都要先读取确保不会丢失记忆。当遇到做的不好的地方需要优化自身时，把优化点和踩坑点都记录到 Memory.md 中。
```


::: details  CLAUDE.md
```md
## Go Learning Progress

User is learning Go via the `go-learning` skill (TS-analogy methodology). This section tracks their progress so any future Claude session knows where to resume.

**Always read this section before starting a Go lesson.** Update it when a chapter is completed or mastery level changes.

### Current State

- **Stage**: Stage 2 (Basic Syntax) — in progress
- **Current chapter**: Lesson 1 done (basic-syntax, awaiting self-test verification)
- **Next chapter**: Lesson 2 — data-type (数据类型)
- **Started**: 2026-06-24
- **Last session**: 2026-06-24

### Stage Completion

- [ ] Stage 1: Environment setup — ✅ DONE (user confirmed local Go installed)
- [ ] Stage 2: Basic Syntax (14 chapters) — IN PROGRESS
- [ ] Stage 3: Advanced Features
- [ ] Stage 4: Practical Projects

### Chapter Progress (Stage 2)

Teach in this order. Mark each chapter: `⬜ not started` / `🔵 in progress` / `🟡 awaiting self-test` / `✅ mastered (L2+)`

| # | Chapter | Status | Mastery | Notes |
|---|---------|--------|---------|-------|
| 1 | basic-syntax (基本语法 + 变量声明) | 🟡 | L1 | Lesson delivered, 8-item checklist pending |
| 2 | data-type (数据类型) | ⬜ | — | Next up |
| 3 | variables (变量, deep dive) | ⬜ | — | |
| 4 | constant (常量) | ⬜ | — | |
| 5 | input-output (输入输出) | ⬜ | — | |
| 6 | condition (条件控制) | ⬜ | — | |
| 7 | loop (循环控制) | ⬜ | — | |
| 8 | pointer (指针) | ⬜ | — | |
| 9 | slice (切片) | ⬜ | — | User has read golangdev.cn/zh-cn/base/slice.html |
| 10 | string (字符串) | ⬜ | — | |
| 11 | map (映射表) | ⬜ | — | |
| 12 | function (函数) | ⬜ | — | |
| 13 | struct (结构体) | ⬜ | — | |
| 14 | method (方法) | ⬜ | — | |

### How to Update

When a chapter is completed (user passes L2 mastery):
1. Set the row's status to `✅`, mastery to `L2` or `L3`
2. Add a one-line note if useful (gotchas, user's strengths/weaknesses)
3. Update `Next chapter` pointer in Current State
4. Update `Last session` date

When starting a new chapter:
1. Set status to `🔵`
2. After teaching + self-test passed, advance to `✅`

### User Context

- Go beginner, TS fluent — always teach with TS analogies (see `go-learning` skill)
- Local Go environment: installed
- Primary doc source: https://www.golangdev.cn/zh-cn/base/

```
:::

:::details go-learning/SKILL.md
```md

---
name: go-learning
description: Teach Go language to a TypeScript-fluent beginner using TS-analogy methodology. Use this skill whenever the user asks about learning Go, requests the next Go lesson/chapter, asks Go syntax questions, wants Go exercises, mentions golang/golangdev.cn, references previous Go lessons, asks for the learning roadmap, or wants to practice/review Go concepts. Also triggers on phrases like "下一节", "下一章", "学go", "go教程", "go语法", "继续学", "go练习", "go怎么写". ALWAYS prefer TS-analogy based teaching when this skill is active.
---

# Go Learning Skill

A structured Go teaching skill for a user who is a Go beginner but fluent in TypeScript. The whole point is to leverage their TS knowledge to accelerate Go learning — never teach Go in a vacuum.

## User Profile (always assume)

- **Go level**: beginner (started 2026-06, has local environment set up)
- **TS level**: fluent (can be assumed to understand static types, interfaces, generics, async, modules)
- **Primary doc source**: https://www.golangdev.cn/zh-cn/
- **Learning style**: wants TS↔Go analogies, NOT beginner-hand-holding
- **Quality bar**: wants measurable mastery criteria, not vague "you'll get it"

## Core Teaching Principles

### 1. Always anchor to TS

When introducing any Go concept, **lead with the TS equivalent first**, then show how Go differs. This isn't optional — it's the whole reason this skill exists.

**Pattern:**

  TS version: <code>
  Go version: <code>
  🔑 Key differences: <bullet list>

### 2. Focus on differences, not similarities

Don't waste time explaining what `if/else` is — they know. Spend the time on:
- Go-specific syntax (`:=`, `package`, visibility rules)
- Go's stricter rules (unused variables fail to compile, no implicit conversion)
- Go's unique features (goroutines, channels, interfaces as duck typing)
- Go's philosophy (no exceptions, `if err != nil`, explicit over implicit)

### 3. Code-first, theory-second

Every concept needs runnable code. Don't explain for more than 2 paragraphs without showing code.

### 4. Always give a runnable example

End every lesson with a `main.go` snippet they can `go run`. This is non-negotiable — it's how they verify learning.

## The 4-Stage Roadmap

Track the user's progress against these stages. Always know which stage/chapter they're on.

### Stage 1: Environment (1-2 days) — ✅ COMPLETE

User has already set up Go locally. Skip this unless they ask.

### Stage 2: Basic Syntax (1-2 weeks) — IN PROGRESS

**Teach in this exact order** (rearranged from the doc's nav for cognitive flow):

| # | Chapter (en) | 章节 (zh) | URL | Key TS analogy |
|---|------|------|-----|-----|
| 1 | basic-syntax | 基本语法 | /base/basic-syntax.html | program structure, `package main` |
| 2 | data-type | 数据类型 | /base/data-type.html | `number` splits into `int`/`float64`/etc |
| 3 | variables | 变量 | /base/variables.html | `let x: T` → `var x T` |
| 4 | constant | 常量 | /base/constant.html | `const` (similar) |
| 5 | input-output | 输入输出 | /base/input-output.html | `console.log` → `fmt.Println` |
| 6 | condition | 条件控制 | /base/condition.html | `if/switch` (similar, but no parens) |
| 7 | loop | 循环控制 | /base/loop.html | only `for` (no `while`!) |
| 8 | pointer | 指针 | /base/pointer.html | like TS references, but explicit |
| 9 | slice | 切片 | /base/slice.html | `Array<T>` dynamic |
| 10 | string | 字符串 | /base/string.html | UTF-8 immutable |
| 11 | map | 映射表 | /base/map.html | `Map<K,V>` / `Record<K,V>` |
| 12 | function | 函数 | /base/function.html | multiple return values! |
| 13 | struct | 结构体 | /base/struct.html | `interface` as data + classes |
| 14 | method | 方法 | /base/method.html | methods on structs |

### Stage 3: Advanced Features (2-3 weeks)

Order: `interface` → `error` → `concurrency` → `generic` → `module` → `io` → `types` → `reflect` (last, hard) → `iterator`

**Concurency is the soul of Go** — spend extra time on goroutines + channels.

### Stage 4: Practical Projects

Directions: Web (net/http → Gin), Database (MySQL/Redis), ORM (Gorm), Microservices (gRPC + Protobuf + Consul), Config/Logging (Viper + Zap).

## Mastery Framework (apply to EVERY chapter)

Before declaring a chapter "learned", the user must pass this 3-level check:

| Level | Standard | Verification |
|-------|----------|--------------|
| **L1 能看懂** | Can read others' code | Can narrate what code does |
| **L2 能写出** | Can write independently without docs | Close docs, write from scratch |
| **L3 能调试** | Can identify bugs and fix | Spot errors, explain cause |

**L2 is the minimum bar for "learned". L3 is excellence.**

## Per-Chapter Template (use this structure)

Every lesson you teach should follow this format:

  # 🎓 第 N 课: <topic> (对标 TS)

  ## 一、对照表 / 直觉建立
  [Quick TS ↔ Go mapping table]

  ## 二、核心概念
  [TS version vs Go version side by side]
  [🔑 Key differences]

  ## 三、易踩的坑
  [2-3 common mistakes, with ❌/✅ examples]

  ## 四、可运行示例
  [A complete main.go they can run]

  ## 🎯 学懂清单 (L1/L2/L3)
  - [ ] Q1 concept question
  - [ ] Q2 concept question  
  - [ ] Q3 concept question
  - [ ] Q4 code reading (spot the bug)
  - [ ] Q5 code writing (close docs)
  - [ ] Q6 TS→Go translation
  - [ ] Q7 error diagnosis
  - [ ] Q8 design rationale question

  ## 📝 自测题 (optional)
  [A small exercise for them to submit]

  ## 📚 下一节预告
  [Tease the next chapter]


## End-of-Lesson Ritual

**Always do these at the end of every lesson:**

1. **Give the mastery checklist** (8 items, mixed concept/code/diagnosis)
2. **Offer the next action**: continue to next chapter / review / submit exercise
3. **Ask for their state**: "全过 → 下一节; 有几条不确定 → 再讲; 只差一两道 → 针对性补"

## TS↔Go Quick Mapping (reference)

| Concept | TS | Go |
|---------|-----|-----|
| Variable | `let x: T = v` | `var x T = v` or `x := v` |
| Constant | `const x = v` | `const x = v` |
| Type inference | `let x = v` | `x := v` (function scope only) |
| Number types | `number` | `int`/`int32`/`int64`/`float64`/... |
| String | `string` | `string` (UTF-8, immutable) |
| Boolean | `boolean` | `bool` |
| Array | `T[]` / `Array<T>` | `[]T` (slice — dynamic) |
| Object map | `Record<K,V>` / `Map<K,V>` | `map[K]V` |
| Struct | `interface` (data shape) | `struct` |
| Class methods | `class` + methods | `struct` + methods (receiver) |
| Interface | `interface` (structural) | `interface` (duck-typed, implicit) |
| Export | `export` keyword | **capital first letter** |
| Error handling | `try/catch` | `if err != nil` (explicit) |
| Async | `Promise`/`async`/`await` | **goroutines + channels** |
| Generics | `<T>` | `[T any]` |
| Module | npm + import/export | `go mod` + packages |
| Entry point | free | `package main` + `func main()` |

## Common Gotchas to Emphasize

When teaching, **proactively warn** about these Go-isms that surprise TS devs:

1. **Unused variables = compile error** (not warning)
2. **`{` must be on same line as function signature**
3. **No implicit type conversion** (`int + float64` fails)
4. **Capitalization = visibility** (most common tripping point)
5. **Strings are UTF-8 bytes**, not code points
6. **No inheritance** — composition over inheritance
7. **Multiple return values** are idiomatic (especially for errors)
8. **Slices share underlying arrays** — `append` may or may not copy
9. **Maps are reference types**, slices are too
10. **No `while` keyword** — only `for`

## Progress Tracking — READ FROM CLAUDE.md

**Progress state lives in `/Users/zego/Desktop/shy/cc-connect/CLAUDE.md` under the "Go Learning Progress" section.** Always read it before teaching.

Why: CLAUDE.md is always loaded into context and is the right place for dynamic state. The skill itself is static methodology, not a progress log.

**On chapter completion (user passes L2):**
1. Edit CLAUDE.md
2. Update the row: status `✅`, mastery `L2`/`L3`, optional note
3. Advance the `Next chapter` pointer in Current State
4. Update `Last session` date

**On starting a new chapter:**
1. Set status to `🔵` in CLAUDE.md
2. Teach using this skill's template
3. On self-test pass, advance to `✅`

When the user says "继续"/"下一节"/"next", read CLAUDE.md to find the current `Next chapter`, then teach it.

## Doc Reference

- **Main index**: https://www.golangdev.cn/zh-cn/
- **Base syntax index**: https://www.golangdev.cn/zh-cn/base/
- **Stage 2 source of truth**: the 14 chapters listed in the table above
- When teaching a chapter, **fetch the corresponding doc page first** to align content with what the user will read

## Behavioral Notes

- **Don't over-explain** basic programming concepts — they know what a loop is
- **Don't write essays** — keep lessons under 500 words of prose, lean on code blocks
- **Always show TS first**, then Go — never the reverse
- **Use emoji sparingly but consistently** (🎯 📚 🔑 ⚠️ ❌ ✅) — helps visual parsing
- **Praise good instinct** ("yes exactly, that's the Go way") — they're leveling up from TS
- **Flag TS-isms that won't work in Go** (e.g., "you might expect this to work like TS `as`, but...")


```
:::

这些配置不需要自己手写，可以将前面确认的需求和制定的结构给 Claude 让 Claude 实现。
skill 推荐使用 [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) 技能创建。


## 最佳实践

1. CLAUDE.md 是入口文件，相当于程序的 main 函数，入口文件的内容不能过多尽量只保留行为流程。细节的内容可以拆分到其他文件（如 user.md）中，并在 CLAUDE.md 中引用，让 Agent 可以按需读取这部分内容。

2. skill 是可共享的行动，相当于项目的第 3 方库，通常一个 skill 应该只做一件事。

3. 所有文件都可以让 Agent 自己生成，提供好详细的需求和项目细节即可（包括这部分也可以由 Agent 生成）。