import React from "react"
import ReactDOM from "react-dom"
import { IndexPage } from "./components/pages"
import { GlobalStyles } from "./global-styles"
import { connector } from "./business/blockchain"

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <IndexPage connector={connector} />
  </React.StrictMode>,
  document.getElementById("root"),
)
