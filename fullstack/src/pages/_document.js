import { Html, Main, NextScript } from 'next/document'
import Head from 'next/head'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <title>Comping Machine</title>
        <link rel="icon" href='/logo-black.png'/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
