# YAML---数据序列化的格式

## 介绍

YAML（YAML Ain't Markup Language,更早之前是 Yet Another Markup Language）是一种人类可读的数据序列化格式，通常用于**配置文件**。它使用简洁的语法和缩进表示数据结构，易于阅读和编写。YAML广泛应用于各种编程语言和框架中，如Docker、Kubernetes、Ansible等。

类似的格式还有`JSON`、`XML`、`INI`等。

:::warning 注意
- YAML 的文件扩展名是 `.yml` 或 `.yaml`。
- 可以使用 `#` 表示注释。
:::

## 规则

- 大小写敏感
- 使用缩进表示层级关系
- 缩进时不允许使用Tab键，只允许使用空格。
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可

```yaml
title: 这是一个yaml文件
list:
  - 列表项1
  - 列表项2
  - 列表项3
```
以上反序列化转成js对象后，对象的结构如下：

```js
{
  title: '这是一个yaml文件',
  list: ['列表项1', '列表项2', '列表项3']
}
```

:::tip 提示
YAML是参考python的语法规则开发的，所以语法上和python很像。
:::

**YAML 支持的数据结构有三种**

1. [对象](#对象)：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
2. [数组](#数组)：一组按次序排列的值，又称为序列（sequence） / 列表（list）
3. [纯量](#纯量)：单个的、不可再分的值

:::tip 提示
类比JSON，主要存放的数据也是对象和数组
:::

### 对象

对象是键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）

```yaml
name: 张三
age: 20
```
以上反序列化转成js对象后，对象的结构如下：

```js
{
  name: '张三',
  age: 20
}
```

### 数组

数组是按次序排列的值，又称为序列（sequence） / 列表（list）

```yaml
- 苹果
- 香蕉
- 橘子
```   
以上反序列化转成js对象后，对象的结构如下：

```js
['苹果', '香蕉', '橘子']
```

### 纯量

纯量是最基本的、不可再分的值。以下数据类型都属于 JavaScript 的纯量。

- 字符串
- 布尔值
- 整数
- 浮点数
- null
- 时间
- 二进制值

```yaml
str: 字符串
bool: true
number: 123
null: ~
time: 2024-01-01 12:00:00
binary: 01010101
```

以上反序列化转成js对象后，对象的结构如下：

```js
{
  str: '字符串',
  bool: true,
  number: 123,
  null: null,
  time: new Date('2024-01-01 12:00:00'),
  binary: new Uint8Array([0x01, 0x02, 0x03])
}
```
:::warning 注意
YAML 使用 ~ 表示 null。
:::

## 在JS中使用YAML
通过`js-yaml`库，可以将YAML文件反序列化成js对象。

```bash
npm install js-yaml
```
```js
// 序列化
var yaml = require('js-yaml');
var fs   = require('fs');

var obj = {
  title: '这是一个yaml文件',
  list: ['列表项1', '列表项2', '列表项3'],
  listMap: [
    {key:"_1", value:1},
    {key:"_2", value:2},
    {key:"_3", value:3},
  ]
};

try {
  fs.writeFileSync(
    './example.yml',
    yaml.dump(obj),
    'utf8'
  );
} catch (e) {
  console.log(e);
}
```
```yaml
# example.yml
title: 这是一个yaml文件
list:
  - 列表项1
  - 列表项2
  - 列表项3
listMap:
  - key: _1
    value: 1
  - key: _2
    value: 2
  - key: _3
    value: 3
```

:::warning 注意
在浏览器中可以通过引入CDN的方式使用js-yaml库。

`<script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>`

:::

```js
// 反序列化
var yaml = require('js-yaml');
var fs   = require('fs');

var doc = yaml.load(fs.readFileSync('./example.yml', 'utf8'));
console.log(doc);
```

## 和JSON，XML的对比
虽然YAML功能参考了JSON，XML等语言,但是YAML的语法更简洁，同时也支持书写注释。

## 更多
更多相关内容请参考：
  - [阮一峰的网络日志 - YAML 教程](https://ruanyifeng.com/blog/2016/07/yaml.html)
  - [维基百科 - YAML](https://zh.wikipedia.org/zh-cn/YAML)


