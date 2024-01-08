import { render } from 'vike/abort'
import posts from '../../blog/published.json'

export async function data(pageContext) {
  return {
    posts: posts.map((post) => ({
      ...post,
      date: new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full',
        timeZone: 'Australia/Sydney',
      }).format(new Date(post.date)),
    })),
  }
}
