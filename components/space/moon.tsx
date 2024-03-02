import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitingSphere, SpinningSphere } from "./geometry_iface";
import { useRotation } from "./util";


export default function Moon(props: {
    urlTexture: string
    planetOrbitDistance: number
    planetOrbitSpeed: number
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined
} & (SpinningSphere & OrbitingSphere)): JSX.Element {

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;

    const texture = useLoader(THREE.TextureLoader, props.urlTexture);

    useFrame((state) => {
        const earthPosT = state.clock.getElapsedTime() / props.planetOrbitSpeed;
        const moonPosT = earthPosT / (props.orbitSpeed / props.planetOrbitSpeed);

        const earthPosition = new THREE.Vector3(
            Math.cos(earthPosT) * props.planetOrbitDistance,
            0,
            Math.sin(earthPosT) * props.planetOrbitDistance
        );

        if (meshRef.current?.position) {
            meshRef.current.position.set(
                (Math.cos(moonPosT) * props.orbitDistance) + earthPosition.x,
                0,
                (Math.sin(moonPosT) * props.orbitDistance) + earthPosition.z
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
            <sphereGeometry args={props.meshArgs} attach="geometry" />
        </mesh>
    );
}