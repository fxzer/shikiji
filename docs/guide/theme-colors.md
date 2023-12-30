# 主题颜色处理

## 任意颜色值

通常，TextMate 主题会期望每个标记的颜色值是有效的十六进制颜色值，限制是继承自 [`vscode-textmate`](https://github.com/microsoft/vscode-textmate) 。从 Shikiji v0.9.15 开始，我们引入了一种自动解决方法，将非十六进制颜色值替换为占位符，并在标记化时替换它们。这将允许您使用具有任意颜色值的主题进行渲染，而无需担心技术细节：

```ts twoslash
import { getHighlighter } from 'shikiji'

const highlighter = await getHighlighter({
  langs: ['javascript'],
  themes: [
    {
      name: 'my-theme',
      settings: [
        {
          scope: ['comment'],
          settings: {
            // use `rgb`, `hsl`, `hsla`, // [!code hl:3]
            // 或您的渲染器支持的任何东西
            foreground: 'rgb(128, 128, 128)'
          }
        },
        {
          scope: ['string'],
          settings: {
            foreground: 'var(--code-string)' // CSS  变量 // [!code hl:1]
          }
        },
        // ...more
      ],
      // 背景色和前景色 // [!code hl:3]
      bg: 'var(--code-bg)',
      fg: 'var(--code-fg)'
    }
  ]
})

const html = highlighter.codeToHtml('const foo = "bar"', { lang: 'javascript', theme: 'my-theme' })
```

::: info 注意
请谨慎使用，因为这将偏离 TextMate 主题的兼容性。

这可能会使主题与非 Web 用法（如 [`shikiji-cli`](/packages/cli) 和 [`shikiji-monaco`](/packages/monaco) ）不兼容。
:::

想要了解更多可以查看如何 [加载自定义主题](./load-theme).

## 颜色替换

您还可以使用该 `colorReplacements` 选项来替换主题的颜色值。当您想使用具有不同调色板的主题时，这很有用。它可以在主题对象和 `codeToHast` `codeToHtml` 选项上提供。

## CSS 变量主题

::: warning 实验性
此功能是实验性的，可能会在不遵循 semver 的情况下进行更改。
:::

Shikiji 提供了一个工厂函数助手 `createCssVariablesTheme` ，用于更轻松地创建主题的使用 CSS 变量。请注意，此主题的粒度比大多数其他主题要少得多，并且需要在应用中定义 CSS 变量。这是为了更轻松地从 Shiki 的 [`css-variables theme`](https://github.com/shikijs/shiki/blob/main/docs/themes.md#theming-with-css-variables)。为了获得更好的突出显示效果，我们建议使用任意颜色值手动构建主题，或使用颜色替换来覆盖现有主题。

默认情况下**不包含**此主题，需要显式注册：

```ts twoslash
import { createCssVariablesTheme, getHighlighter } from 'shikiji'

// Create a custom CSS variables theme, the following are the default values
const myTheme = createCssVariablesTheme({ // [!code hl:6]
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true
})

const highlighter = await getHighlighter({
  langs: ['javascript'],
  themes: [myTheme] // register the theme // [!code hl]
})

const html = highlighter.codeToHtml('const foo = "bar"', {
  lang: 'javascript',
  theme: 'css-variables' // use the theme // [!code hl]
})
```

CSS 变量示例：

```css
:root {
  --shiki-foreground: #eeeeee;
  --shiki-background: #333333;
  --shiki-token-constant: #660000;
  --shiki-token-string: #770000;
  --shiki-token-comment: #880000;
  --shiki-token-keyword: #990000;
  --shiki-token-parameter: #aa0000;
  --shiki-token-function: #bb0000;
  --shiki-token-string-expression: #cc0000;
  --shiki-token-punctuation: #dd0000;
  --shiki-token-link: #ee0000;

  /* Only required if using lang: 'ansi' */
  --shiki-ansi-black: #000000;
  --shiki-ansi-black-dim: #00000080;
  --shiki-ansi-red: #bb0000;
  --shiki-ansi-red-dim: #bb000080;
  --shiki-ansi-green: #00bb00;
  --shiki-ansi-green-dim: #00bb0080;
  --shiki-ansi-yellow: #bbbb00;
  --shiki-ansi-yellow-dim: #bbbb0080;
  --shiki-ansi-blue: #0000bb;
  --shiki-ansi-blue-dim: #0000bb80;
  --shiki-ansi-magenta: #ff00ff;
  --shiki-ansi-magenta-dim: #ff00ff80;
  --shiki-ansi-cyan: #00bbbb;
  --shiki-ansi-cyan-dim: #00bbbb80;
  --shiki-ansi-white: #eeeeee;
  --shiki-ansi-white-dim: #eeeeee80;
  --shiki-ansi-bright-black: #555555;
  --shiki-ansi-bright-black-dim: #55555580;
  --shiki-ansi-bright-red: #ff5555;
  --shiki-ansi-bright-red-dim: #ff555580;
  --shiki-ansi-bright-green: #00ff00;
  --shiki-ansi-bright-green-dim: #00ff0080;
  --shiki-ansi-bright-yellow: #ffff55;
  --shiki-ansi-bright-yellow-dim: #ffff5580;
  --shiki-ansi-bright-blue: #5555ff;
  --shiki-ansi-bright-blue-dim: #5555ff80;
  --shiki-ansi-bright-magenta: #ff55ff;
  --shiki-ansi-bright-magenta-dim: #ff55ff80;
  --shiki-ansi-bright-cyan: #55ffff;
  --shiki-ansi-bright-cyan-dim: #55ffff80;
  --shiki-ansi-bright-white: #ffffff;
  --shiki-ansi-bright-white-dim: #ffffff80;
}
```

如果要从 Shiki 迁移，则某些变量将从 Shiki 重命名 css-variables ：

| Shiki                      | Shikiji              |
| -------------------------- | -------------------- |
| `--shiki-color-text`       | `--shiki-forground`  |
| `--shiki-color-background` | `--shiki-background` |
| `--shiki-color-ansi-*`     | `--shiki-ansi-*`     |
