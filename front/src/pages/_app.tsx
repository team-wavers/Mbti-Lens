import { CommonLayout } from "@/components/layout";
import GlobalStyle from "@/styles/GlobalStyles";
import theme from "@/styles/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Script from "next/script";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CommonLayout>
                <Component {...pageProps} />
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-TMCGPGRB3Y"
                ></Script>
                <Script>
                    {` window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-TMCGPGRB3Y');`}
                </Script>
            </CommonLayout>
        </ThemeProvider>
    );
};

export default App;
