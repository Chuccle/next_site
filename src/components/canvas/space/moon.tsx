"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import type { OrbitingSphere, SpinningSphere } from "./geometry_iface";
import { useRotation } from "./util";

export default function Moon (props: {
    readonly urlTexture: string
    readonly planetOrbitDistance: number
    readonly planetOrbitSpeed: number
    readonly passedMeshRef?: React.RefObject<THREE.Mesh> | undefined
} & (SpinningSphere & OrbitingSphere)): React.ReactNode {
  let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

  if (props.passedMeshRef) { meshRef = props.passedMeshRef; }

  const texture = useLoader(THREE.TextureLoader, props.urlTexture);

  useFrame((state) => {
    const earthPosT = state.clock.getElapsedTime() / props.planetOrbitSpeed;
    const moonPosT = earthPosT / (props.orbitSpeed / props.planetOrbitSpeed);

    const earthPosition: THREE.Vector3Tuple = [
      Math.cos(earthPosT) * props.planetOrbitDistance,
      0,
      Math.sin(earthPosT) * props.planetOrbitDistance
    ];

    if (meshRef.current?.position) {
      meshRef.current.position.set(
        (Math.cos(moonPosT) * props.orbitDistance) + earthPosition[0],
        earthPosition[1],
        (Math.sin(moonPosT) * props.orbitDistance) + earthPosition[2]
      );
    }
  });

  useRotation(props.rotationSpeed, meshRef);

  return (
    <mesh
      position={props.position}
      ref={meshRef}
      castShadow={props.castshadow}
      receiveShadow={props.receiveshadow}
    >
      <meshStandardMaterial map={texture} />
      <sphereGeometry args={props.meshArgs} attach='geometry' />
    </mesh>
  );
}
