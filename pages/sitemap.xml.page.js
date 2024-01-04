export { render }

import { dangerouslySkipEscape } from 'vike'

function render(pageContext) {
  console.log('pageContext', pageContext)

  const pages = pageContext._pageRoutes.map((page) => {
    return `
      <url>
        <loc>https://2024-personal-page.vercel.app${page.pageId}</loc>
        <lastmod>2024-01-04T11:14:12+00:00</lastmod>
        <priority>0.80</priority>
      </url>
    `
  })

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.join('')}
    </urlset>
  `

  const headers = {
    'Content-Type': 'application/xml',
  }

  return {
    headers,
    body: dangerouslySkipEscape(sitemap),
  }
}
