# shikiji-monaco

<Badges name="shikiji-monaco" />

[Monaco Editor](https://microsoft.github.io/monaco-editor/) 使用 Shikiji 高亮.

Monaco 内置的高亮器并没有使用完整的 TextMate 语法，这在某些情况下不够准确。这个包允许您使用 Shikiji 的语法高亮引擎来高亮 Monaco，使用 Shikiji 的共享语法和主题。

::: warning
这个包是实验性的，可能会有不兼容的改动。
:::

深受 [`monaco-editor-textmate`](https://github.com/zikaari/monaco-editor-textmate) 启发.

## 安装

```bash
npm i -D shikiji-monaco
```

```ts
import { getHighlighter } from 'shikiji'
import { shikijiToMonaco } from 'shikiji-monaco'
import * as monaco from 'monaco-editor-core'

// 创建高亮器后可被复用
const highlighter = await getHighlighter({
  themes: [
    'vitesse-dark',
    'vitesse-light',
  ],
  langs: [
    'javascript',
    'typescript',
    'vue'
  ],
})

// 注册语言 ID，只有注册的语言才会被高亮
monaco.languages.register({ id: 'vue' })
monaco.languages.register({ id: 'typescript' })
monaco.languages.register({ id: 'javascript' })

// 注册 Shikiji 的主题，并为 Monaco 提供语法高亮。// [!code highlight:2]
shikijiToMonaco(highlighter, monaco)

//  创建编辑器
const editor = monaco.editor.create(document.getElementById('container'), {
  value: 'const a = 1',
  language: 'javascript',
  theme: 'vitesse-dark',
})

// ...作为编辑器正常使用
```
