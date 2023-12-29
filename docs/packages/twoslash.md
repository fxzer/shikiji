# shikiji-twoslash

<Badges name="shikiji-twoslash" />

[TypeScript TwoSlash](https://www.typescriptlang.org/dev/twoslash/) 是一个 Shikiji 转换器, 提供了在代码块中的内联类型悬停。灵感来自 [`shiki-twoslash`](https://shikijs.github.io/twoslash/)。

## 安装

```bash
npm i -D shikiji-twoslash
```

不同于 `shiki-twoslash` 是对 `shiki` 的封装，这个包是 **一个 Shikiji 转换器**。这意味着对于任何支持 shikiji 转换器的集成，您都可以使用这个包。

```ts twoslash {12}
import {
  codeToHtml,
} from 'shikiji'
import {
  transformerTwoSlash,
} from 'shikiji-twoslash'

const html = await codeToHtml(`console.log()`, {
  lang: 'ts',
  theme: 'vitesse-dark',
  transformers: [
    transformerTwoSlash(), // <-- here
    // ...
  ],
})
```

类似于 `shiki-twoslash`，输出是没有样式的。您需要添加一些额外的 CSS 来让它们看起来好看。
如果您想在浏览器或者 worker 中运行 TwoSlash，请参考 [CDN Usage](#cdn-usage) 章节。

## 渲染器

感谢 [`hast`](https://github.com/syntax-tree/hast) 的灵活性，这个转换器允许您通过 AST 来自定义输出 HTML 中每个信息的渲染。

我们内置了两个渲染器，您也可以自己创建：

### `rendererClassic`

[源码](https://github.com/antfu/shikiji/blob/main/packages/shikiji-twoslash/src/renderer-classic.ts)

这是默认的渲染器，它的输出和 [`shiki-twoslash`](https://shikijs.github.io/twoslash/) 一致。

您可能需要参考 `shiki-twoslash` 的 CSS 来使它们更好看。[这里](https://github.com/antfu/shikiji/blob/main/packages/shikiji-twoslash/style-classic.css) 我们也复制了 `shiki-twoslash` 的 CSS，但可能需要一些清理。

### `rendererRich`

[源码](https://github.com/antfu/shikiji/blob/main/packages/shikiji-twoslash/src/renderer-rich.ts)

这个渲染器提供了一个更明确的类名，它总是以 `twoslash-` 为前缀。此外，它还对悬停信息进行语法高亮。

```ts twoslash {4}
import { rendererRich, transformerTwoSlash } from 'shikiji-twoslash'

transformerTwoSlash({
  renderer: rendererRich() // <--
})
```

以下是内置的几个示例 [`style-rich.css`](https://github.com/antfu/shikiji/blob/main/packages/shikiji-twoslash/style-rich.css):

<!-- eslint-skip -->

```ts twoslash
// @errors: 2540
interface Todo {
  title: string
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users'.toUpperCase(),
//  ^?
}

todo.title = 'Hello'

Number.parseInt('123', 10)
//      ^|

               //
               //
```

```ts twoslash
import { getHighlighterCore } from 'shikiji/core'

const shiki = await getHighlighterCore({})
// @log: Custom log message
const a = 1
// @error: Custom error message
const b = 1
// @warn: Custom warning message
const c = 1
// @annotate: Custom annotation message
```

## 配置项

### 显示触发

当与 `markdown-it-shikiji` 或 `rehype-shikiji` 集成时，我们可能不希望 TwoSlash 在每个代码块上运行。在这种情况下，我们可以将 `explicitTrigger` 设置为 `true`，以便仅在代码框中出现 `twoslash` 的代码块上运行。

```ts twoslash {4}
import { transformerTwoSlash } from 'shikiji-twoslash'

transformerTwoSlash({
  explicitTrigger: true // <--
})
```

````md
在 markdown 中，您可以使用以下语法来触发 TwoSlash：

```ts
// 正常代码块
```

```ts twoslash
//  TwoSlash 代码块
```
````

## 秘诀

### CDN 用法

::: warning
这是一个实验特性。
:::

默认情况下，`@typescript/twoslash` 在 Node.js 上运行，并依赖于您的本地系统来解析 TypeScript 和导入的类型。在非 Node.js 环境中直接导入它将不起作用。

幸运的是，TwoSlash 实现了一个虚拟文件系统，允许您在内存中提供自己的文件供 TypeScript 解析。然而，如何在浏览器中加载这些文件仍然是一个挑战。感谢 [TypeScript 网站](https://github.com/microsoft/TypeScript-Website)，TypeScript 团队已经为通过 CDN 获取类型提供了一些实用程序，他们称之为 [Automatic Type Acquisition (ATA)](https://github.com/microsoft/TypeScript-Website/tree/v2/packages/ata)。

我们在构建块周围做了一些小包装，并在 [`twoslash-cdn`](https://github.com/antfu/twoslash-cdn)，提供了一个易于使用的 API。例如：

```js
// TODO: Replace with explicit versions in production
import { createTransformerFactory, rendererRich } from 'https://esm.sh/shikiji-twoslash@latest/core'
import { codeToHtml } from 'https://esm.sh/shikiji@latest'
import { createStorage } from 'https://esm.sh/unstorage@latest'
import indexedDbDriver from 'https://esm.sh/unstorage@latest/drivers/indexedb'
import { createTwoSlashFromCDN } from 'https://esm.sh/twoslash-cdn@latest'

// ============= Initialization =============

// 一个使用 IndexedDB 缓存虚拟文件系统的 unstorage 示例
const storage = createStorage({
  driver: indexedDbDriver({ base: 'twoslash-cdn' }),
})

const twoslash = createTwoSlashFromCDN({
  storage,
  compilerOptions: {
    lib: ['esnext', 'dom'],
  },
})

const transformerTwoSlash = createTransformerFactory(twoslash.runSync)({
  renderer: rendererRich(),
})

// ============= Execution =============

const app = document.getElementById('app')

const source = `
import { ref } from 'vue'

console.log("Hi! Shikiji + TwoSlash on CDN :)")

const count = ref(0)
//     ^?
`.trim()

// 在渲染之前，我们需要准备类型，以便渲染可以同步进行
await twoslash.prepareTypes(source)

// 然后渲染代码
app.innerHTML = await codeToHtml(source, {
  lang: 'ts',
  theme: 'vitesse-dark',
  transformers: [transformerTwoSlash],
})
```

## 集成

### VitePress

VitePress 从 [`1.0.0-rc.30`](https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md#100-rc30-2023-11-23)开始使用 Shikiji 来进行语法高亮。要使用这个转换器，您可以将它添加到 VitePress 配置文件中的 `markdown.codeTransformers` 选项中。

```ts twoslash
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { rendererRich, transformerTwoSlash } from 'shikiji-twoslash'

export default defineConfig({
  markdown: {
    codeTransformers: [
      transformerTwoSlash({
        // 这使得 TwoSlash 仅在代码块中出现 `twoslash` 时运行
        explicitTrigger: true,
        // 使用 rich 渲染器
        renderer: rendererRich({
          //  让 VitePress 在复制时忽略额外的元数据 DOM
          //  从 VitePress 1.0.0-rc.33 开始可用
          classExtra: 'vp-copy-ignore',
        }),
      })
    ]
  },
})
```

并导入 CSS 到 `.vitepress/theme/index.ts` 中

```ts
// .vitepress/theme/index.ts
import 'shikiji-twoslash/style-rich.css'

export default {
  // ...
}
```
