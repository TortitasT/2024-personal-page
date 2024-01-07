import { render } from 'vike/abort'
import posts from '../../blog/published.json'

export async function data(pageContext) {
  return {
    posts,
  }
}
