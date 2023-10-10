import { createGlobalStyle } from "styled-components";
import resetCss from "./utils/resetCss";

const GlobalStyle = createGlobalStyle`
    ${resetCss}
    * {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
        width: 100%;
        height: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f1f2f4;
        font-family: "LINE Seed Sans", sans-serif;
    }

    &:link, &:visited {
        text-decoration: none;
        color: inherit;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyle;
