import "../styles/globals.css";
import "@material-tailwind/react/tailwind.css";
import Head from "next/head";
import { SessionProvider } from 'next-auth/react'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
        />
      </Head>
    <SessionProvider session = {pageProps.session}>
       <Component {...pageProps} />
    </SessionProvider>
      
    </>
  );
}

export default MyApp;
