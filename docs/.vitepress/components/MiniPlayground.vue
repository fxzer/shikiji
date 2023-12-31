<script setup lang='ts'>
import { computed, ref } from 'vue'

import { usePlayground } from '../store/playground'

const play = usePlayground()
const isFold = ref(true)
function toggleShow() {
  isFold.value = !isFold.value
}
const currentThemeType = computed(() => play.allThemes.find(i => i.id === play.theme)?.type || 'inherit')

function getThemesByType(type: 'light' | 'dark') {
  return play.allThemes.filter(i => i.type === type)
}

function isActive(id: string, value: string) {
  return id === value ? 'text-green font-semibold' : ''
}

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  play.input = target.value
}
</script>

<template>
  <div class="mini-playground" my-5 relative of-hidden :class="currentThemeType" group :style="[play.preStyle]">
    <!-- 主题和语言筛选 -->
    <div
      class="aside   bg-white/10 "
      absolute top-10 z-10 flex backdrop-blur-sm shadow-lg transition-all duration-200
      style="height: calc(100% - 40px);" :class="isFold ? '-translate-x-full' : 'translate-x-0'"
    >
      <div h-full>
        <input
          v-model.trim="play.langFilter"
          type="text" placeholder="搜索语言"
          class="search-input"
        >
        <ul of-auto class="my-0! py3 pb6" style="height: calc(100% - 40px);">
          <li
            v-for="lang in play.allLanguages" :key="lang.id" list-none cursor-pointer :title="lang.name"
            :class="isActive(lang.id, play.lang)" @click="play.lang = lang.id"
          >
            {{ lang.name }}
          </li>
        </ul>
      </div>
      <div h-full>
        <input
          v-model.trim="play.themeFilter"
          type="text" placeholder="搜索主题" class="search-input"
        >
        <ul h-full of-auto border="0 l-1 solid gray/20" class="!my-0 py3 pb6" style="height: calc(100% - 40px);">
          <li
            v-for="theme in getThemesByType('light')" :key="theme.id" list-none cursor-pointer :title="theme.displayName"
            :class="isActive(theme.id, play.theme)" @click="play.theme = theme.id"
          >
            {{ theme.displayName }}
          </li>
          <div border="0 b-1 solid green/50" my-3 class="-translate-x-3" />
          <li
            v-for="theme in getThemesByType('dark')" :key="theme.id" list-none cursor-pointer :title="theme.displayName"
            :class="theme.id === play.theme ? 'text-green font-semibold' : ''" @click="play.theme = theme.id"
          >
            {{ theme.displayName }}
          </li>
        </ul>
      </div>
    </div>

    <header px-3 h-10 flex items-center justify-between border="0 b-1 solid gray/20">
      <span text-gray mr-3 cursor-pointer @click="toggleShow">
        <i v-if="isFold" i-line-md-menu-fold-right inline-block />
        <i v-else i-line-md-menu-fold-left inline-block />
      </span>
      <div flex gap-10 text-xs>
        <span cursor-pointer @click="toggleShow">{{ play.langName }}</span>
        <span cursor-pointer @click="toggleShow">{{ play.themeName }}</span>
      </div>
      <div flex items-center gap-3>
        <div i-svg-spinners-3-dots-fade :class="play.isLoading ? 'op100' : 'op0'" flex-none transition-opacity />
        <div op50 text-xs mx-2>
          演练场
        </div>
        <button title="Randomize" hover="bg-gray/10" p1 rounded @click="play.randomize">
          <div i-carbon:shuffle op50 />
        </button>
      </div>
    </header>

    <!-- 输入和输出展示 -->
    <div grid="~ md:cols-2" style="height: calc(100% - 40px);">
      <textarea bg-transparent of-auto p-3 @input="handleInput" v-html="play.input" />
      <div class="output" border="0 l-1 solid gray/20" min-h-150 text-sm h-full v-html="play.output" />
    </div>
  </div>
</template>

<style>
.mini-playground .output pre {
  overflow: auto !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 10px !important;
}
.mini-playground ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.mini-playground ::-webkit-scrollbar-thumb:vertical {
  background-color: #cccccc5b;
  border-radius: 6px;
}
.mini-playground ::-webkit-scrollbar-thumb:horizontal {
  background-color: #cccccc5b;
  border-radius: 6px;
}
</style>

<style scoped>
.mini-playground {
  box-shadow: 0 0 3px #ddd;
}
</style>
