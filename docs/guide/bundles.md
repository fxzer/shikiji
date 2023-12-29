---
outline: deep
---

# 捆绑包

`shikiji` 主入口支持动态懒加载所有的主题和语言。对于大多数场景来说，这不会影响效率，因为语法只有在使用时才会被导入/下载。但是，当您将 Shikiji 捆绑到浏览器运行时或 Web Worker 时，即使这些文件没有被导入，它们仍然会增加您的 dist 大小。我们提供了[精细捆绑](/guide/install#fine-grained-bundle)来帮助您按需逐个组合语言和主题。

我们也提供预制包更方便供您使用：

## `shikiji/bundle/full`

> [捆绑包大小](/guide/#bundle-size): 6.4 MB (minified), 1.2 MB (gzip), 包含异步块

完整的捆绑包包括所有主题和语言，与主 shikiji 条目相同。

## `shikiji/bundle/web`

> [捆绑包大小](/guide/#bundle-size): 3.8 MB (minified), 695 KB (gzip), 包含异步块

该捆绑包包括所有主题和常见的 Web 语言，如（HTML、CSS、JS、TS、JSON、Markdown 等）和一些 Web 框架（Vue、JSX、Svelte 等）。

`shikiji` 中的所有函数也在捆绑包中可用：

```ts
import {
  BundledLanguage,
  BundledTheme,
  codeToHtml,
  getHighlighter
} from 'shikiji/bundle/web' // [!code highlight]

const highlighter = await getHighlighter({
  langs: ['html', 'css', 'js'],
  themes: ['github-dark', 'github-light'],
})
```
