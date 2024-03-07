"use client";

import { OrbitControls, PerspectiveCamera, View as ViewImpl } from "@react-three/drei";
import { forwardRef, Suspense, useImperativeHandle, useRef } from "react";

import { Three } from "@/helpers/components/Three";

export function Common ({ color }: { readonly color: string }) {
  return (
    <Suspense fallback={null}>
      <color attach='background' args={[color]} />
      <ambientLight />
      <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
      <pointLight position={[-10, -10, -10]} color='blue' decay={0.2} />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </Suspense>
  );
}

const View = forwardRef(({ children, orbit, ...props }: React.HTMLAttributes<HTMLDivElement> & { readonly orbit: boolean }, ref) => {
  const localRef = useRef(null as unknown as HTMLDivElement);
  useImperativeHandle(ref, () => localRef.current);

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit ? <OrbitControls /> : null}
        </ViewImpl>
      </Three>
    </>
  );
});
View.displayName = "View";

export { View };
