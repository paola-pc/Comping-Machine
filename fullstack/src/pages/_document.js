import { Html, Main, NextScript, Head } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <title>Comping Machine</title>
        <link rel="icon" href='/logo-over-black.png'/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
