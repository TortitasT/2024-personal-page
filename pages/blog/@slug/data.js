import { render as vikeRender } from 'vike/abort'
import render from 'preact-render-to-string'
import { h } from 'preact'

export async function data(pageContext) {
  try {
    const {
      routeParams: { slug },
    } = pageContext

    const mdx = await import(`../../../blog/${slug}.mdx`)
    const postHtml = render(h(mdx.default))

    return {
      post: {
        title: mdx.frontmatter.title,
        description: mdx.frontmatter.description,
        date: new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'full',
          timeZone: 'Australia/Sydney',
        }).format(new Date(mdx.frontmatter.date)),
        slug,
        html: postHtml,
      },
    }
  } catch (error) {
    console.error(error)
    throw vikeRender(404, 'Blog post not found')
  }
}
