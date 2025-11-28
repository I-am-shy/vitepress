# XML

---

XML（Extensible Markup Language）是一种标记语言，用于描述数据结构和内容。类似功能的标记语言还有yaml json init toml 等等。


## 和 HTML 的关系

XML 和 HTML 都是基于 SGML（标准通用标记语言），它们都是标签描述数据。但是 XML 的语法更加严格，更加规范。XML 必须有根标签，标签必须要闭合，属性必须有值，标签名可以自定义。

一句话总结就是： XML 是 命名自由但规范严格，HTML 是命名严格但规范自由。

:::tip 提示
解析时 HTML 出现错误时会尽可能的渲染正确部分而忽略错误，而 XML 出现错误时会直接报错并停止解析。
:::

在 H5 中已经兼容了 XML 数据，例如 SVG 标签就是 XML 数据。

## 基本语法

### 根标签

XML 必须有根标签，顶层必须是一个对象结构（键值对）。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <child>
    <grandchild>
      <text>Hello, World!</text>
    </grandchild>
  </child>
</root>
```

### 一般标签

一般标签用于描述数据结构和内容。一般标签可以有属性，可以有子标签，可以有文本内容。标签名，属性名均可以自定义。

```xml
<tag>content</tag>
<tag id="id" >content</tag>
<tag id="id" >
  content
  <tag>content</tag>
</tag>
```

### 注释和 CDATA 节点

注释和 HTML 相同，使用 `<!-- comment -->` 表示。

```xml
<!-- comment -->
```

CDATA 节点标识内容为纯文本，不会被解析。

```xml
<![CDATA[ <tag>content</tag> ]]>
```

`<tag>content</tag>` 会被解析为纯文本。

## XML 的数据提取

以转换成 JSON 为例，XML 的数据提取后的结构如下：

XML:
```xml
<library>
  书本列表：
  <book id="1" type="program">
    <name>Java编程思想</name>
    <price>99.0</price>
    <empty/>
  </book>
  <book id="2">
    <name>Python实战</name>
    <price>89.5</price>
  </book>
</library>
```

JSON:
```json
{
  "library": {
    "#text": "书本列表：", // 文本节点映射为#text
    "book": [  // 重复节点转为数组
      {
        "@id": "1",        // 属性前缀@
        "@type": "program",
        "name": "Java编程思想",
        "price": "99.0",
        "empty": null      // 空节点映射为null
      },
      {
        "@id": "2",
        "name": "Python实战",
        "price": "89.5"
      }
    ]
  }
}
```

:::tip 说明

文本节点映射为 #text,属性前缀用 @ ，目的是和子标签区分避免出现重复属性。

:::