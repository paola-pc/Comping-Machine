import '../styles/globals.css';
import Layout from '../components/Layout'
import { SessionProvider, useSession } from 'next-auth/react';
import LoginModal from '../components/modals/loginModal';
import type { AppProps } from 'next/app'
import { Session } from 'next-auth';

// solution for session props taken from: https://stackoverflow.com/questions/73668032/nextauth-type-error-property-session-does-not-exist-on-type
export default function App({ Component, pageProps}:AppProps<{session:Session}>) {

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <LoginModal></LoginModal>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}
