"use client";

import { Line } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef }  from "react";
import * as THREE from "three";

import type { OrbitingSphere,SpinningSphere } from "./geometry_iface";
import { useOrbit, useRotation } from "./util";

type BasePlanetParams = {
    urlTexture: string;
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined;
} & (SpinningSphere & OrbitingSphere);

type StandardPlanet = { type: "standard" } & BasePlanetParams;
type BumpyPlanet = { type: "bumpy", urlBumpmap: string, bumpScale: number } & BasePlanetParams;
type ReflectivePlanet = { type: "reflective", urlSpecularmap: string, reflectivity: number } & BasePlanetParams;
type BumpyAndReflectivePlanet = { type: "bumpyAndReflective", urlBumpmap: string, bumpScale: number, urlSpecularmap: string, reflectivity: number } & BasePlanetParams;

function PlanetBumpyAndReflective (planetparams: BumpyAndReflectivePlanet) {
  let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

  if (planetparams.passedMeshRef) { meshRef = planetparams.passedMeshRef; }

  const [texture, bumpmap, specularmap] = useLoader(THREE.TextureLoader, [
    planetparams.urlTexture,
    planetparams.urlBumpmap,
    planetparams.urlSpecularmap
  ]);

  useRotation(planetparams.rotationSpeed, meshRef);

  useOrbit(planetparams.orbitSpeed, meshRef, planetparams.orbitDistance);

  return (
    <mesh
      position={planetparams.position}
      ref={meshRef}
      castShadow={planetparams.castshadow}
      receiveShadow={planetparams.receiveshadow}
    >
      <meshPhongMaterial
        map={texture}
        bumpMap={bumpmap}
        bumpScale={planetparams.bumpScale}
        specularMap={specularmap}
        reflectivity={planetparams.reflectivity}
      />
      <sphereGeometry args={planetparams.meshArgs} attach='geometry' />
    </mesh>
  );
}

function PlanetBumpy (planetparams: BumpyPlanet) {
  let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

  if (planetparams.passedMeshRef) { meshRef = planetparams.passedMeshRef; }

  const [texture, bumpmap] = useLoader(THREE.TextureLoader, [
    planetparams.urlTexture,
    planetparams.urlBumpmap
  ]);

  useRotation(planetparams.rotationSpeed, meshRef);

  useOrbit(planetparams.orbitSpeed, meshRef, planetparams.orbitDistance);

  return (
    <mesh
      position={planetparams.position}
      ref={meshRef}
      castShadow={planetparams.castshadow}
      receiveShadow={planetparams.receiveshadow}
    >
      <meshPhongMaterial
        map={texture}
        bumpMap={bumpmap}
        bumpScale={planetparams.bumpScale}
      />
      <sphereGeometry args={planetparams.meshArgs} attach='geometry' />
    </mesh>
  );
}

function PlanetReflective (planetparams: ReflectivePlanet) {
  let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

  if (planetparams.passedMeshRef) { meshRef = planetparams.passedMeshRef; }

  const [texture, specularmap] = useLoader(THREE.TextureLoader, [
    planetparams.urlTexture,
    planetparams.urlSpecularmap
  ]);

  useRotation(planetparams.rotationSpeed, meshRef);

  useOrbit(planetparams.orbitSpeed, meshRef, planetparams.orbitDistance);

  return (
    <mesh
      position={planetparams.position}
      ref={meshRef}
      castShadow={planetparams.castshadow}
      receiveShadow={planetparams.receiveshadow}
    >
      <meshPhongMaterial
        map={texture}
        specularMap={specularmap}
        reflectivity={planetparams.reflectivity}
      />
      <sphereGeometry args={planetparams.meshArgs} attach='geometry' />
    </mesh>
  );
}

function PlanetStandard (planetparams: StandardPlanet) {
  let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

  if (planetparams.passedMeshRef) { meshRef = planetparams.passedMeshRef; }

  const [texture] = useLoader(THREE.TextureLoader, [
    planetparams.urlTexture
  ]);

  useRotation(planetparams.rotationSpeed, meshRef);

  useOrbit(planetparams.orbitSpeed, meshRef, planetparams.orbitDistance);

  return (
    <mesh
      position={planetparams.position}
      ref={meshRef}
      castShadow={planetparams.castshadow}
      receiveShadow={planetparams.receiveshadow}
    >
      <meshStandardMaterial
        map={texture}
      />
      <sphereGeometry args={planetparams.meshArgs} attach='geometry' />
    </mesh>
  );
}

type PlanetParams = StandardPlanet | BumpyPlanet | ReflectivePlanet | BumpyAndReflectivePlanet;

export function Planet (planetparams: PlanetParams): React.ReactNode {
  switch (planetparams.type) {
  case "standard":
    return <PlanetStandard {...planetparams} />;
  case "bumpy":
    return <PlanetBumpy {...planetparams} />;
  case "reflective":
    return <PlanetReflective {...planetparams} />;
  case "bumpyAndReflective":
    return <PlanetBumpyAndReflective {...planetparams} />;
  default:
    throw new Error("Invalid planet type");
  }
}

export function PlanetClouds (props: {
    readonly urlTexture: string
    readonly passedMeshRef?: React.RefObject<THREE.Mesh> | undefined

} & (SpinningSphere & OrbitingSphere)): React.ReactNode {
  const texture: THREE.Texture = useLoader(THREE.TextureLoader, props.urlTexture);

  let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

  if (props.passedMeshRef) { meshRef = props.passedMeshRef; }

  useRotation(props.rotationSpeed, meshRef);

  useOrbit(props.orbitSpeed, meshRef, props.orbitDistance);

  return (
    <mesh
      position={props.position}
      ref={meshRef}
      castShadow={props.castshadow}
      receiveShadow={props.receiveshadow}
    >
      <meshPhongMaterial map={texture} transparent opacity={0.8} />
      <sphereGeometry args={props.meshArgs} attach='geometry' />
    </mesh>
  );
}

export function OrbitLine (props: { readonly radius: number, readonly passedMeshRef?: React.RefObject<THREE.Mesh> | undefined }): React.ReactNode {
  const curve = new THREE.EllipseCurve(0, 0, props.radius, props.radius, 0, 2 * Math.PI, false, 0);
  const points = curve.getPoints(300);

  let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

  if (props.passedMeshRef) { meshRef = props.passedMeshRef; }

  return (
    <mesh ref={meshRef} visible={false}>
      <Line
        points={points}
        color={0xffffff}
        dashed
        dashSize={3}
        gapSize={2.5}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </mesh>
  );
}
