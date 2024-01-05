import { render } from 'vike/abort'

export async function guard(pageContext) {
  try {
    const {
      routeParams: { slug },
    } = pageContext

    await import(`../../../blog/${slug}.mdx`)
  } catch (error) {
    throw render(404, 'Blog post not found')
  }
}
