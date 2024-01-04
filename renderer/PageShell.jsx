import { PageContextProvider } from './usePageContext'
import './main.css'
import { Component, render } from 'preact'
import { Menu } from '../components/Menu.jsx'

export { PageShell }

function PageShell({ pageContext, children }) {
  return (
    <PageContextProvider pageContext={pageContext}>
      <Menu />
      {children}
    </PageContextProvider>
  )
}
