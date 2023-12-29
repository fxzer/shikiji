---
outline: deep
---

# rehype-shikiji

<Badges name="rehype-shikiji" />

Shikiji 插件 [rehype](https://github.com/rehypejs/rehype)。

## 安装

```bash
npm i -D rehype-shikiji
```

## 用法

```ts
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShikiji from 'rehype-shikiji'

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShikiji, {
    // or `theme` for a single theme
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }
  })
  .use(rehypeStringify)
  .process(await fs.readFile('./input.md'))
```

## 细粒度的包

默认情况下，会导入完整的 `shikiji` 包。如果您使用的是 Shikiji 的[细粒度包](/guide/install#fine-grained-bundle)，您可以从 `rehype-shikiji/core` 导入 `rehypeShikijiFromHighlighter` 并传入自己的高亮器：

```ts
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShikijiFromHighlighter from 'rehype-shikiji/core'

import { fromHighlighter } from 'markdown-it-shikiji/core'
import { getHighlighterCore } from 'shikiji/core'
import { getWasmInlined } from 'shikiji/wasm'

const highlighter = await getHighlighterCore({
  themes: [
    import('shikiji/themes/vitesse-light.mjs')
  ],
  langs: [
    import('shikiji/langs/javascript.mjs'),
  ],
  loadWasm: getWasmInlined
})

const raw = await fs.readFile('./input.md')
const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShikijiFromHighlighter, highlighter, {
    // or `theme` for a single theme
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }
  })
  .use(rehypeStringify)
  .processSync(raw) // it's also possible to process synchronously
```

## 特性

### 高亮行

除了 `shikiji` 的特性，这个插件还支持高亮行。您可以在语言名后面加上 `{1,3-4}` 来高亮指定的行。例如：

````md
# Hello World

```js {1,3-4}
console.log('line1') // highlighted
console.log('line2')
console.log('line3') // highlighted
console.log('line4') // highlighted
```
````

预览效果：

```js {1,3-4}
console.log('line1') // highlighted
console.log('line2')
console.log('line3') // highlighted
console.log('line4') // highlighted
```
