import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { transformerTwoSlash } from 'shikiji-twoslash'
import { bundledThemes } from 'shikiji'
import { version } from '../../package.json'
import vite from './vite.config'
import { rendererFloatingVue } from './render-floating-vue'

const GUIDES: DefaultTheme.NavItemWithLink[] = [
  { text: '开始使用', link: '/guide/' },
  { text: '安装', link: '/guide/install' },
  { text: '简写形式', link: '/guide/shorthands' },
  { text: '构建', link: '/guide/bundles' },
  { text: '双主题', link: '/guide/dual-themes' },
  { text: '转换器', link: '/guide/transformers' },
  { text: '兼容性构建', link: '/guide/compat' },
  { text: '自定义主题', link: '/guide/load-theme' },
  { text: '自定义语言', link: '/guide/load-lang' },
]

const REFERENCES: DefaultTheme.NavItemWithLink[] = [
  { text: '主题', link: '/themes' },
  { text: '语言', link: '/languages' },
]

const INTEGRATIONS: DefaultTheme.NavItemWithLink[] = [
  { text: 'Common Transformers', link: '/packages/transformers' },
  { text: 'TypeScript TwoSlash', link: '/packages/twoslash' },
  { text: 'Markdown It', link: '/packages/markdown-it' },
  { text: 'Rehype', link: '/packages/rehype' },
  { text: 'Monaco Editor', link: '/packages/monaco' },
  { text: 'CLI', link: '/packages/cli' },
]

const VERSIONS: DefaultTheme.NavItemWithLink[] = [
  { text: `v${version} (当前)`, link: '/' },
  { text: `版本发布`, link: 'https://github.com/antfu/shikiji/releases' },
  { text: `贡献`, link: 'https://github.com/antfu/shikiji/blob/docs-zh/CONTRIBUTING.md' },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Shikiji',
  description: 'A beautiful and powerful syntax highlighter',
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    async shikijiSetup(shikiji) {
      await Promise.all(Object.keys(bundledThemes).map(async (theme) => {
        await shikiji.loadTheme(theme as any)
      }))
    },
    codeTransformers: [
      transformerTwoSlash({
        explicitTrigger: true,
        renderer: rendererFloatingVue,
      }),
      // HAST treat `template` element specially and ignore its children
      // We need to render it as `vue-template` and use postprocess to replace it back
      {
        postprocess(code) {
          return code
            .replace(/(<\/?)vue-template/g, '$1template')
        },
      },
      {
        // Render custom themes with codeblocks
        name: 'shikiji:inline-theme',
        preprocess(code, options) {
          const reg = /\btheme:([\w,-]+)\b/
          const match = options.meta?.__raw?.match(reg)
          if (!match?.[1])
            return
          const theme = match[1]
          const themes = theme.split(',').map(i => i.trim())
          if (!themes.length)
            return
          if (themes.length === 1) {
            // @ts-expect-error anyway
            delete options.themes
            // @ts-expect-error anyway
            options.theme = themes[0]
          }
          else if (themes.length === 2) {
            // @ts-expect-error anyway
            delete options.theme
            // @ts-expect-error anyway
            options.themes = {
              light: themes[0],
              dark: themes[1],
            }
          }
          else {
            throw new Error(`Only 1 or 2 themes are supported, got ${themes.length}`)
          }
          return code
        },
      },
      {
        name: 'shikiji:vitepress-patch',
        preprocess(_, options) {
          const cleanup = options.transformers?.find(i => i.name === 'vitepress:clean-up')
          if (cleanup)
            options.transformers?.splice(options.transformers.indexOf(cleanup), 1)

          // Disable v-pre for twoslash, because we need render it with FloatingVue
          if (options.meta?.__raw?.includes('twoslash')) {
            const vPre = options.transformers?.find(i => i.name === 'vitepress:v-pre')
            if (vPre)
              options.transformers?.splice(options.transformers.indexOf(vPre), 1)
          }
        },
      },
      {
        name: 'shikiji:remove-escape',
        postprocess(code) {
          return code.replace(/\[\\\!code/g, '[!code')
        },
      },
    ],
  },

  cleanUrls: true,
  vite,
  themeConfig: {
    logo: '/logo.svg',
    outline: 'deep', // 侧边栏深度:数字或者deep
    outlineTitle: '文章目录',
    lastUpdatedText: '上次更新',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题切换',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    nav: [
      {
        text: '引导',
        items: [
          {
            items: GUIDES,
          },
        ],
      },
      {
        text: '集成',
        items: INTEGRATIONS,
      },
      {
        text: '参考',
        items: REFERENCES,
      },
      // {
      //   text: 'Play',
      //   link: '/play',
      // },
      {
        text: `v${version}`,
        items: VERSIONS,
      },
    ],

    sidebar: Object.assign(
      {},
      {
        '/': [
          {
            text: '引导',
            items: GUIDES,
          },
          {
            text: '集成',
            items: INTEGRATIONS,
          },
          {
            text: '参考',
            items: REFERENCES,
          },
        ],
      },
    ),

    editLink: {
      pattern: 'https://github.com/fxzer/shikiji/edit/docs-zh/docs/:path',
      text: '本页修改建议',
    },
    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fxzer/shikiji' },
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/fxzer/shikiji/blob/master/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/fxzer">fxzer</a>.',
    },
  },

  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Pine Wu, Anthony Fu' }],
    ['meta', { property: 'og:title', content: 'Shikiji' }],
    ['meta', { property: 'og:image', content: 'https://shikiji.netlify.app/og.png' }],
    ['meta', { property: 'og:description', content: 'A beautiful and powerful syntax highlighter' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://shikiji.netlify.app/og.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],
})
