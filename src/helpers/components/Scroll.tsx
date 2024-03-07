import { addEffect, useFrame } from "@react-three/fiber";
import Lenis from "@studio-freight/lenis";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const state = {
  top: 0,
  progress: 0
};

const { damp } = THREE.MathUtils;

export default function Scroll ({ children }: { readonly children: React.ReactNode }) {
  const content = useRef(null);
  const wrapper = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({

      syncTouch: true,
      smoothWheel: true,
      normalizeWheel: true

    });

    lenis.on("scroll", ({ scroll, progress }: { scroll: number, progress: number }) => {
      state.top = scroll;
      state.progress = progress;
    });
    const effectSub = addEffect((time: number) => lenis.raf(time));
    return () => {
      effectSub();
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={wrapper}
      style={{
        position: "absolute",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        top: 0
      }}
    >
      <div
        ref={content}
        style={{
          position: "relative",
          minHeight: "200vh"
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function ScrollTicker ({ smooth = 9999999 }) {
  useFrame(({ viewport, camera }, delta) => {
    camera.position.y = damp(camera.position.y, -state.progress * viewport.height, smooth, delta);
  });

  return null;
}
