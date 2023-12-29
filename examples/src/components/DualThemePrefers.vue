<script setup lang='ts'>
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
  },
})
</script>

<template>
  <div class="prefer-demo">
    跟随系统：
    <div v-html="code" />
  </div>
</template>

<style>
@media (prefers-color-scheme: dark) {
  .prefer-demo .shiki,
  .prefer-demo .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
  }
}
</style>
