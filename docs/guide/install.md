---
outline: deep
---

# 集成

<Badges name="shikiji" />
通过 npm 或 [CDN 安装](#cdn-usage)：
::: code-group

```sh [npm]
npm install -D shikiji
```

```sh [yarn]
yarn add -D shikiji
```

```sh [pnpm]
pnpm add -D shikiji
```

```sh [bun]
bun add -D shikiji
```

:::

## 集成

我们还可以集成一些插件，例如 [Markdown It Plugin](/packages/markdown-it) 和 [Rehype Plugin](/packages/rehype)。在集成部分了解有关它们的更多信息。

## 用法

### 捆绑用法

基本用法与 `shiki` 几乎相同，只是删除了一些 API（例如，单数 `theme` 选项）。当每个主题和语言文件以 ES 模块进行动态导入，它可以**显著**提升性能。

```ts twoslash
import { getHighlighter } from 'shikiji'

const highlighter = await getHighlighter({
  themes: ['nord'],
  langs: ['javascript'],
})

// 可选择在创建高亮器后，再加载主题和语言
await highlighter.loadTheme('vitesse-light')
await highlighter.loadLanguage('css')

const code = highlighter.codeToHtml('const a = 1', {
  lang: 'javascript',
  theme: 'vitesse-light'
})
```

不同于 `shiki`, `shikiji` 没指定主题和语言则不会加载。

```ts theme:slack-dark twoslash
import { getHighlighter } from 'shikiji'

const highlighter = await getHighlighter()

highlighter.codeToHtml(
  'const a = 1',
  { lang: 'javascript', theme: 'slack-dark' }
)
// @error: Throw error, `javascript` is not loaded

await highlighter.loadLanguage('javascript') // load the language
```

如果您想加载所有主题和语言（不推荐），您可以遍历`bundledLanguages` and `bundledThemes`的所有的键。

```ts
import { bundledLanguages, bundledThemes, getHighlighter } from 'shikiji'

const highlighter = await getHighlighter({
  themes: Object.keys(bundledThemes),
  langs: Object.keys(bundledLanguages),
})

highlighter.codeToHtml('const a = 1', { lang: 'javascript' })
```

或者您可以尝试 [简写形式](/guide/shorthands) 异步按需加载主题/语言。

### 细粒度捆绑

当导入 `shikiji` 时，所有的主题和语言都作为异步块捆绑。通常，如果您不使用它们，它们就不会被加载，这对您来说不是一个问题。在某些情况下，如果您想控制捆绑什么，您可以使用核心并组合自己的捆绑包。

```js theme:material-theme-ocean
// `shikiji/core` 入口不包含任何主题或语言或 wasm 二进制文件。
import { getHighlighterCore } from 'shikiji/core'

// `shikiji/wasm` 包含作为 base64 字符串内联的 wasm 二进制文件。
import { getWasmInlined } from 'shikiji/wasm'

// 直接导入主题和语言模块，只有您导入的模块才会被捆绑。
import nord from 'shikiji/themes/nord.mjs'

const shiki = await getHighlighterCore({
  themes: [
    // 用已导入的模块代替字符串
    nord,
    // 或者如果您想要分包，则使用动态导入
    import('shikiji/themes/material-theme-ocean.mjs')
  ],
  langs: [
    import('shikiji/langs/javascript.mjs'),
    // shikiji 将尝试将模块与默认导出进行交互
    () => import('shikiji/langs/css.mjs'),
    // 或者返回自定义语法的 getter
    async () => JSON.parse(await fs.readFile('my-grammar.json', 'utf-8'))
  ],
  loadWasm: getWasmInlined
})

// 可选择在创建后加载主题和语言
await shiki.loadTheme(import('shikiji/themes/vitesse-light.mjs'))

const code = shiki.codeToHtml('const a = 1', {
  lang: 'javascript',
  theme: 'material-theme-ocean'
})
```

### 捆绑预设

我们还为您提供了一些预先组合的捆绑包，以便您轻松使用，了解有关它们的更多信息，请参阅 [捆绑包部分](/guide/bundles)。

### CJS 用法

`shikiji` 仅发布为 ESM，以减少包的大小。仍然可以在 CJS 中使用它，因为 Node.js 支持在 CJS 中动态导入 ESM 模块。

例如，以下 ESM 代码：

```js
// ESM
import { getHighlighter } from 'shikiji'

async function main() {
  const shiki = await getHighlighter({
    themes: ['vitesse-dark'],
    langs: ['javascript'],
  })

  const code = shiki.codeToHtml('const a = 1', { lang: 'javascript' })
}
```

可以在 CJS 中编写为：

```js
// CJS
async function main() {
  const { getHighlighter } = await import('shikiji')

  const shiki = await getHighlighter({
    themes: ['vitesse-dark'],
    langs: ['javascript'],
  })

  const code = shiki.codeToHtml('const a = 1', { lang: 'javascript' })
}
```

### CDN 用法

要通过 CDN 在浏览器中使用 `shikiji`，您可以使用 [esm.run](https://esm.run) 或 [esm.sh](https://esm.sh)。

```html theme:rose-pine
<body>
  <div id="foo"></div>

  <script type="module">
    // 确保指定确切的版本
    import { codeToHtml } from 'https://esm.sh/shikiji@0.8.0'
    // or
    // import { codeToHtml } from 'https://esm.run/shikiji@0.8.0'

    const foo = document.getElementById('foo')
    foo.innerHTML = await codeToHtml('console.log("Hi, Shiki on CDN :)")', {
      lang: 'js',
      theme: 'rose-pine'
    })
  </script>
</body>
```

它非常有效，因为它只会按需加载语言和主题。对于上面的代码片段，只会触发四个请求（`shikiji`，`shikiji/themes/vitesse-light.mjs`，`shikiji/langs/javascript.mjs`，`shikiji/wasm.mjs`），总共传输大约 200KB 的数据。
[Demo](https://jsfiddle.net/rdasqhxu/1/)

### Cloudflare Workers

Cloudflare Workers [不支持从二进制数据初始化 WebAssembly](https://community.cloudflare.com/t/fixed-cloudflare-workers-slow-with-moderate-sized-webassembly-bindings/184668/3)，因此默认的 wasm 构建不起作用。您需要将 wasm 作为资产上传并直接导入。

同时，建议使用 [细粒度捆绑](#fine-grained-bundle) 方法来减少捆绑包大小。

```ts theme:nord
import { getHighlighterCore, loadWasm } from 'shikiji/core'
import nord from 'shikiji/themes/nord.mjs'
import js from 'shikiji/langs/javascript.mjs'

// 导入 wasm 作为资产
import wasm from 'shikiji/onig.wasm'

// 加载 wasm 在 `fetch` 之外，以便可以重用
await loadWasm(obj => WebAssembly.instantiate(wasm, obj))

export default {
  async fetch() {
    const highlighter = await getHighlighterCore({
      themes: [nord],
      langs: [js],
    })

    return new Response(highlighter.codeToHtml('console.log(\'shiki\');', { lang: 'js' }))
  },
}
```
