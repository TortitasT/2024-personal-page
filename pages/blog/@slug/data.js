import { render as vikeRender } from 'vike/abort'
import render from 'preact-render-to-string'
import { h } from 'preact'
import { read } from 'to-vfile'
import { matter } from 'vfile-matter'

export async function data(pageContext) {
  try {
    const {
      routeParams: { slug },
    } = pageContext

    const path = `blog/${slug}.mdx`
    const file = await read(path)
    matter(file)

    console.log(file)

    const mdx = await import(`../../../blog/${slug}.mdx`)
    const postHtml = render(h(mdx.default))

    return {
      post: {
        title: file.data.matter.title,
        description: file.data.matter.description,
        date: file.data.matter.date,
        slug,
        html: postHtml,
      },
    }
  } catch (error) {
    console.error(error)
    throw vikeRender(404, 'Blog post not found')
  }
}
