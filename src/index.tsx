import React from "react"
import ReactDOM from "react-dom"
import "./theming/styled-hook"
import ReactGA from "react-ga4"
import { Router } from "react-router"
import { IndexPage } from "./components/pages"
import { GlobalStyles } from "./global-styles"
import { history } from "./business/history"
import { connector } from "./business/blockchain"
import { ThemingProvider } from "./theming/provider"

ReactGA.initialize("G-81269FZ9H9")

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemingProvider>
      <Router history={history}>
        <IndexPage connector={connector} />
      </Router>
    </ThemingProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)
