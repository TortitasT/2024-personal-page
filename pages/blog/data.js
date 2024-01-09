import { render } from 'vike/abort'

function dateToLangFormat(post) {
  return {
    ...post,
    date: new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'full',
      timeZone: 'Europe/Madrid',
    }).format(new Date(post.date)),
  }
}

function sortByDate(a, b) {
  return new Date(b.date) - new Date(a.date)
}

export async function data(pageContext) {
  const postsPromise = import.meta.glob('./../../blog/*.mdx')

  const posts = await Promise.all(
    Object.entries(postsPromise).map(async ([filename, promise]) => {
      const { default: Component, frontmatter } = await promise()

      return {
        slug: filename.replace('./../../blog/', '').replace('.mdx', ''),
        title: frontmatter.title,
        description: frontmatter.description,
        date: frontmatter.date,
      }
    })
  )

  return {
    posts: posts.map(dateToLangFormat).sort(sortByDate),
  }
}
