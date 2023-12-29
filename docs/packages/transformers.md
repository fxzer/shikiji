# shikiji-transformers

<Badges name="shikiji-transformers" />

Shikiji 的常用转换器集合，灵感来自 [shiki-processor](https://github.com/innocenzi/shiki-processor)

## 安装

```bash
npm i -D shikiji-transformers
```

```ts
import {
  codeToHtml,
} from 'shikiji'
import {
  transformerNotationDiff,
  // ...
} from 'shikiji-transformers'

const html = codeToHtml(code, {
  lang: 'ts',
  transformers: [
    transformerNotationDiff(),
    // ...
  ],
})
```

## 转换器

### `transformerNotationDiff`

用 `[!code ++]` 和 `[!code --]` 来标记增加和删除的行。例如，下面的代码

````md
```ts
export function foo() {
  console.log('hewwo') // [\!code --]
  console.log('hello') // [\!code ++]
}
```
````

将会被渲染成

```ts
export function foo() {
  console.log('hewwo') // [!code --]
  console.log('hello') // [!code ++]
}
```

```html
<!-- Output (stripped of `style` attributes for clarity) -->
<pre class="shiki has-diff"> <!-- Notice `has-diff` -->
  <code>
    <span class="line"></span>
    <span class="line"><span>function</span><span>()</span><span></span><span>{</span></span>
    <span class="line diff remove">  <!-- Notice `diff` and `remove` -->
      <span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>&#39;</span><span>hewwo</span><span>&#39;</span><span>) </span>
    </span>
    <span class="line diff add">  <!-- Notice `diff` and `add` -->
      <span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>&#39;</span><span>hello</span><span>&#39;</span><span>) </span>
    </span>
    <span class="line"><span></span><span>}</span></span>
    <span class="line"><span></span></span>
  </code>
</pre>
```

### `transformerNotationHighlight` 差异标记

使用 `[!code highlight]` 突出显示一行（将被添加 highlighted 类名）。

```ts
export function foo() {
  console.log('Highlighted') // [!code highlight]
}
```

### `transformerNotationFocus` 聚焦标记

使用 `[!code focus]` 聚焦一行 （将被添加 focused 类名）

```ts
export function foo() {
  console.log('Focused') // [!code focus]
}
```

### `transformerNotationErrorLevel` 错误标记

使用 `[!code error]`, `[!code warning]` 来标记一行的错误等级（将被添加 `highlighted error`, `highlighted warning` 类名）。

```ts
export function foo() {
  console.error('Error') // [!code error]
  console.warn('Warning') // [!code warning]
}
```

### `transformerRenderWhitespace` 空白渲染

渲染空格（tab 和空格）为单独的 span，带有 `tab` 和 `space` 类名。

使用一些 CSS，您可以让它看起来像这样：
<img width="293" alt="image" src="https://github.com/antfu/shikiji/assets/11247099/01b7c4ba-6d63-4e74-8fd7-68a9f901f3de">

### `transformerCompactLineOptions`

`shiki` 支持的 `lineOptions`，这在 `shikiji` 中被移除了。

### `transformerRemoveLineBreak`

移除 `<span class="line">` 之间的换行符。当您在 CSS 中设置 `.line` 的 `display: block` 时很有用。
