---
outline: deep
---

# rehype-shikiji

<Badges name="rehype-shikiji" />

Shikiji 插件 [rehype](https://github.com/rehypejs/rehype)。

## 安装

```bash
npm i -D rehype-shikiji
```

## 用法

```ts
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShikiji from 'rehype-shikiji'
import { expect, test } from 'vitest'

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShikiji, {
    // or `theme` for a single theme
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }
  })
  .use(rehypeStringify)
  .process(await fs.readFile('./input.md'))
```

## 特性

### 高亮行

除了 `shikiji` 的特性，这个插件还支持高亮行。您可以在语言名后面加上 `{1,3-4}` 来高亮指定的行。例如：

````md
# Hello World

```js {1,3-4}
console.log('line1') // highlighted
console.log('line2')
console.log('line3') // highlighted
console.log('line4') // highlighted
```
````

预览效果：

```js {1,3-4}
console.log('line1') // highlighted
console.log('line2')
console.log('line3') // highlighted
console.log('line4') // highlighted
```
