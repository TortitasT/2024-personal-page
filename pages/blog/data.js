import { render } from 'vike/abort'

export async function data(pageContext) {
  const posts = pageContext.import.meta.glob('../../../blog/*.mdx')

  const postsData = await Promise.all(
    Object.entries(posts).map(async ([path, post]) => {
      const { metadata } = await post()
      return {
        title: metadata.title,
        path,
      }
    })
  )

  return {
    posts: postsData,
  }
}
