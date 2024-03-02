import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SpinningSphere } from "./geometry_iface";
import { useRotation } from "./util";


export function Star(props: {
    urlTexture: string,
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined
} & SpinningSphere): JSX.Element {

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;

    const texture = useLoader(THREE.TextureLoader, props.urlTexture);

    useRotation(props.rotationSpeed, meshRef);

    return (
        <group>
            <pointLight intensity={1} position={props.position} decay={0} castShadow={true} />
            <mesh
                position={props.position}
                ref={meshRef}
                castShadow={props.castshadow}
                receiveShadow={props.receiveshadow}
            >
                <meshBasicMaterial map={texture} toneMapped={false} />
                <sphereGeometry args={props.meshArgs} />
            </mesh >

            {/* <SolarFlare rotation={[0, 0, 0]} radius={5} speed={0.1} position={props.spinningSphereArgs.position} /> */}
        </group>

    );
}