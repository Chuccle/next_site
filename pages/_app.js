import '../styles/globals.css'
import React from 'react'
import Head from 'next/head'
import Sidebar from '../components/sidebar'
import Footer from '../components/footer'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <React.StrictMode>
                <Head>
                    <title>Home</title>
                    <link rel="icon" type="image/svg+xml" href="favicon.svg" />
                </Head>
                <Component {...pageProps}></Component> <Sidebar /> <Footer />
            </React.StrictMode>
        </>
    )
}

export default MyApp
