import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SpinningSphere, OrbitingSphere } from "./geometry_iface";
import { useOrbit, useRotation } from "./util";

export function Planet(props: {
    spinningOrbitingSphereParams: SpinningSphere & OrbitingSphere
    urlTexture: string
    urlBumpmap: string
    bumpScale: number
    urlSpecularmap: string
    reflectivity: number
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined
}): JSX.Element {

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;

    const [texture, bumpmap, specularmap] = useLoader(THREE.TextureLoader, [
        props.urlTexture,
        props.urlBumpmap,
        props.urlSpecularmap,
    ]);

    useRotation(props.spinningOrbitingSphereParams.rotationSpeed, meshRef);

    useOrbit(props.spinningOrbitingSphereParams.orbitSpeed, meshRef, props.spinningOrbitingSphereParams.orbitDistance);

    return (
        <mesh
            position={props.spinningOrbitingSphereParams.position}
            ref={meshRef}
            castShadow={props.spinningOrbitingSphereParams.castshadow}
            receiveShadow={props.spinningOrbitingSphereParams.receiveshadow}
        >
            <meshPhongMaterial
                map={texture}
                bumpMap={bumpmap}
                bumpScale={props.bumpScale}
                specularMap={specularmap}
                reflectivity={props.reflectivity}
            />
            <sphereGeometry args={props.spinningOrbitingSphereParams.meshArgs} attach="geometry" />
        </mesh>
    );
}

export function PlanetClouds(props: {
    spinningOrbitingSphereParams: SpinningSphere & OrbitingSphere
    urlTexture: string
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined

}): JSX.Element {

    const texture: THREE.Texture = useLoader(THREE.TextureLoader, props.urlTexture);

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;

    useRotation(props.spinningOrbitingSphereParams.rotationSpeed, meshRef);

    useOrbit(props.spinningOrbitingSphereParams.orbitSpeed, meshRef, props.spinningOrbitingSphereParams.orbitDistance);

    return (
        <mesh
            position={props.spinningOrbitingSphereParams.position}
            ref={meshRef}
            castShadow={props.spinningOrbitingSphereParams.castshadow}
            receiveShadow={props.spinningOrbitingSphereParams.receiveshadow}
        >
            <meshPhongMaterial map={texture} transparent={true} />
            <sphereGeometry args={props.spinningOrbitingSphereParams.meshArgs} attach="geometry" />
        </mesh>
    );
}