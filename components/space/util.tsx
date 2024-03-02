import { Html, useProgress } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useScrollBlock from "../utils";
import { useEffect } from "react";


export function useRotation(
    rotationSpeed: number,
    meshRef: React.RefObject<THREE.Mesh>
): void {
    useFrame(() => {
        if (meshRef.current?.rotation) {
            meshRef.current.rotation.y += rotationSpeed;
        }
    });
}

export function useOrbit(
    orbitSpeed: number,
    meshRef: React.RefObject<THREE.Mesh>,
    orbitDistance: number
): void {
    useFrame((state) => {

        if (orbitSpeed === 0 || orbitDistance === 0) return;
        // this will always have a set value of 0 meaning initial start position will be math.cos(0) * 2  and math.sin(0) * 2 == x:2, y:0, z:0 initial orbit position
        const incrementer: number = state.clock.getElapsedTime() / orbitSpeed;

        if (meshRef.current?.position) {
            meshRef.current.position.set(
                Math.cos(incrementer) * orbitDistance,
                0,
                Math.sin(incrementer) * orbitDistance
            );
        }
    });
}

export function Loader({
    styles
}: {
    styles: {
        readonly [key: string]: string
    }
}): JSX.Element {
    const { progress } = useProgress();
    const [blockScroll] = useScrollBlock();

    useEffect(() => blockScroll(), [blockScroll]);


    return (
        <Html center className={styles.loader}>
            <div className={styles.spinner}></div>
            <div className={styles.text}>{Math.floor(progress)} % loaded</div>
        </Html>
    );
}