---
outline: deep
---

# Introduction

<br>

<span text-xl text-green>
<b><span text-brand-yellow>Shiki</span><span text-brand-red>ji</span></b> <ruby text-brand-yellow>式<rt>shiki</rt></ruby><ruby text-brand-red>辞<rt>ji</rt></ruby>
</span> 是一个基于 TextMate 语法和主题的漂亮而强大的语法高亮器，与 VS Code 的语法高亮引擎相同。为几乎所有主流编程语言提供非常准确和快速的语法高亮。

无需维护自定义正则表达式，无需维护自定义 CSS，无需维护自定义 HTML。随着 VS Code 中您喜欢的语言和主题的发展，语法突出显示也会发生变化。

Shikiji 是基于 [Shiki](https://github.com/shikijs/shiki) 用 ESM 语法重写，并有很多改进。 我们的目标是[将这个项目合并回 Shiki 作为里程碑式的更新](https://github.com/shikijs/shiki/issues/510)。[如果要迁移，则对 Shiki 和兼容性版本进行重大更改](/guide/compat)。

关于这个名字， <ruby text-lg text-brand-yellow>式<rt>shiki</rt></ruby><ruby text-lg text-brand-red>辞<rt>ji</rt></ruby> 是一个日语单词，[礼仪致辞](https://jisho.org/word/%E5%BC%8F%E8%BE%9E)的意思。 <ruby text-brand-yellow text-lg>式<rt>shiki</rt></ruby> 继承自 [shiki](https://github.com/shikijs/shiki) 意思是 [“风格“](https://jisho.org/word/%E5%BC%8F) ， <ruby text-brand-red text-lg>辞<rt>ji</rt></ruby> 的意思是 [“字“](https://jisho.org/word/%E8%BE%9E).

哦，顺便说一句，正如您所期望的那样，本文档中的代码块由 Shikiji 突出显示 \:)

## 特性

- 所有语法/主题/wasm 作为纯 ESM，不再有 [CDN](https://github.com/shikijs/shiki#specify-a-custom-root-directory)，不再有[assets](https://github.com/shikijs/shiki#specify-how-to-load-webassembly)。
- 便携式。不依赖于 Node.js API 或文件系统，适用于任何现代 JavaScript 运行时。
- 仅限 ESM ([CDN 用法](/guide/install#cdn-usage), [CJS 用法](/guide/install#cjs-usage))
- [组合式捆绑语言/主题](/guide/install#fine-grained-bundle)
- [浅色/深色主题支持](/guide/dual-themes)
- [基于 AST 的转换器插件](/guide/transformers)
- [支持 `hast` ](/guide/transformers#codetohast)
- [TypeScript TwoSlash](/packages/twoslash) 支持（TS 编译语法提示）
- [与 Shiki 兼容的构建](/guide/compat)

## 演练场

这里有一个小游乐场，供您尝试 Shikiji 如何高亮展示您的代码。与在生成时运行的其他代码块不同，此 演练场在浏览器的客户端呈现。主题和语言是按需加载的。

<MiniPlayground />

[安装 Shikiji](/guide/install) 在您的项目中使用它。

## 谁正在用？

依赖于 Shikiji 的项目（按字母顺序排序）：

- [Astro](https://docs.astro.build/en/guides/markdown-content/#syntax-highlighting)
- [Lobe UI](https://github.com/lobehub/lobe-ui)
- [Nuxt Content](https://content.nuxt.com/usage/markdown#code-highlighting)
- [Slidev](https://sli.dev/custom/highlighters.html#highlighters)
- [VitePress](https://vitepress.dev/guide/markdown#syntax-highlighting-in-code-blocks)

## 捆绑包大小

您可以在 [pkg-size.dev/shikiji](https://pkg-size.dev/shikiji) 上查看详细捆绑包大小。
截至 `v0.9.11` 2023 年 12 月 21 日：

| 包                    | 体积 (压缩) | 体积 (gzip) | 说明                                   |
| --------------------- | ----------: | ----------: | -------------------------------------- |
| `shikiji`             |      6.4 MB |      1.2 MB | 所有主题和语言作为异步块               |
| `shikiji/bundle/full` |      6.4 MB |      1.2 MB | 同上 `shikiji`                         |
| `shikiji/bundle/web`  |      3.8 MB |      695 KB | 所有主题和常见的 Web 语言都作为异步块  |
| `shikiji/core`        |      100 KB |       31 KB | 没有任何主题或语言的核心引擎，自行编写 |
| `shikiji/wasm`        |      623 KB |      231 KB | WASM 二进制文件内联为 base64 字符串    |
