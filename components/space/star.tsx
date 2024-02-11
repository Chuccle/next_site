import { Trail } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";
import { SpinningSphere } from "./geometry_iface";
import { useRotation } from "./util";

function SolarFlare(props: { rotation: THREE.Vector3Tuple, radius: number, speed: number, position: THREE.Vector3Tuple }): JSX.Element {

    const meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    console.log(props.radius);
    console.log(props.speed);
    console.log(props.position[2]);


    useFrame((state) => {
        const t = state.clock.getElapsedTime() * props.speed;
        if (meshRef.current?.position) {
            meshRef.current.position.set(Math.sin(t) * props.radius, (Math.cos(t) * props.radius * Math.atan(t)) / Math.PI / 1.25, 0);
            // console.log("meshref x =", meshRef.current.position.x)
            // console.log("meshref y =", meshRef.current.position.y)
            // console.log("meshref z =", meshRef.current.position.z)

        }
    });
    return (
        <group  >
            <EffectComposer>
                <Trail local width={5} length={6} color={new THREE.Color(2, 1, 10)} attenuation={(t: number) => t * t}>
                    <mesh rotation={props.rotation} position={props.position} ref={meshRef}>
                        <sphereGeometry args={[1]} />
                        <meshBasicMaterial color={[4, 34, 4]} toneMapped={false} />
                    </mesh>
                </Trail>
            </EffectComposer>
        </group>
    );
}

export function Star(props: {
    spinningSphereArgs: SpinningSphere
    urlTexture: string
}): JSX.Element {
    const meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    const texture = useLoader(THREE.TextureLoader, props.urlTexture);

    useRotation(props.spinningSphereArgs.rotationSpeed, meshRef);

    return (
        <group>
            <pointLight intensity={1} position={props.spinningSphereArgs.position} decay={0} castShadow={true} />
            <mesh
                position={props.spinningSphereArgs.position}
                ref={meshRef}
                castShadow={props.spinningSphereArgs.castshadow}
                receiveShadow={props.spinningSphereArgs.receiveshadow}
            >
                <meshBasicMaterial map={texture} toneMapped={false} />
                <sphereGeometry args={props.spinningSphereArgs.meshArgs} />
            </mesh >

            <SolarFlare rotation={[0, 0, 0]} radius={50} speed={0.1} position={props.spinningSphereArgs.position} />
        </group>

    );
}