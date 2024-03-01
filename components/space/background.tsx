import { Stars } from "@react-three/drei";
import { ReactNode } from "react";

export function Space(props: { starCount: number, children?: ReactNode | undefined }): JSX.Element {
    return (
        <mesh position={[0.0, 0.0, -20.0]}>
            <Stars
                radius={200}
                depth={10}
                count={props.starCount}
                factor={0.2}
                saturation={1}
                speed={0.2}
            />
            {props.children}
        </mesh>
    );
}