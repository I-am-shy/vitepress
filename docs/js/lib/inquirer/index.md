# inquirer

## 简介

[inquirer](https://github.com/SBoudrias/Inquirer.js) 是一个用于命令行交互的库，它提供了简洁明了的交互方式。inquirer 常用于命令行的交互式输入和选择，它就像表单一样，可以让用户在命令行中交互式地输入和选择。

## 安装

```bash [npm]
npm install @inquirer/prompts
```
```bash [pnpm]
pnpm add @inquirer/prompts
```
```bash [bun]
bun add @inquirer/prompts
```

> [!TIP] 说明
>  `@inquirer/prompts` 是 inquirer 的重置后的包，它包含了 inquirer 的所有功能，并且语法更加简洁包体积更小。


## 使用

inquirer 有以下几种交互方式：

- checkbox: 多选框
- confirm: 确认框
- editor: 文本编辑器
- expand: 展开列表
- input: 单行文本输入框
- number: 数字输入框
- password: 密码输入框
- rawlist: 原始列表
- search: 搜索输入框
- select: 单选框

### checkbox 多选框

checkbox 多选框，可以让用户在命令行中选择多个选项。

- message: 提示信息，必填，`string`。
- choices: 选项列表，必填，`string[] | Choice<Value>[]`。使用对象时，name 为显示的选项，value 为选项的值，checked 为是否选中，checkedName 为选中后的显示名称。
    :::details Choice 类型定义
    ```ts
    type Choice<Value> = {
        value: Value; // 选项的值
        name?: string; // 选项的显示名称
        checkedName?: string; // 选中后的显示名称
        description?: string; // 选项的描述
        short?: string; // 选项的短名称
        disabled?: boolean | string; // 是否禁用，禁用后无法选择
        checked?: boolean; // 是否默认选中
        type?: never; // 选项的类型
    }
    ```
    :::

```ts checkbox 示例
import { checkbox } from '@inquirer/prompts';

const system = await checkbox({
  message:"请选择你喜欢的系统",
  choices:["windows","macos","linux"]
})

const color = await checkbox({
  message:"请选择你喜欢的颜色",
  choices:[
    {
      name:"红色",
      value:"red",
      checked:true
    },
    {
      name:"绿色",
      value:"green"
    },
  ]
})

console.log("你喜欢的颜色是:",color,"\n你喜欢的系统是:",system);
```

### confirm 确认框

confirm 确认框，可以让用户在命令行中选择是或否。

- message: 提示信息，必填，`string`。
- default: 默认值，可选，`boolean`。

```ts confirm 示例
import { confirm } from '@inquirer/prompts';

const isGit = await confirm({
  message:"是否启用 git 管理项目",
  default:false
})

console.log(isGit? "启用 git 管理项目" : "不启用 git 管理项目");
```

### editor 文本编辑器

editor 文本编辑器（不常用），可以让用户在命令行中使用文本编辑器（类似 vim）编辑文本。

- message: 提示信息，必填，`string`。
- default: 默认值，可选，`string`。

```ts editor 示例
import { editor } from '@inquirer/prompts';

const text = await editor({
  message:"请输入你的项目描述",
  default:"这是一个项目描述"
})

console.log("你的项目描述是:",text);
```

### expand 展开列表

expand 展开列表(不常用)，可以让用户在命令行中选择一个选项。 

- message: 提示信息，必填，`string`。
- choices: 选项列表，必填，`string[] | Choice<Value>[]`。使用对象时，name 为显示的选项，value 为选项的值，checked 为是否选中，checkedName 为选中后的显示名称。

    :::details Choice 类型定义
    ```ts
    type Key = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
    type Choice<Value> = {
        key: Key; // 选项的键
        value: Value; // 选项的值
    } | {
        key: Key; // 选项的键
        name: string; // 选项的显示名称
        value: Value; // 选项的值
    };
    ```
    :::

```ts expand 示例
import { expand } from '@inquirer/prompts';

const system = await expand({
  message:"请选择你的系统",
  choices:[
    {
      key:"0",
      name:"windows",
      value:"win"
    },
    {
      key:"1",
      name:"macos",
      value:"mac"
    },
    {
      key:"2",
      name:"linux",
      value:"linux"
    }
  ],
  default:"0"
})

console.log("你的操作系统是:",system);

```

### input 单行文本输入框

input 单行文本输入框，可以让用户在命令行中输入一个单行文本。

- message: 提示信息，必填，`string`。
- default: 默认值，可选，`string`。

```ts input 示例
import { input } from '@inquirer/prompts';

const name = await input({
  message:"请输入你的名字",
  default:"张三"
})

console.log("你的名字是:",name);
```

### number 数字输入框

number 数字输入框，可以让用户在命令行中输入一个数字。

- message: 提示信息，必填，`string`。
- default: 默认值，可选，`number`。

```ts number 示例
import { number } from '@inquirer/prompts';

const age = await number({
  message:"请输入你的年龄",
  default:18
})

console.log("你的年龄是:",age);
```

### password 密码输入框

password 密码输入框，可以让用户在命令行中输入一个密码。

- message: 提示信息，必填，`string`。
- mask: 是否使用字符替换输入或使用指定字符替换输入，可选，`boolean|string`，默认为不显示输入。

```ts password 示例
import { password } from '@inquirer/prompts';

const password = await password({
  message:"请输入你的密码",
  mask:"*"
})

console.log("你的密码是:",password);
```

### rawlist 原始列表

rawlist 原始列表(不常用)，可以让用户在命令行中选择一个选项。

- message: 提示信息，必填，`string`。
- choices: 选项列表，必填，`string[] | Choice<Value>[]`。使用对象时，name 为显示的选项，value 为选项的值，checked 为是否选中，checkedName 为选中后的显示名称。

    :::details Choice 类型定义
    ```ts
    type Choice<Value> = {
        value: Value; // 选项的值
        name?: string; // 选项的显示名称
        short?: string; // 选项的短名称
        key?: string; // 选项的键
        description?: string; // 选项的描述
    };
    ```
    :::

```ts rawlist 示例
import { rawlist } from '@inquirer/prompts';

const fruit = await rawlist({
  message:"请选择你喜欢的水果",
  choices:["apple","banana","cherry"]
})

console.log("你喜欢的水果是:",fruit);
```

### search 搜索输入框

search 搜索输入框(不常用)，可以将用户的输入作为选项列表的选项。

- message: 提示信息，必填，`string`。
- source: 搜索源，必填，`source`。一个函数，用于根据搜索关键词返回搜索结果。

    :::details source 类型定义
    ```ts
    type source: (term: string | undefined, opt: {
            signal: AbortSignal;
        }) => readonly (string | Separator)[] | readonly (Separator | Choice<Value>)[] | Promise<readonly (string | Separator)[]> | Promise<readonly (Separator | Choice<Value>)[]>;

    ```
    :::

```ts search 示例
import { search } from '@inquirer/prompts';

const language = await search({
  message:"请选择你的语言（选择选项或输入）",
  source:
    (input) => {
      if(input){
        return ["java","python","javascript",input.toLowerCase()]
      }
      return ["java","python","javascript"]
    },
})

console.log("你选择的语言是:",language);
```

### select 单选框

select 单选框，可以让用户在命令行中选择一个选项。

- message: 提示信息，必填，`string`。
- choices: 选项列表，必填，`string[] | Choice<Value>[]`。使用对象时，name 为显示的选项，value 为选项的值。

    :::details Choice 类型定义
    ```ts
    type Choice<Value> = {
      value: Value; // 选项的值
      name?: string; // 选项的显示名称
      description?: string; // 选项的描述 
      short?: string; // 选项的简称
      disabled?: boolean | string; // 是否禁用，禁用后无法选择
      type?: never; // 选项的类型
    };
    ```
    :::

```ts select 示例
import { select } from '@inquirer/prompts';

const sex = await select({
  message:"请选择你的性别",
  choices:[
    {
      name:"男",
      value:"male",
    },
    {
      name:"女",
      value:"female"
    }
  ]
})

console.log("你的性别是:",sex);
```

## 取消交互

inquirer 可以通过 `AbortController` 取消交互。

```ts 取消交互
import { autoPrompt } from '@inquirer/prompts';

const controller = new AbortController();
setTimeout(() => {
  controller.abort(); // 5秒后 promise 被拒绝
}, 5000);

const answer = await confirm({
  message:"请选择你的答案",
},{
  signal: controller.signal
}) ;

```

5秒后没有选择答案，则 promise 被拒绝，并打印错误信息。


## 错误处理

inquirer 的错误处理方式和普通 promise 一样，可以通过 `try...catch` 捕获错误。

```ts 错误处理
import { confirm } from '@inquirer/prompts';

try {
  const answer = await confirm({
    message:"请选择你的答案",
  })
  console.log("你选择了:",answer);
} catch (error) {
  console.log("你选择了取消");
}

```

此时输入 `ctrl/control+c` 会结束进程， promise 错误被捕获并打印消息信息。


## 更多

更多用法请参考 [inquirer](https://github.com/SBoudrias/Inquirer.js) 的官方文档。
