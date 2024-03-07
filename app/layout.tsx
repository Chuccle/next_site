import "@/global.css";

import { Metadata } from "next";

import { Layout } from "@/components/dom/Layout";

export const metadata: Metadata = {
  title: "Charlie's portfolio",
  description: "Charlie Cohen's work showcase",
  icons: "favicon.svg"
};
export default function RootLayout ({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
