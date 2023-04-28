import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
//import { GA_TRACKING_ID, GOOGLE_ANALYTICS_TRACKING_ID } from '../services/gtag';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

    render() {
        return (
            <Html>
                <Head>
                    {/* <base href="http://localhost:3000/" /> */}

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Volkhov:wght@300;400;600&family=Kanit:wght@300;400;600;700&display=swap" rel="stylesheet" />
                
                    <link rel="shortcut icon" href="logotipo.svg" type="image/svg+xml" />

                    <meta name="robots" content="index, follow"></meta>

                    <meta name="description" content="Conquiste seus objetivos financeiros com as soluções mais completas e precisas para alavancagem patrimonial."/>
                    {/* <link rel="icon" type="image/x-icon" href="./icone_startril.svg"/> */}

                    <meta name="facebook-domain-verification" content="g8yp6iz97nsgjl1dxn46e34gxaot0s"></meta>
                    <meta name="google-site-verification" content="Q5dGY-imD4ur2aZOKlLTgMCEIefxpB2AgWR36Ne2H2A"></meta>

                    <meta name="category" content="Finance" />
                    <link rel="index" title="SS Investimentos" href="https://startril.com.br/"/>
                    <link rel="logo" type="image/svg" href="/logotipo.svg"/>
                    <link rel="sitemap" type="application/xml" href="https://startril.com.br/sitemap.xml"></link>

                    <meta name="url" content="https://ssinvestimentos.com.br/"></meta>
                    <meta property="og:url" content="https://ssinvestimentos.com.br/blog"></meta>

                    <meta property="og:site_name" content="SS Investimentos"></meta>
                    <meta property="og:locale" content="pt_BR"></meta>
                    <meta property="og:title" content="SS Investimentos - Conquiste seus objetivos financeiros com as soluções mais completas e precisas para alavancagem patrimonial."></meta>
                    <meta property="og:description" content="Conquiste seus objetivos financeiros com as soluções mais completas e precisas para alavancagem patrimonial."></meta>

                    <meta property="og:image" content="./images/card.jpg"></meta>
                    <meta property="og:image:alt" content="SS Investimentos - Conquiste seus objetivos financeiros com as soluções mais completas e precisas para alavancagem patrimonial."></meta>
                    <meta property="og:app_id" content="ns67765jnmz8"></meta>
                    <meta property="og:type" content="website"></meta>
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument