import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import ssr from 'vike/plugin'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    ssr({ prerender: true }),
    mdx({
      remarkPlugins: [remarkFrontmatter],
      jsxImportSource: 'preact',
    }),
  ],
})
