import { PageContextProvider } from "./usePageContext";
import "./PageShell.css";
import { Component, render } from "preact";
import { CursorFluidShader } from "../components/CursorFluidShader.jsx";

export { PageShell };

function PageShell({ pageContext, children }) {
  return (
    <PageContextProvider pageContext={pageContext}>
      {/* <Header url={pageContext.urlPathname} /> */}
      <CursorFluidShader />
      <main className="flex-1 flex">{children}</main>
    </PageContextProvider>
  );
}

// export function Header({ url }) {
// 	return (
// 		<header>
// 			<nav>
// 				<a href="/" class={url == '/' && 'active'}>
// 					Home
// 				</a>
// 				<a href="/404" class={url == '/404' && 'active'}>
// 					404
// 				</a>
// 			</nav>
// 		</header>
// 	);
// }
