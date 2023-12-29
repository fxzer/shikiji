---
outline: deep
---

# 浅色/深色双主题

Shikiji 支持输出浅色/深色双主题。与 [markdown-it-shiki](https://github.com/antfu/markdown-it-shiki#dark-mode) 的方法不同，它会将代码渲染两次，Shikiji 的双主题方法使用 CSS 变量来存储每个标记的颜色。它具有更好的性能和更小的包体积。

把 `codeToHtml` 中的 `theme` 配置项改为对象形式，并使用 `light` 和 `dark` 键来生成两个主题。

```js {4}
import { getHighlighter } from 'shikiji'

const shiki = await getHighlighter({
  themes: ['nord', 'min-light'],
  langs: ['javascript'],
})

const code = shiki.codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: {
    light: 'min-light',
    dark: 'nord',
  }
})
```

下面的 HTML 将会被生成（[演示预览](https://htmlpreview.github.io/?https://raw.githubusercontent.com/antfu/shikiji/main/packages/shikiji/test/out/dual-themes.html)）：

```html
<pre
  class="shiki shiki-themes min-light nord"
  style="background-color:#ffffff;--shiki-dark-bg:#2e3440ff;color:#24292eff;--shiki-dark:#d8dee9ff"
  tabindex="0"
>
  <code>
    <span class="line">
      <span style="color:#1976D2;--shiki-dark:#D8DEE9">console</span>
      <span style="color:#6F42C1;--shiki-dark:#ECEFF4">.</span>
      <span style="color:#6F42C1;--shiki-dark:#88C0D0">log</span>
      <span style="color:#24292EFF;--shiki-dark:#D8DEE9FF">(</span>
      <span style="color:#22863A;--shiki-dark:#ECEFF4">"</span>
      <span style="color:#22863A;--shiki-dark:#A3BE8C">hello</span>
      <span style="color:#22863A;--shiki-dark:#ECEFF4">"</span>
      <span style="color:#24292EFF;--shiki-dark:#D8DEE9FF">)</span>
      </span>
    </code>
</pre>
```

若要把您的网站主题变成响应式，您需要添加一段 CSS 代码：

## 基于媒体查询的深色模式

```css
@media (prefers-color-scheme: dark) {
  .shiki,
  .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* Optional, if you also want font styles */
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
}
```

## 基于类名的深色模式

```css
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  /* Optional, if you also want font styles */
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
```

## 多个主题

它也支持多个主题。在 `themes` 对象中，您可以有任意数量的主题，并使用 `defaultColor` 选项指定默认主题。

```js
const code = shiki.codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: {
    light: 'github-light',
    dark: 'github-dark',
    dim: 'github-dimmed',
    // any number of themes
  },

  // optional customizations
  defaultColor: 'light',
  cssVariablePrefix: '--shiki-'
})
```

token 会被生成为：

```html
<span style="color:#1976D2;--shiki-dark:#D8DEE9;--shiki-dim:#566575">console</span>
```

然后更新您的 CSS 代码来控制每个主题的生效时机。下面是一个例子：
[Demo preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/antfu/shikiji/main/packages/shikiji/test/out/multiple-themes.html)

### 不使用默认颜色

如果您想完全控制颜色，或者避免使用 `!important` 来覆盖，您可以通过将 `defaultColor` 设置为 `false` 来禁用默认颜色。

```js {7}
const code = shiki.codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  },
  defaultColor: false, // <--
})
```

这样，一个 token 将会被生成为：

```html
<span style="--shiki-dark:#D8DEE9;--shiki-light:#2E3440">console</span>
```

这个时候，生成的 HTML 将不会有任何样式，您需要添加自己的 CSS 代码来控制颜色。

它也可以通过 CSS 变量来控制主题。更多内容，请参考 [@mayank99](https://github.com/mayank99) 在 [issue #6](https://github.com/antfu/shikiji/issues/6)。

## 自定义语言别名

您可以通过 `langAlias` 选项来注册自定义语言别名。例如：

```js {6,10}
import { getHighlighter } from 'shikiji'

const shiki = await getHighlighter({
  langs: ['javascript'],
  langAlias: {
    mylang: 'javascript',
  },
})

const code = shiki.codeToHtml('const a = 1', { lang: 'mylang' })
```
