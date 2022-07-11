import '../styles/globals.css'
import React from 'react';
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";


function MyApp({ Component, pageProps }) {
  return <> <React.StrictMode><Component {...pageProps}></Component> <Sidebar /> <Footer /> </React.StrictMode></>
}

export default MyApp
