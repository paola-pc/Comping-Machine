import 'bring/styles/globals.css';
import Layout from '../components/Layout'
import { SessionProvider } from 'next-auth/react';
import Modal from 'bring/components/Modal';


export default function App({ Component, pageProps, session }) {
  return (
    <>

      <SessionProvider session={session}>
        <Modal isOpen title='Test' actionLabel="Submit"/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}
