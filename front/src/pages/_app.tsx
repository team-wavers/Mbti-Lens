import { CommonLayout } from "@/components/layout";
import GlobalStyle from "@/styles/GlobalStyles";
import theme from "@/styles/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CommonLayout>
                <Component {...pageProps} />
            </CommonLayout>
        </ThemeProvider>
    );
};

export default App;
