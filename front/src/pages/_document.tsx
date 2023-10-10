import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="website-name" />
                <meta property="og:title" content="website-name" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
