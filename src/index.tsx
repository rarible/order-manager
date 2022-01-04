import React from "react"
import ReactDOM from "react-dom"
import { IndexPage } from "./components/pages"
import { GlobalStyles } from "./global-styles"

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <IndexPage />
  </React.StrictMode>,
  document.getElementById("root"),
)
