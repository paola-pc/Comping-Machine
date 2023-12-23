import 'bring/styles/globals.css';
import Layout from '../components/Layout'
import { SessionProvider, useSession } from 'next-auth/react';
import LoginModal from 'bring/components/modals/LoginModal';
import React from 'react'
import Head from 'next/head'

export default function App({ Component, pageProps, session }) {
  

  return (
    <>
      <Head>
        <title>Comping Machine</title>
        <link rel="icon" href='/logo-over-black.png' />
      </Head>
      <SessionProvider session={session}>
        <LoginModal></LoginModal>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}
