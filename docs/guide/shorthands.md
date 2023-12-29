# 简写形式

除了 `getHighlighter` 函数之外，`shikiji` 还提供了一些简写函数，以便更简单的使用。

```js
import { codeToHtml, codeToThemedTokens } from 'shikiji'

const code = await codeToHtml('const a = 1', { lang: 'javascript', theme: 'nord' })
const tokens = await codeToThemedTokens('<div class="foo">bar</div>', { lang: 'html', theme: 'min-dark' })
```

当前支持:

- `codeToThemedTokens`
- `codeToHtml`
- `codeToHast`

在内部他们保持单个高亮器实例，并按需加载主题/语言。与 `shiki.codeToHtml` 不同，`codeToHtml` 简写函数返回一个 Promise，`lang` 和 `theme` 选项是必需的。

> **注**：这些仅在 [捆绑用法](/guide/install#bundled-usage) 中可用，也就是 `shikiji` 主入口。如果您使用的是 [精细捆绑](/guide/install#fine-grained-bundle)，则可以使用 [`createSingletonShorthands`](https://github.com/antfu/shikiji/blob/main/packages/shikiji/src/core/bundle-factory.ts)，或将其移植到您自己的配置中。
