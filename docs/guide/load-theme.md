# 加载自定义主题

查看 [所有内置主题](/themes)。
您可以将 `Theme` 对象传递到 `themes` 数组中来加载自定义主题。

```ts twoslash
import { getHighlighter } from 'shikiji'

const myTheme = {
  name: 'my-theme',
  settings: [
    {
      scope: ['comment'],
      settings: {
        foreground: '#888'
      }
    },
    // ...
  ]
}

const highlighter = await getHighlighter({
  themes: [myTheme]
})

const code = `console.log('hello')`
const html = highlighter.codeToHtml(code, {
  lang: 'javascript',
  theme: 'my-theme'
})
```

您也可以在创建高亮器后加载主题。

```ts {7} twoslash
// @noErrors
import { getHighlighter } from 'shikiji'

// Load the theme object from a file, a network request, or anywhere
const myTheme = JSON.parse(fs.readFileSync('my-theme.json', 'utf8'))

const highlighter = await getHighlighter()

await highlighter.loadTheme(myTheme) // <--

const code = `console.log('hello')`
const html = highlighter.codeToHtml(code, {
  lang: 'javascript',
  theme: 'my-theme'
})
```

主题必须是一个 TextMate 语法 JSON 主题对象。例如，[它应该看起来像这样](https://github.com/antfu/vscode-theme-vitesse/blob/main/themes/vitesse-dark.json)。
