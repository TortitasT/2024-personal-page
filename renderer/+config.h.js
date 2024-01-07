import vercelConfig from '@vite-plugin-vercel/vike/config'

export default {
  // See https://vike.dev/data-fetching
  passToClient: ['pageProps', 'urlPathname', 'routeParams'],
  extends: vercelConfig,
}
