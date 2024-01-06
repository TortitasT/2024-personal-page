export { Page }

import { usePageContext } from '../../renderer/usePageContext.jsx'
import { Footer } from '../../components/Footer.jsx'

function Page() {
  const {
    data: { posts },
  } = usePageContext()

  return (
    <main className="max-w-[800px] mx-auto">
      <h1>Blog</h1>

      <ul>
        {posts.map((post) => (
          <li>
            <a href={post.path}>{post.title}</a>
          </li>
        ))}
      </ul>

      <Footer />
    </main>
  )
}
