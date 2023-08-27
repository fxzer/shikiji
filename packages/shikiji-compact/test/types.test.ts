import { expect, expectTypeOf, test } from 'vitest'
import * as shiki from 'shiki'
import * as shikiji from '../src/index'

test('run', async () => {
  const s = await shiki.getHighlighter({
    theme: 'nord',
    langs: ['javascript'],
  })

  const sj = await shikiji.getHighlighter({
    theme: 'nord',
    langs: ['javascript'],
  })

  const group = [s, sj]

  expect(s.getLoadedThemes()).toEqual(sj.getLoadedThemes())
  expect(s.getLoadedLanguages()).toEqual(sj.getLoadedLanguages())

  expectTypeOf(s.codeToHtml).toMatchTypeOf(sj.codeToHtml)

  expect(sj.codeToThemedTokens('const a = 1', 'javascript'))
    .toEqual(s.codeToThemedTokens('const a = 1', 'javascript'))

  group.forEach((h) => {
    h.codeToHtml('const a = 1', 'javascript')
    h.codeToHtml('const a = 1', 'javascript', 'nord')
  })

  s.codeToHtml('const a = 1', { lang: 'javascript' })
  sj.codeToHtml('const a = 1', { lang: 'javascript' })

  s.ansiToHtml('const a = 1', { theme: 'nord' })
  sj.ansiToHtml('const a = 1', { theme: 'nord' })

  const shikiKeys = Object.keys(s)
  const shikijiKeys = Object.keys(sj)
  const keysDiff = shikiKeys.filter(k => !shikijiKeys.includes(k))

  expect.soft(keysDiff).toMatchInlineSnapshot(`
    [
      "ansiToThemedTokens",
      "getTheme",
      "getBackgroundColor",
      "getForegroundColor",
      "setColorReplacements",
    ]
  `)

  const shikiExports = Object.keys(shiki)
  const shikijiExports = Object.keys(shikiji)
  const exportsDiff = shikiExports.filter(k => !shikijiExports.includes(k))

  expect.soft(exportsDiff).toMatchInlineSnapshot(`
    [
      "FontStyle",
      "default",
      "loadTheme",
      "renderToHtml",
      "toShikiTheme",
    ]
  `)
})