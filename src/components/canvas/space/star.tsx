"use client";

import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import type { SpinningSphere } from "./geometry_iface";
import { useRotation } from "./util";

export function Star (props: {
    readonly urlTexture: string,
    readonly passedMeshRef?: React.RefObject<THREE.Mesh> | undefined
} & SpinningSphere): React.ReactNode {
  let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

  if (props.passedMeshRef) { meshRef = props.passedMeshRef; }

  const texture = useLoader(THREE.TextureLoader, props.urlTexture);

  useRotation(props.rotationSpeed, meshRef);

  return (
    <group>
      <mesh
        position={props.position}
        ref={meshRef}
        castShadow={props.castshadow}
        receiveShadow={props.receiveshadow}
      >
        <meshBasicMaterial map={texture} toneMapped={false} />
        <sphereGeometry args={props.meshArgs} />
      </mesh>
      {/* <SolarFlare rotation={[0, 0, 0]} radius={5} speed={0.1} position={props.spinningSphereArgs.position} /> */}
    </group>

  );
}
