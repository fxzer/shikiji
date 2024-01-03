import{_ as a}from"./chunks/MiniPlayground.vue_vue_type_style_index_0_lang.nz_SLxY4.js";import{_ as l,c as h,a as e,I as s,k as t,U as i,o as d}from"./chunks/framework.NBdjhPqr.js";import"./chunks/playground.rX_avCxg.js";import"./chunks/pinia.23Neb2sl.js";const C=JSON.parse('{"title":"Introduction","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/index.md","filePath":"guide/index.md"}'),o={name:"guide/index.md"},n=t("h1",{id:"introduction",tabindex:"-1"},[e("Introduction "),t("a",{class:"header-anchor",href:"#introduction","aria-label":'Permalink to "Introduction"'},"​")],-1),c=t("br",null,null,-1),g=t("span",{"text-xl":"","text-green":""},[t("b",null,[t("span",{"text-brand-yellow":""},"Shiki"),t("span",{"text-brand-red":""},"ji")]),e(),t("ruby",{"text-brand-yellow":""},[e("式"),t("rt",null,"shiki")]),t("ruby",{"text-brand-red":""},[e("辞"),t("rt",null,"ji")])],-1),u=t("p",null,"无需维护自定义正则表达式，无需维护自定义 CSS，无需维护自定义 HTML。随着 VS Code 中您喜欢的语言和主题的发展，语法突出显示也会发生变化。",-1),k=t("p",null,[e("Shikiji 是基于 "),t("a",{href:"https://github.com/shikijs/shiki",target:"_blank",rel:"noreferrer"},"Shiki"),e(" 用 ESM 语法重写，并有很多改进。 我们的目标是"),t("a",{href:"https://github.com/shikijs/shiki/issues/510",target:"_blank",rel:"noreferrer"},"将这个项目合并回 Shiki 作为里程碑式的更新"),e("。"),t("a",{href:"/shikiji/guide/compat"},"如果要迁移，则对 Shiki 和兼容性版本进行重大更改"),e("。")],-1),_=t("p",null,[e("关于这个名字， "),t("ruby",{"text-lg":"","text-brand-yellow":""},[e("式"),t("rt",null,"shiki")]),t("ruby",{"text-lg":"","text-brand-red":""},[e("辞"),t("rt",null,"ji")]),e(" 是一个日语单词，"),t("a",{href:"https://jisho.org/word/%E5%BC%8F%E8%BE%9E",target:"_blank",rel:"noreferrer"},"礼仪致辞"),e("的意思。 "),t("ruby",{"text-brand-yellow":"","text-lg":""},[e("式"),t("rt",null,"shiki")]),e(" 继承自 "),t("a",{href:"https://github.com/shikijs/shiki",target:"_blank",rel:"noreferrer"},"shiki"),e(" 意思是 "),t("a",{href:"https://jisho.org/word/%E5%BC%8F",target:"_blank",rel:"noreferrer"},"“风格“"),e(" ， "),t("ruby",{"text-brand-red":"","text-lg":""},[e("辞"),t("rt",null,"ji")]),e(" 的意思是 "),t("a",{href:"https://jisho.org/word/%E8%BE%9E",target:"_blank",rel:"noreferrer"},"“字“"),e(".")],-1),b=i('<p>哦，顺便说一句，正如您所期望的那样，本文档中的代码块由 Shikiji 突出显示 :)</p><h2 id="特性" tabindex="-1">特性 <a class="header-anchor" href="#特性" aria-label="Permalink to &quot;特性&quot;">​</a></h2><ul><li>所有语法/主题/wasm 作为纯 ESM，不再有 <a href="https://github.com/shikijs/shiki#specify-a-custom-root-directory" target="_blank" rel="noreferrer">CDN</a>，不再有<a href="https://github.com/shikijs/shiki#specify-how-to-load-webassembly" target="_blank" rel="noreferrer">assets</a>。</li><li>便携式。不依赖于 Node.js API 或文件系统，适用于任何现代 JavaScript 运行时。</li><li>仅限 ESM (<a href="/shikiji/guide/install#cdn-usage">CDN 用法</a>, <a href="/shikiji/guide/install#cjs-usage">CJS 用法</a>)</li><li><a href="/shikiji/guide/install#fine-grained-bundle">组合式捆绑语言/主题</a></li><li><a href="/shikiji/guide/dual-themes">浅色/深色主题支持</a></li><li><a href="/shikiji/guide/transformers">基于 AST 的转换器插件</a></li><li><a href="/shikiji/guide/transformers#codetohast">支持 <code>hast</code></a></li><li><a href="/shikiji/packages/twoslash">TypeScript TwoSlash</a> 支持（TS 编译语法提示）</li><li><a href="/shikiji/guide/compat">与 Shiki 兼容的构建</a></li></ul><h2 id="演练场" tabindex="-1">演练场 <a class="header-anchor" href="#演练场" aria-label="Permalink to &quot;演练场&quot;">​</a></h2><p>这里有一个小游乐场，供您尝试 Shikiji 如何高亮展示您的代码。与在生成时运行的其他代码块不同，此 演练场在浏览器的客户端呈现。主题和语言是按需加载的。</p>',5),f=i('<p><a href="/shikiji/guide/install">安装 Shikiji</a> 在您的项目中使用它。</p><h2 id="谁正在用" tabindex="-1">谁正在用？ <a class="header-anchor" href="#谁正在用" aria-label="Permalink to &quot;谁正在用？&quot;">​</a></h2><p>依赖于 Shikiji 的项目（按字母顺序排序）：</p><ul><li><a href="https://docs.astro.build/en/guides/markdown-content/#syntax-highlighting" target="_blank" rel="noreferrer">Astro</a></li><li><a href="https://github.com/lobehub/lobe-ui" target="_blank" rel="noreferrer">Lobe UI</a></li><li><a href="https://content.nuxt.com/usage/markdown#code-highlighting" target="_blank" rel="noreferrer">Nuxt Content</a></li><li><a href="https://sli.dev/custom/highlighters.html#highlighters" target="_blank" rel="noreferrer">Slidev</a></li><li><a href="https://vitepress.dev/guide/markdown#syntax-highlighting-in-code-blocks" target="_blank" rel="noreferrer">VitePress</a></li></ul><h2 id="捆绑包大小" tabindex="-1">捆绑包大小 <a class="header-anchor" href="#捆绑包大小" aria-label="Permalink to &quot;捆绑包大小&quot;">​</a></h2><p>您可以在 <a href="https://pkg-size.dev/shikiji" target="_blank" rel="noreferrer">pkg-size.dev/shikiji</a> 上查看详细捆绑包大小。 截至 <code>v0.9.11</code> 2023 年 12 月 21 日：</p><table><thead><tr><th>包</th><th style="text-align:right;">体积 (压缩)</th><th style="text-align:right;">体积 (gzip)</th><th>说明</th></tr></thead><tbody><tr><td><code>shikiji</code></td><td style="text-align:right;">6.4 MB</td><td style="text-align:right;">1.2 MB</td><td>所有主题和语言作为异步块</td></tr><tr><td><code>shikiji/bundle/full</code></td><td style="text-align:right;">6.4 MB</td><td style="text-align:right;">1.2 MB</td><td>同上 <code>shikiji</code></td></tr><tr><td><code>shikiji/bundle/web</code></td><td style="text-align:right;">3.8 MB</td><td style="text-align:right;">695 KB</td><td>所有主题和常见的 Web 语言都作为异步块</td></tr><tr><td><code>shikiji/core</code></td><td style="text-align:right;">100 KB</td><td style="text-align:right;">31 KB</td><td>没有任何主题或语言的核心引擎，自行编写</td></tr><tr><td><code>shikiji/wasm</code></td><td style="text-align:right;">623 KB</td><td style="text-align:right;">231 KB</td><td>WASM 二进制文件内联为 base64 字符串</td></tr></tbody></table>',7);function p(x,m,j,S,y,T){const r=a;return d(),h("div",null,[n,c,g,e(" 是一个基于 TextMate 语法和主题的漂亮而强大的语法高亮器，与 VS Code 的语法高亮引擎相同。为几乎所有主流编程语言提供非常准确和快速的语法高亮。 "),u,k,_,b,s(r),f])}const M=l(o,[["render",p]]);export{C as __pageData,M as default};
