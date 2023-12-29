import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
      // 导入目标文件类型
        /\.[tj]s(x|on)?$/, // .ts, .tsx, .js, .jsx .json
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
      // 预定义
        'vue', // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        '@vueuse/core',
      ],
      dts: true, // 方案二:生成自动导入的auto-imports.d.ts声明文件, 解决 '找不到名称“Elxxx”' 报错
    }),
  ],
})
