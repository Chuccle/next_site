'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import {  View as ViewImpl } from '@react-three/drei';
import { Three } from './Three';
// import { Bloom, EffectComposer } from '@react-three/postprocessing'

// export const Common = ({ color } : { color: string }) => (
// <>
//     {color && <color attach='background' args={[color]} />}
//     <EffectComposer>
//       <Bloom mipmapBlur luminanceThreshold={0} luminanceSmoothing={0.9} />
//     </EffectComposer>
//   </>

// )

const View = forwardRef(({ children, ...props } : React.HTMLAttributes<HTMLDivElement>, ref) => {
  const localRef = useRef(null as unknown as HTMLDivElement);
  useImperativeHandle(ref, () => localRef.current);

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
        </ViewImpl>
      </Three>
    </>
  );
});
View.displayName = 'View';

export { View };
