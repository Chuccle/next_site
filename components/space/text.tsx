import { Text3D, useMatcapTexture } from "@react-three/drei";
import { ComponentProps, useRef } from "react";
import * as THREE from "three";

type Text3DProps = ComponentProps<typeof Text3D>;

export default function SpaceText(props: {
    matcapTextureName: string
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined
    textToDisplay: string
} & Text3DProps): JSX.Element {

    const [matcapTexture]: [THREE.Texture, string, number] = useMatcapTexture(
        props.matcapTextureName
    );

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;

    return (
        <mesh ref={meshRef}>
            <Text3D
                {...props}
            >
                {props.textToDisplay}
                <meshMatcapMaterial color={"white"} matcap={matcapTexture} />
            </Text3D>

        </mesh>
    );
}