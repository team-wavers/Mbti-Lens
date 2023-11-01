import Document from "next/document";
import { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App: any) => (props: any) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <title>남이보는 당신의 MBTI는? MBTI Lens</title>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, user-scalable=0"
                    />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:site_name"
                        content="남이보는 당신의 MBTI는? MBTI Lens"
                    />
                    <meta
                        property="og:title"
                        content="남이보는 당신의 MBTI는? MBTI Lens"
                    />
                    <meta
                        property="og:image"
                        content="https://youthwelfare.kr/mbti-lens.thumbnail.png"
                    />
                    <meta property="og:image:type" content="image/png" />
                    <meta
                        property="og:description"
                        content="남이 보는 내 MBTI는 어떨까? 쉽게 평가받아 보세요!"
                    />
                    <link rel="icon" href="/favicon.ico" sizes="any" />
                    <meta property="og:site_name" content="website-name" />
                    <meta property="og:title" content="website-name" />
                    <link rel="stylesheet" href="../fonts.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
