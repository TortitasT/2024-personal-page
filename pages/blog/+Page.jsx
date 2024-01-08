export { Page }

import { usePageContext } from '../../renderer/usePageContext.jsx'
import { Footer } from '../../components/Footer.jsx'

function Page() {
  const {
    data: { posts },
  } = usePageContext()

  return (
    <>
      <main className="p-4 sm:p-6 max-w-[800px] mx-auto">
        <h1>blog</h1>

        <div className="flex flex-col gap-4">
          {posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((post) => (
              <a href={`/blog/${post.slug}`} className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <h2>{post.title}</h2>
                  <p className="text-white/80 text-right">{post.date}</p>
                </div>
                <p className="text-sm text-white/80">{post.description}</p>
              </a>
            ))}
        </div>
      </main>
      <Footer className="max-w-[800px] w-full mx-auto" />
    </>
  )
}
