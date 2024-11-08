# Markdown扩展示例

本页面演示了VitePress提供的一些内置的Markdown扩展功能。

:::tip
Markdown 文件中的**根级** `<script>` 和 `<style>` 标签与 Vue SFC 中的一样，包括 `<script setup>`、`<style module>` 等,(即你可以使用这两个标签书写相关的vue代码，因为最终所有的 md文件都会被编译成vue文件)。这里的主要区别是没有 `<template> `标签：所有其他根级内容都是 Markdown。另请注意，所有标签都应放在 frontmatter 之后;

并且你可以直接在 Markdown 中使用 Vue 组件，就像在 `.vue` 文件中一样。例如，`<Component />`

:::

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