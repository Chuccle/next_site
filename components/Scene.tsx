'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { r3f } from './global.ts';
import * as THREE from 'three';

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}
      onCreated={(state: { gl: { toneMapping: number; }; }) => (state.gl.toneMapping = THREE.AgXToneMapping)}
    >
      <r3f.Out />
      <Preload all />
    </Canvas>
  );
}
