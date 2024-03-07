import { Text3D, useMatcapTexture } from "@react-three/drei";
import { ComponentProps, useRef } from "react";

type Text3DProps = ComponentProps<typeof Text3D>;

export default function SpaceText (props: {
    readonly matcapTextureName: string
    readonly passedMeshRef?: React.RefObject<THREE.Mesh> | undefined
    readonly textToDisplay: string
} & Text3DProps): React.ReactNode {
  const [matcapTexture]: [THREE.Texture, string, number] = useMatcapTexture(
    props.matcapTextureName
  );

  let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

  if (props.passedMeshRef) { meshRef = props.passedMeshRef; }

  // const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <mesh ref={meshRef}>
      <Text3D
        {...props}
      >
        {props.textToDisplay}
        <meshMatcapMaterial color='white' matcap={matcapTexture} />
      </Text3D>

    </mesh>
  );
}
