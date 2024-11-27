---
大纲：深入
---

# 运行时 API 示例

:::tip
更多关于文档页面的配置，请参阅 [配置](https://vitepress.dev/zh/reference/site-config)。
:::

本页面演示了 VitePress 提供的一些运行时 API 的用法。

主要的 `useData()` API 可以用于访问当前页面的站点、主题和页面数据。它适用于 `.md` 和 `.vue` 文件：

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## 结果

### 主题数据
<pre>{{ theme }}</pre>

### 页面数据
<pre>{{ page }}</pre>

### 页面前置数据
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## 结果

::: details 页面数据
### 主题数据
<pre>{{ theme }}</pre>

### 页面数据
<pre>{{ page }}</pre>

### 页面前置数据
<pre>{{ frontmatter }}</pre>
:::
## 更多信息

请查阅[运行时 API 的完整列表](https://vitepress.dev/reference/runtime-api#usedata)的文档。