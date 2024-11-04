# Markdown扩展示例

本页面演示了VitePress提供的一些内置的Markdown扩展功能。

## 语法高亮

VitePress使用[Shiki](https://github.com/shikijs/shiki)提供语法高亮功能，还支持行高亮等其他功能：

**输入**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**输出**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 自定义容器

**输入**

```md
::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险警告。
:::

::: details
这是一个详细信息块。
:::
```

**输出**

::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险警告。
:::

::: details
这是一个详细信息块。
:::

## 更多

请查阅[完整的Markdown扩展列表](https://vitepress.dev/guide/markdown)的文档。