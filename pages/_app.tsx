import '../styles/globals.css';
import React, { ReactElement } from 'react';
import Head from 'next/head';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';

interface MyAppProps {
    Component: React.ComponentType<AppProps>;
    pageProps: AppProps;
}

function MyApp({ Component, pageProps }: MyAppProps): ReactElement {
    return (
        <>
            <React.StrictMode>
            <SpeedInsights />
                <Head>
                    <title>Home</title>
                    <link rel="icon" type="image/svg+xml" href="favicon.svg" />
                </Head>
                <Sidebar />
                <Component {...pageProps} />
                <Footer />
            </React.StrictMode>
        </>
    );
}

export default MyApp;