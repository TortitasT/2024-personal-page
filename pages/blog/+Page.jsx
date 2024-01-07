export { Page }

import { usePageContext } from '../../renderer/usePageContext.jsx'
import { Footer } from '../../components/Footer.jsx'

function Page() {
  const {
    data: { posts },
  } = usePageContext()

  return (
    <>
      <main className="max-w-[800px] mx-auto">
        <h1>Blog</h1>

        <ul>
          {posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((post) => (
              <li>
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </li>
            ))}
        </ul>
      </main>
      <Footer className="max-w-[800px] w-full mx-auto" />
    </>
  )
}
