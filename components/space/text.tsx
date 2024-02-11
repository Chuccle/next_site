import { Text3D, useMatcapTexture } from "@react-three/drei";
import { useRef } from "react";
import { useOrbit } from "./util";


interface AttachedToOrbitParams {
    attachedOrbitSpeed: number;
    attachedOrbitDistance: number;
}

export default function SpaceText(props: {
    font: string
    matcapTextureName: string
    textToDisplay: string
    castshadow?: boolean | undefined
    receiveShadow?: boolean | undefined
    size?: number | undefined
    scale?: THREE.Vector3Tuple | undefined
    position?: THREE.Vector3Tuple | undefined
    rotation?: THREE.Euler | undefined
    curveSegments?: number | undefined
    bevelsEnabled?: boolean | undefined
    bevelSegments?: number | undefined
    bevelSize?: number | undefined
    bevelThickness?: number | undefined
    height?: number | undefined
    lineHeight?: number | undefined
    letterSpacing?: number | undefined
    attachedOrbitParams?: AttachedToOrbitParams | undefined
    passedMeshRef: React.RefObject<THREE.Mesh> | undefined

}): JSX.Element {

    const [matcapTexture]: [THREE.Texture, string, number] = useMatcapTexture(
        props.matcapTextureName
    );

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;

    // const { width: w, height: h } = useThree((state) => state.viewport);

    useOrbit(
        props.attachedOrbitParams?.attachedOrbitSpeed ?? 0,
        meshRef,
        props.attachedOrbitParams?.attachedOrbitDistance ?? 0
    );



    return (
        <mesh ref={meshRef}>
            <Text3D
                font={props.font}
                size={props.size}
                scale={props.scale}
                position={props.position}
                curveSegments={props.curveSegments}
                bevelEnabled={props.bevelsEnabled}
                bevelSegments={props.bevelSegments}
                lineHeight={props.lineHeight}
                letterSpacing={props.letterSpacing}
                height={props.height}
                bevelSize={props.bevelSize}
                bevelThickness={props.bevelThickness}
            >
                {props.textToDisplay}
                <meshMatcapMaterial color="white" matcap={matcapTexture} />
            </Text3D>

        </mesh>
    );
}