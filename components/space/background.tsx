import { Stars } from "@react-three/drei";
import { ReactNode } from "react";




export function Space(props: { starCount: number, children?: ReactNode | undefined }): JSX.Element {
    // const { width: w, height: h } = useThree((state) => state.viewport);

    return (
        <mesh position={[0.0, 0.0, -100.0]}>
            <Stars
                radius={300}
                depth={10}
                count={props.starCount}
                factor={2}
                saturation={1}
                speed={0.2}
            />
            {props.children}
        </mesh>
    );
}