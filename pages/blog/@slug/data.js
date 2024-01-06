import { render as vikeRender } from 'vike/abort'
import render from 'preact-render-to-string'
import { h } from 'preact'

export async function data(pageContext) {
  try {
    const {
      routeParams: { slug },
    } = pageContext

    const postHtml = render(
      h((await import(`../../../blog/${slug}.mdx`)).default)
    )
    return {
      postHtml,
    }
  } catch (error) {
    console.error(error)
    throw vikeRender(404, 'Blog post not found')
  }
}
