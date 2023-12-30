# 转换器

Shikiji 使用 [`hast`](https://github.com/syntax-tree/hast)（一种 HTML 的 AST 格式）来处理结果并生成 HTML。

您可以提供自己的 `transformers` 通过操作 `hast` 树来自定义生成的 HTML。您可以传递自定义函数来修改不同类型节点的树。例如：

```ts twoslash
import { addClassToHast, codeToHtml } from 'shikiji'

const code = await codeToHtml('foo\bar', {
  lang: 'js',
  theme: 'vitesse-light',
  transformers: [
    {
      code(node) {
        addClassToHast(node, 'language-js')
      },
      line(node, line) {
        node.properties['data-line'] = line
        if ([1, 3, 4].includes(line))
          addClassToHast(node, 'highlight')
      },
      token(node, line, col) {
        node.properties['data-token'] = `token:${line}:${col}`
      },
    },
  ]
})
```

我们也提供了一些常见的转换器供您使用，有关更多详细信息，请查看 [`shikiji-transforms`](/packages/transformers) 。

## `codeToHast`

您也可以使用 `codeToHast` 得到中间的 `hast` 树，而不是将它们序列化为 HTML。您还可以进一步将 ast 集成到 [unified](https://github.com/unifiedjs) 生态系统中。

```js
const root = highlighter.codeToHast(
  'const a = 1',
  { lang: 'javascript', theme: 'nord' }
)

console.log(root)
```

<!-- eslint-skip -->

```ts
{
  type: 'root',
  children: [
    {
      type: 'element',
      tagName: 'pre',
      properties: {
        class: 'shiki vitesse-light',
        style: 'background-color:#ffffff;color:#393a34',
        tabindex: '0'
      },
      children: [
        {
          type: 'element',
          tagName: 'code',
          properties: {},
          children: [
            {
              type: 'element',
              tagName: 'span',
              properties: { class: 'line' },
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { style: 'color:#AB5959' },
                  children: [ { type: 'text', value: 'const' } ]
                },
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { style: 'color:#B07D48' },
                  children: [ { type: 'text', value: ' a' } ]
                },
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { style: 'color:#999999' },
                  children: [ { type: 'text', value: ' =' } ]
                },
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { style: 'color:#2F798A' },
                  children: [ { type: 'text', value: ' 1' } ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
