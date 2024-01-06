import { render } from 'vike/abort'

export async function data(pageContext) {
  try {
    const {
      routeParams: { slug },
    } = pageContext

    const mdx = await import(`../../../blog/${slug}.mdx`)
    return {
      mdx,
    }
  } catch (error) {
    throw render(404, 'Blog post not found')
  }
}
