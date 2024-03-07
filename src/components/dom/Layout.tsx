"use client";

import dynamic from "next/dynamic";
import { ReactNode, useRef } from "react";

import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const ref = useRef(null as unknown as HTMLDivElement);

  return (
    <>      
      <Sidebar />
      <div
        ref={ref}
        style={{
          position: "relative",
          width: " 100%",
          height: "100%",
          overflow: "auto",
          touchAction: "auto"
        }}
      >
        {children}
        <Scene
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none"
          }}
          eventSource={ref}
          eventPrefix='client' />
      </div>
      <Footer />
    </>
  );
};

export { Layout };
