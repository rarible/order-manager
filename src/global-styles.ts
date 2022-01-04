import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

export const GlobalStyles = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
        outline: none;
    }

    body {
        font-family: 'Circular Std', Helvetica, Arial, sans-serif;
        -webkit-tap-highlight-color: transparent;
        font-weight: 400;
        line-height: 1.4;
        color: #000;
        background: #fff;
    }

`
