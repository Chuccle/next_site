import {
    Center,
    Float,
    Html,
    OrbitControls,
    Stars,
    Text3D,
    useMatcapTexture,
    useProgress,
} from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { SpinningSphere } from '../components/geometry_ifaces'

function useRotation(
    rotationSpeed: number,
    meshRef: React.RefObject<THREE.Mesh>
): void {
    useFrame(() => {
        if (meshRef.current?.rotation) {
            meshRef.current.rotation.y += rotationSpeed
        }
    })
}

function Loader({
    styles,
}: {
    styles: {
        readonly [key: string]: string
    }
}) {
    const { progress } = useProgress()

    return (
        <Html center className={styles.loader}>
            <div className={styles.spinner}></div>
            <div className={styles.text}>{Math.floor(progress)} % loaded</div>
        </Html>
    )
}

function SpaceText({
    fontPath,
    MatcapTextureName,
}: {
    fontPath: string
    MatcapTextureName: string
}): JSX.Element {
    //const texture: THREE.Texture = useLoader(THREE.TextureLoader, url);
    const [matcapTexture]: [THREE.Texture, string, number] = useMatcapTexture(
        //'CB4E88_F99AD6_F384C3_ED75B9'
        MatcapTextureName
    )
    const { width: w, height: h } = useThree((state) => state.viewport)

    return (
        <mesh>
            <Center position={[0, 0, -40]}>
                <Float speed={1}></Float>
                <Text3D
                    castShadow={true}
                    receiveShadow={true}
                    size={1}
                    scale={[-1, 1, 0.8]}
                    position={[2, 0, -20]}
                    rotation={[0, 0, 0]}
                    font={fontPath}
                    curveSegments={24}
                    bevelSegments={1}
                    bevelEnabled
                    bevelSize={0.08}
                    bevelThickness={0.03}
                    height={1}
                    lineHeight={0.9}
                    letterSpacing={0.3}
                >
                    {`Software`}
                    <meshMatcapMaterial color="white" matcap={matcapTexture} />
                </Text3D>
                <Float speed={1}></Float>
                <Text3D
                    castShadow={true}
                    receiveShadow={true}
                    size={1}
                    scale={[-1, 1, 0.8]}
                    position={[2, 0, -40]}
                    rotation={[0, 0, 0]}
                    font={fontPath}
                    curveSegments={24}
                    bevelSegments={1}
                    bevelEnabled
                    bevelSize={0.08}
                    bevelThickness={0.03}
                    height={1}
                    lineHeight={0.9}
                    letterSpacing={0.3}
                >
                    {`that's simply`}
                    <meshMatcapMaterial color="white" matcap={matcapTexture} />
                </Text3D>
                <Float speed={1}></Float>
                <Text3D
                    castShadow={true}
                    receiveShadow={true}
                    size={1}
                    scale={[-1, 1, 0.8]}
                    position={[2, 0, -60]}
                    rotation={[0, 0, 0]}
                    font={fontPath}
                    curveSegments={24}
                    bevelSegments={1}
                    bevelEnabled
                    bevelSize={0.08}
                    bevelThickness={0.03}
                    height={1}
                    lineHeight={0.9}
                    letterSpacing={0.3}
                >
                    {`out of this\n world`}
                    <meshMatcapMaterial color="white" matcap={matcapTexture} />
                </Text3D>
            </Center>
        </mesh>
    )
}

function Space({ starCount }: { starCount: number }): JSX.Element {
    const { width: w, height: h } = useThree((state) => state.viewport)

    return (
        <mesh position={[0.0, 0.0, 0.0]}>
            <sphereGeometry args={[500, 500, 500]} attach="geometry" />
            <meshBasicMaterial side={2} color="black" attach="material" />
            <Stars
                radius={200}
                depth={10}
                count={starCount}
                factor={5}
                saturation={0}
                fade
                speed={0.2}
            />
        </mesh>
    )
}

function Earth({
    sphereArgs,
    urlTexture,
    urlBumpmap,
    bumpScale,
}: {
    sphereArgs: SpinningSphere
    urlTexture: string
    urlBumpmap: string
    bumpScale: number
}): JSX.Element {
    const meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null)

    const [texture, bumpmap] = useLoader(THREE.TextureLoader, [
        urlTexture,
        urlBumpmap,
    ])

    useRotation(sphereArgs.rotationSpeed, meshRef)

    return (
        <mesh
            position={sphereArgs.position}
            ref={meshRef}
            castShadow={sphereArgs.castshadow}
            receiveShadow={sphereArgs.receiveshadow}
        >
            <meshStandardMaterial
                map={texture}
                bumpMap={bumpmap}
                bumpScale={bumpScale}
            />
            <sphereGeometry args={sphereArgs.meshargs} attach="geometry" />
        </mesh>
    )
}

function EarthClouds({
    sphereArgs,
    urlTexture,
}: {
    sphereArgs: SpinningSphere
    urlTexture: string
}): JSX.Element {
    const texture: THREE.Texture = useLoader(THREE.TextureLoader, urlTexture)

    const meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null)

    useRotation(sphereArgs.rotationSpeed, meshRef)

    return (
        <mesh
            position={sphereArgs.position}
            ref={meshRef}
            castShadow={sphereArgs.castshadow}
            receiveShadow={sphereArgs.receiveshadow}
        >
            <meshPhongMaterial map={texture} transparent={true} />
            <sphereGeometry args={sphereArgs.meshargs} attach="geometry" />
        </mesh>
    )
}

function Moon({
    sphereArgs,
    urlTexture,
    urlNormalmap,
}: {
    sphereArgs: SpinningSphere
    urlTexture: string
    urlNormalmap: string
}): JSX.Element {
    const meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null)

    const [texture, normalmap] = useLoader(THREE.TextureLoader, [
        urlTexture,
        urlNormalmap,
    ])

    useRotation(sphereArgs.rotationSpeed, meshRef)

    useFrame((state) => {
        // this will always have a set value of 0 meaning initial start position will be math.cos(0) * 2  and math.sin(0) * 2 == x:2, y:0, z:0 initial orbit position
        let incrementer: number = state.clock.getElapsedTime() / 5

        if (meshRef.current?.position) {
            meshRef.current.position.set(
                Math.cos(incrementer) * sphereArgs.position[0],
                0,
                Math.sin(incrementer) * sphereArgs.position[2]
            )
        }
    })

    return (
        <mesh
            position={sphereArgs.position}
            ref={meshRef}
            castShadow={sphereArgs.castshadow}
            receiveShadow={sphereArgs.receiveshadow}
        >
            <meshStandardMaterial map={texture} normalMap={normalmap} />
            <sphereGeometry args={sphereArgs.meshargs} attach="geometry" />
        </mesh>
    )
}

export default function SolarSystemComposer({
    styles,
}: {
    styles: {
        readonly [key: string]: string
    }
}): JSX.Element {
    return (
        <div className={styles.background3D}>
            <Canvas shadows={true} camera={{ position: [0, 0, -10], fov: 60 }}>
                <OrbitControls enableZoom={true} enablePan={true} />

                <Suspense fallback={<Loader styles={styles} />}>
                    {/*  <ResponsiveCamera /> */}
                    <Space starCount={10000} />
                    <SpaceText
                        fontPath={'/fonts/gt.json'}
                        MatcapTextureName={'CB4E88_F99AD6_F384C3_ED75B9'}
                    />
                    <Moon
                        sphereArgs={{
                            rotationSpeed: 0.0015,
                            receiveshadow: true,
                            castshadow: false,
                            meshargs: [0.5, 120, 120],
                            position: [6.0, 0.0, 6.0],
                        }}
                        urlTexture={'Model_Textures/moon_4k_color_brim16.jpg'}
                        urlNormalmap={'Model_Textures/moon_4k_normal.jpg'}
                    />
                    <EarthClouds
                        sphereArgs={{
                            rotationSpeed: 0.00035,
                            receiveshadow: true,
                            castshadow: true,
                            meshargs: [4.05, 30.01, 30.01],
                            position: [0.0, 0.0, 0.0],
                        }}
                        urlTexture={'Model_Textures/fair_clouds_4k.png'}
                    />
                    <Earth
                        sphereArgs={{
                            rotationSpeed: 0.0003,
                            receiveshadow: true,
                            castshadow: true,
                            meshargs: [4, 100, 100],
                            position: [0.0, 0.0, 0.0],
                        }}
                        urlTexture={'Model_Textures/basicTexture.jpg'}
                        urlBumpmap={'Model_Textures/bumpmap.jpg'}
                        bumpScale={0.15}
                    />
                </Suspense>
                <directionalLight
                    castShadow
                    intensity={0.5}
                    color={'#dee2ff'}
                    position={[0, 0, -20]}
                />
            </Canvas>
        </div>
    )
}
