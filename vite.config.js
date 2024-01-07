import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import ssr from 'vike/plugin'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeExternalLinks from 'rehype-external-links'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    ssr({ prerender: true }),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
      jsxImportSource: 'preact',
    }),
  ],
})
