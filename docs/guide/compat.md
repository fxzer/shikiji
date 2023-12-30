---
outline: deep
---

# 兼容性构建

我们利用重写的机会做了一些我们认为对未来有益的重大更改。我们建议您尝试尽可能迁移这些更改，因为它们中的大多数都应该很简单。如果您有非常深入的集成，可以尝试我们的兼容性构建，该构建与 `shiki` 的当前 API 更加一致。

## 安装 `shikiji-compat`

<Badges name="shikiji-compat" />

设置 `package.json` 中的 `shiki` 别名：

```json
{
  "dependencies": {
    "shiki": "npm:shikiji-compat@0.9"
  }
}
```

## 与 Shiki 的 突破性变更

在 [`shiki@0.14.3`](https://github.com/shikijs/shiki/releases/tag/v0.14.3)，Shiiki 和 Shikiji 之间的中断性变更有：

### 硬性变更

变更应用于 `shikiji` 和 `shikiji-compat`：

- CJS 和 IIFE 版本将被删除。有关详细信息，请参阅 [CJS 用法](#cjs-usage) 和 [CDN 用法](#cdn-usage)。
- `codeToHtml` 内部使用 [`hast`](https://github.com/syntax-tree/hast) 。生成的 HTML 会略有不同，但行为应该相同。
- `css-variables` 主题不再支持， 请改用[双主题](#lightdark-dual-themes)，或者在[主题色](/guide/theme-colors)了解更多处理方式。

### 软性变更

突破性变更适用于shikiji，并由 shikiji 补充：

- 删除不再需要的顶级具名导出 `setCDN`, `loadLanguage`, `loadTheme`, `setWasm` .
- `BUNDLED_LANGUAGES`、 `BUNDLED_THEMES` 分别移至 `shikiji/langs` 、 `shikiji/themes` ，并分别重命名为 `bundledLanguages` 、 `bundledThemes` 。
- `getHighlighter`的 `theme` 选项被删除，改用数组的 `themes` 选项。
- 高亮器不再维护内部默认主题上下文。 `theme` 选项的 `codeToHtml` 和 `codeToThemedTokens` 是必传的。
- `codeToThemedTokens` 默认把 `includeExplanation` 设为 `false`。
- `.ansiToHtml` 作为特殊语言 `ansi` 合并到 `.codeToHtml` 。请改用 `.codeToHtml(code, { lang: 'ansi' })` 。
- `lineOptions` 被删除，改用完全可自定义的 `transforms` 选项。
- # `LanguageRegistration` 的 `grammar` 字段被展开到 `LanguageRegistration` 本身，有关更多详细信息，请参阅类型。
- Top-level named export `setCDN`, `loadLanguage`, `loadTheme`, `setWasm` are dropped as they are not needed anymore.
- `BUNDLED_LANGUAGES`, `BUNDLED_THEMES` are moved to `shikiji/langs` and `shikiji/themes` and renamed to `bundledLanguages` and `bundledThemes` respectively.
- `theme` option for `getHighlighter` is dropped, use `themes` with an array instead.
- Highlighter does not maintain an internal default theme context. `theme` option is required for `codeToHtml` and `codeToThemedTokens`.
