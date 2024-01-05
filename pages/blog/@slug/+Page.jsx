export { Page }

import { useEffect, useState } from 'preact/hooks'
import { usePageContext } from '../../../renderer/usePageContext.jsx'

function Page() {
  const {
    routeParams: { slug },
  } = usePageContext()
  const [mdx, setMdx] = useState(null)

  useEffect(async () => {
    const mdx = await import(`../../../blog/${slug}.mdx`)
    setMdx(mdx)
  })

  return <article className="mdx">{mdx && <mdx.default />}</article>
}
