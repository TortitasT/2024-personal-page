export { Page }

import { useEffect, useState } from 'preact/hooks'
import { usePageContext } from '../../../renderer/usePageContext.jsx'
import { Footer } from '../../../components/Footer.jsx'

function Page() {
  const {
    routeParams: { slug },
    data: { mdx },
  } = usePageContext()

  return (
    <>
      <main className="max-w-[800px] mx-auto">
        <article className="mdx pl-4 pr-4 mb-4">
          {mdx && <mdx.default />}
        </article>
        <Footer />
      </main>
    </>
  )
}
