import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitingSphere, SpinningSphere } from "./geometry_iface";
import { useRotation } from "./util";


export default function Moon(props: {
    spinningOrbitingSphereParams: SpinningSphere & OrbitingSphere
    urlTexture: string
    planetOrbitDistance: number
    planetOrbitSpeed: number
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined
}): JSX.Element {

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;


    const texture = useLoader(THREE.TextureLoader, props.urlTexture);


    useFrame((state) => {
        const earthPosT = state.clock.getElapsedTime() / props.planetOrbitSpeed;
        const moonPosT = earthPosT / (props.spinningOrbitingSphereParams.orbitSpeed / props.planetOrbitSpeed);

        const earthPosition = new THREE.Vector3(
            Math.cos(earthPosT) * props.planetOrbitDistance,
            0,
            Math.sin(earthPosT) * props.planetOrbitDistance
        );

        if (meshRef.current?.position) {
            meshRef.current.position.set(
                (Math.cos(moonPosT) * props.spinningOrbitingSphereParams.orbitDistance) + earthPosition.x,
                0,
                (Math.sin(moonPosT) * props.spinningOrbitingSphereParams.orbitDistance) + earthPosition.z
            );
        }


    });


    useRotation(props.spinningOrbitingSphereParams.rotationSpeed, meshRef);


    return (
        <mesh
            position={props.spinningOrbitingSphereParams.position}
            ref={meshRef}
            castShadow={props.spinningOrbitingSphereParams.castshadow}
            receiveShadow={props.spinningOrbitingSphereParams.receiveshadow}
        >
            <meshStandardMaterial map={texture} />
            <sphereGeometry args={props.spinningOrbitingSphereParams.meshArgs} attach="geometry" />
        </mesh>
    );
}