import 'bring/styles/globals.css';
import Layout from '../components/Layout'
import { SessionProvider } from 'next-auth/react';
import LoginModal from 'bring/components/modals/loginModal';
import SaveModal from 'bring/components/modals/SaveModal';

export default function App({ Component, pageProps, session }) {
  return (
    <>
      <SessionProvider session={session}>
        <LoginModal></LoginModal>
      
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}
