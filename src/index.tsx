import React from "react"
import ReactDOM from "react-dom"
import "./theming/styled-hook"
import { IndexPage } from "./components/pages"
import { GlobalStyles } from "./global-styles"
import { connector } from "./business/blockchain"
import { ThemingProvider } from "./theming/provider"

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemingProvider>
      <IndexPage connector={connector} />
    </ThemingProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)
