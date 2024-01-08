export { render as onRenderHtml }

import { renderToString } from 'preact-render-to-string'
import { PageShell } from './PageShell'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'

async function render(pageContext) {
  const { Page, pageProps } = pageContext
  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
  if (!Page)
    throw new Error('My render() hook expects pageContext.Page to be defined')
  const pageHtml = renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )

  // See https://vike.dev/head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Víctor García'
  const desc =
    (documentProps && documentProps.description) ||
    'Developer, designer, and student from Spain.'

  const documentHtml = escapeInject`<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<link rel="icon" type="image/x-icon" href="/favicon.ico" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="color-scheme" content="light dark" />
			<meta name="description" content="${desc}" />
      <link rel="preload" href="/fonts/RobotoSlab-Bold.ttf" as="font" type="font/ttf" crossorigin />
      <link rel="preload" href="/fonts/RobotoSlab-Regular.ttf" as="font" type="font/ttf" crossorigin />
      <link rel="preload" href="/fonts/RobotoSlab-Light.ttf" as="font" type="font/ttf" crossorigin />
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-0GHN93VJVC"></script>
      <script>
        if (!window.navigator.userAgent.includes('Google Page Speed Insights')) {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-0GHN93VJVC');

        }

          window.addEventListener('load', () => {
            document.body.innerHTML = window.navigator.userAgent
          });
      </script>
			<title>${title}</title>
		</head>
		<body>
			<div id="app">${dangerouslySkipEscape(pageHtml)}</div>
		</body>
		</html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    },
  }
}
