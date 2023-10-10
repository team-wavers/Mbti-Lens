import { CommonLayout } from "@/components/layout";
import GlobalStyle from "@/styles/GlobalStyles";
import theme from "@/styles/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <CommonLayout>
                    <Component {...pageProps} />
                </CommonLayout>
            </ThemeProvider>
        </RecoilRoot>
    );
};

export default App;
