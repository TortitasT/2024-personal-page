import { PageContextProvider } from "./usePageContext";
import "./main.css";
import { Component, render } from "preact";
import { CursorFluidShader } from "../components/CursorFluidShader.jsx";
import { Menu } from "../components/Menu.jsx";

export { PageShell };

function PageShell({ pageContext, children }) {
  return (
    <PageContextProvider pageContext={pageContext}>
      <Menu />
      <CursorFluidShader />
      {children}
    </PageContextProvider>
  );
}
