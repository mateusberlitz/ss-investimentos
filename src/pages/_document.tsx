import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { GA_TRACKING_ID, GOOGLE_ANALYTICS_TRACKING_ID } from '../services/gtag';

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


                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_TRACKING_ID}`} />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                            
                                gtag('config', '${GOOGLE_ANALYTICS_TRACKING_ID}');
                            `,
                        }}
                    />

                    {/* Global Site Tag (gtag.js) - Google Ads */}
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                            
                                gtag('config', '${GA_TRACKING_ID}');
                            `,
                        }}
                    />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function(h,o,t,j,a,r){
                                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                                    h._hjSettings={hjid:3586067,hjsv:6};
                                    a=o.getElementsByTagName('head')[0];
                                    r=o.createElement('script');r.async=1;
                                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                                    a.appendChild(r);
                                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                            `,
                        }}
                    />


                    <meta name="robots" content="index, follow"></meta>

                    <meta name="description" content="Conquiste seus objetivos financeiros com as soluções mais completas e precisas para alavancagem patrimonial."/>
                    {/* <link rel="icon" type="image/x-icon" href="./icone_startril.svg"/> */}

                    <meta name="facebook-domain-verification" content="g8yp6iz97nsgjl1dxn46e34gxaot0s"></meta>
                    <meta name="google-site-verification" content="Q5dGY-imD4ur2aZOKlLTgMCEIefxpB2AgWR36Ne2H2A"></meta>

                    <meta name="category" content="Finance" />
                    <link rel="index" title="S&S Investimentos" href="https://startril.com.br/"/>
                    <link rel="logo" type="image/svg" href="/logotipo.svg"/>
                    <link rel="sitemap" type="application/xml" href="https://startril.com.br/sitemap.xml"></link>

                    <meta name="url" content="https://ssinvestimentos.com.br/"></meta>
                    <meta property="og:url" content="https://ssinvestimentos.com.br/blog"></meta>

                    <meta property="og:site_name" content="S&S Investimentos"></meta>
                    <meta property="og:locale" content="pt_BR"></meta>
                    <meta property="og:title" content="S&S Investimentos - Conquiste seus objetivos financeiros com as soluções mais completas e precisas para alavancagem patrimonial."></meta>
                    <meta property="og:description" content="Conquiste seus objetivos financeiros com as soluções mais completas e precisas para alavancagem patrimonial."></meta>

                    <meta property="og:image" content="./images/card.png"></meta>
                    <meta property="og:image:alt" content="S&S Investimentos - Conquiste seus objetivos financeiros com as soluções mais completas e precisas para alavancagem patrimonial."></meta>
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