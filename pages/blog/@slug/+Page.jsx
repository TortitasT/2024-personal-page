export { Page }

import { useEffect, useState } from 'preact/hooks'
import { usePageContext } from '../../../renderer/usePageContext.jsx'
import { Footer } from '../../../components/Footer.jsx'
import hljs from 'highlight.js/lib/common'

// https://github.com/highlightjs/highlight.js/tree/main/src/styles
import 'highlight.js/styles/github-dark.css'

function Page() {
  const {
    routeParams: { slug },
    data: { post },
  } = usePageContext()

  useEffect(() => {
    hljs.highlightAll()
  })

  return (
    <>
      <main className="mx-auto max-w-full md:max-w-screen-md p-4 sm:p-6 flex flex-col gap-4">
        <a href="/blog">← Back</a>

        <h1 className="text-3xl md:text-5xl mb-0">{post.title}</h1>
        <small className="text-white/80">{post.date}</small>

        <article
          className="mdx"
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></article>
      </main>
      <Footer className="mx-auto w-full max-w-screen-md" />
    </>
  )
}
