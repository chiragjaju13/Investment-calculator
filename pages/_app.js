/**
 * pages/_app.js
 * Next.js custom App — loads global CSS and the Montserrat font.
 */

import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Goal-Based Investment Calculator</title>
        <meta
          name="description"
          content="Calculate the monthly SIP required to reach your financial goal, accounting for inflation and expected returns."
        />
        {/* Montserrat via Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
