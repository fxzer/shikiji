# 加载自定义语言

查看 [所有内置语言](/languages)。

您可以通过将 TextMate 语法对象传递到 `langs`数组中来加载自定义语言。

```ts twoslash
// @noErrors
import { getHighlighter } from 'shikiji'

const myLang = JSON.parse(fs.readFileSync('my-lang.json', 'utf8'))

const highlighter = await getHighlighter({
  langs: [myLang]
})

const html = highlighter.codeToHtml(code, {
  lang: 'my-lang',
})
```

您也可以在创建高亮器后加载语言。

```ts {7} twoslash
// @noErrors
import { getHighlighter } from 'shikiji'

const myLang = JSON.parse(fs.readFileSync('my-lang.json', 'utf8'))

const highlighter = await getHighlighter()

await highlighter.loadLanguage(myLang) // <--

const html = highlighter.codeToHtml(code, {
  lang: 'my-lang',
})
```

## 从 Shiki 迁移

由于 `shikiji` 所运行环境未知，这意味着我们无法访问文件系统，这意味着 `shiki` 所支持 `path` 属性在 `shikiji` 中不可用。代替的是，您需要自行读取它们并以对象形式传递。例如:

```ts {6,7}
const highlighter = await getHighlighter({
  langs: [
    {
      name: 'vue-vine',
      scopeName: 'source.vue-vine',
      // ‼️ This would not work!
      path: join(__dirname, './vine-ts.tmLanguage.json'),
      embeddedLangs: [
        'vue-html',
        'css',
        'scss',
        'sass',
        'less',
        'stylus',
      ],
    },
  ]
})
```

取而代之的是，您可以自行加载该文件（通过 `fs`，`import()`，`fetch()` 等）并传递对象:

```ts
const vineGrammar = JSON.parse(fs.readFileSync(join(__dirname, './vine-ts.tmLanguage.json'), 'utf8'))

const highlighter = await getHighlighter({
  langs: [
    {
      name: 'vue-vine',
      scopeName: 'source.vue-vine',
      embeddedLangs: [
        'vue-html',
        'css',
        'scss',
        'sass',
        'less',
        'stylus',
      ],
      ...vineGrammar
    },
  ]
})
```
