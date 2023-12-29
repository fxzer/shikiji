# markdown-it-shikiji

<Badges name="markdown-it-shikiji" />

Shikiji 插件 [Markdown It](https://markdown-it.github.io/)。

## Install

```bash
npm i -D markdown-it-shikiji
```

## Usage

```ts
import MarkdownIt from 'markdown-it'
import Shikiji from 'markdown-it-shikiji'

const md = MarkdownIt()

md.use(await Shikiji({
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  }
}))
```

## 细粒度包

默认情况下，会导入完整的 `shikiji` 包。如果您使用的是 Shikiji 的[细粒度包](/guide/install#细粒度包)，您可以从 `markdown-it-shikiji/core` 导入并传入您自己的高亮器：

```ts
import MarkdownIt from 'markdown-it'
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

const md = MarkdownIt()

md.use(fromHighlighter(highlighter, { /* options */ }))
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
