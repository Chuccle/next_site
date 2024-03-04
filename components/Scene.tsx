'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { r3f } from './global.ts';
import * as THREE from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}
      onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
    >
      <EffectComposer autoClear={true}>
        <Bloom mipmapBlur luminanceThreshold={0} luminanceSmoothing={0.9} />
      </EffectComposer>
      <r3f.Out />
      <Preload all />
    </Canvas>
  );
}
