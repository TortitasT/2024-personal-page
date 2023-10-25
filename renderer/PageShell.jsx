import { PageContextProvider } from "./usePageContext";
import "./PageShell.css";
import { Component, render } from "preact";
import { CursorFluidShader } from "../components/CursorFluidShader.jsx";

export { PageShell };

function PageShell({ pageContext, children }) {
  return (
    <PageContextProvider pageContext={pageContext}>
      <CursorFluidShader />
      {children}
    </PageContextProvider>
  );
}
