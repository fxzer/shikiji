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
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="class-demo">
    <button @click="toggleDark()">
      类名切换亮暗
    </button>
    <div v-html="code" />
  </div>
</template>

<style>
html.dark .class-demo .shiki,
html.dark .class-demo .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}
</style>
