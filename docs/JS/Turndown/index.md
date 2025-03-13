# HTML转Markdown
---

通过js将HTML转换为Markdown，使用[turndown](https://github.com/mixmark-io/turndown)库

## 原理

turndown库的原理是遍历匹配所有的HTML标签，然后根据默认或者设置好的规则将其转换为Markdown格式。

## 安装turndown
npm
```bash
npm install turndown
```
浏览器中使用
```html
<script src="https://unpkg.com/turndown/dist/turndown.js"></script>
```

## 基本使用方法

在node环境下，通过Turndown实例的turndown方法将HTML格式的字符串文本转换为Markdown格式，需要注意的是，turndown库中也支持在html文本中使用选择器来获取标签内容
```js
// Node.js
var TurndownService = require('turndown')

var turndownService = new TurndownService()
var markdown = turndownService.turndown('<h1>Hello world!</h1>') 
console.log(markdown) // # Hello world! 
```
Turndown 也接受 DOM 节点作为输入（无论是元素节点、文档节点还是文档片段节点）：
```html
<script src="https://unpkg.com/turndown/dist/turndown.js"></script>
<script>
  var turndownService = new TurndownService()
  var markdown = turndownService.turndown(document.getElementById('content'))
</script>
```

## Options配置

在实例化Turndown类时可以配置默认的转换规则(例如，标题使用atx风格，列表使用-风格，代码块使用```风格)，通过options参数来配置
```js
var turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
})
```

具体参数如下：
| 选项 | 可选值 | 默认值 |
| --- | --- | --- |
| headingStyle | setext或atx | setext |
| hr | 任何主题 break | * * * |
| bulletListMarker | -或+ * | * |
| codeBlockStyle | indented或fenced | indented |
| fence | ```或~~~ | ``` |
| emDelimiter | _或* | _ |
| strongDelimiter | **或__ | ** |
| linkStyle | inlined或referenced | inlined |
| linkReferenceStyle | full或collapsedshortcut | full |
| preformattedCode | false或true | false |

## 扩展方法

通过一些实例方法，可以定制化的处理HTML文本，生成指定的Markdown效果格式

### `addRule(key, rule)` 添加规则
- key：唯一的规则名称,string类型
- rule：规则对象，包含`filter`和`replacement`两个属性
  - filter：过滤函数，返回true则执行replacement，false则跳过，用来过滤出需要特殊处理的节点
    - node 遍历处理的节点
  - replacement：替换函数，返回替换后的字符串，将过滤出来的节点进行转换
    - content：过滤出来节点的内容
    - node：过滤出来的节点

**示例**
```js
// 将h2标签转换为#标题
turndownService.addRule('h2-h1', {
  filter: function (node) {
    return node.nodeName === 'H2'
  },
  replacement: function (content,node) {
    return '# ' + content
  }
})
```

### `removeRule(key)` 删除规则

- key：规则名称
```js
// 删除h2-h1规则
turndownService.removeRule('h2-h1')
```

### `use(plugin|[plugin1,plugin2])` 使用插件

:::warning 注意
这里可以使用一个插件对象，也可以使用多个插件对象数组
:::

- plugin：插件对象，包含`rules`和`options`两个属性
  - rules：规则对象，包含`filter`和`replacement`两个属性
  - options：配置对象

  可以使用一些配置好的插件，也可以自定义插件
```js
//从turndown-plugin-gfm导入插件
var turndownPluginGfm = require('turndown-plugin-gfm')
var gfm = turndownPluginGfm.gfm
var tables = turndownPluginGfm.tables
var strikethrough = turndownPluginGfm.strikethrough

//使用 gfm 插件
turndownService.use(gfm)
//仅使用表格和删除线插件
turndownService.use([tables, strikethrough])
```

