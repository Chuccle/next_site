'use client';

import { useRef } from 'react';
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';

interface Props {
  children: ReactNode;
}

const Scene = dynamic(() => import('./Scene'), { ssr: false });

const Layout: React.FC<Props> = ({ children }) => {
  const ref = useRef(null as unknown as HTMLDivElement);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: ' 100%',
        height: '100%',
        overflow: 'auto',
        touchAction: 'auto',
      }}
    >
      {children}
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
      />
    </div>
  );
};

export { Layout };
