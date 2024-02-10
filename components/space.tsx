import {
    Center,
    Float,
    Html,
    OrbitControls,
    Stars,
    Text3D,
    Trail,
    useMatcapTexture,
    useProgress,
} from '@react-three/drei';
import { Canvas, useFrame, useLoader, /*useThree*/ } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { SpinningSphere } from '../components/geometry_ifaces';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function useRotation(
    rotationSpeed: number,
    meshRef: React.RefObject<THREE.Mesh>
): void {
    useFrame(() => {
        if (meshRef.current?.rotation) {
            meshRef.current.rotation.y += rotationSpeed;
        }
    });
}

function useOrbit(
    orbitSpeed: number,
    meshRef: React.RefObject<THREE.Mesh>,
    orbitDistance: number
): void {
    useFrame((state) => {
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



function Loader({
    styles
}: {
    styles: {
        readonly [key: string]: string
    }
}): JSX.Element {
    const { progress } = useProgress();

    return (
        <Html center className={styles.loader}>
            <div className={styles.spinner}></div>
            <div className={styles.text}>{Math.floor(progress)} % loaded</div>
        </Html>
    );
}

function SpaceText({
    fontPath,
    MatcapTextureName
}: {
    fontPath: string
    MatcapTextureName: string
}): JSX.Element {

    const [matcapTexture]: [THREE.Texture, string, number] = useMatcapTexture(
        MatcapTextureName
    );

    // const { width: w, height: h } = useThree((state) => state.viewport);

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
    );
}

function Space({ starCount }: { starCount: number }): JSX.Element {
    // const { width: w, height: h } = useThree((state) => state.viewport);

    return (
        <mesh position={[0.0, 0.0, -100.0]}>
            <Stars
                radius={220}
                depth={10}
                count={starCount}
                factor={2}
                saturation={1}
                speed={0.2}
            />
        </mesh>
    );
}

function Earth({
    sphereArgs,
    urlTexture,
    urlBumpmap,
    bumpScale,
    urlSpecularmap,
    reflectivity,
    orbitSpeed,
    orbitDistance
}: {
    sphereArgs: SpinningSphere
    urlTexture: string
    urlBumpmap: string
    bumpScale: number
    urlSpecularmap: string
    reflectivity: number
    orbitSpeed: number
    orbitDistance: number
}): JSX.Element {
    const meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    const [texture, bumpmap, specularmap] = useLoader(THREE.TextureLoader, [
        urlTexture,
        urlBumpmap,
        urlSpecularmap,
    ]);

    useRotation(sphereArgs.rotationSpeed, meshRef);

    useOrbit(orbitSpeed, meshRef, orbitDistance);

    return (
        <mesh
            position={sphereArgs.position}
            ref={meshRef}
            castShadow={sphereArgs.castshadow}
            receiveShadow={sphereArgs.receiveshadow}
        >
            <meshPhongMaterial
                map={texture}
                bumpMap={bumpmap}
                bumpScale={bumpScale}
                specularMap={specularmap}
                reflectivity={reflectivity}
            />
            <sphereGeometry args={sphereArgs.meshargs} attach="geometry" />
        </mesh>
    );
}

function EarthClouds({
    sphereArgs,
    urlTexture,
    orbitSpeed,
    orbitDistance

}: {
    sphereArgs: SpinningSphere
    urlTexture: string
    orbitSpeed: number
    orbitDistance: number
}): JSX.Element {
    const texture: THREE.Texture = useLoader(THREE.TextureLoader, urlTexture);

    const meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    useRotation(sphereArgs.rotationSpeed, meshRef);

    useOrbit(orbitSpeed, meshRef, orbitDistance);

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
    );
}

function Moon({
    sphereArgs,
    urlTexture,
    orbitDistance,
    orbitSpeed,
    earthOrbitDistance,
    earthOrbitSpeed

}: {
    sphereArgs: SpinningSphere
    urlTexture: string
    orbitDistance: number
    orbitSpeed: number
    earthOrbitDistance: number
    earthOrbitSpeed: number
}): JSX.Element {
    const meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    const [texture] = useLoader(THREE.TextureLoader, [urlTexture]);


    useFrame((state) => {
        const earthPosT = state.clock.getElapsedTime() / earthOrbitSpeed;
        const moonPosT = earthPosT / (orbitSpeed / earthOrbitSpeed);
        
        const earthPosition = new THREE.Vector3(
            Math.cos(earthPosT) * earthOrbitDistance,
            0,
            Math.sin(earthPosT) * earthOrbitDistance
        );

        if (meshRef.current?.position) {
            meshRef.current.position.set(
                (Math.cos(moonPosT) * orbitDistance) + earthPosition.x,
                0, 
                (Math.sin(moonPosT) * orbitDistance) + earthPosition.z
            );
        }


    });


    useRotation(sphereArgs.rotationSpeed, meshRef);


    return (
        <mesh
            position={sphereArgs.position}
            ref={meshRef}
            castShadow={sphereArgs.castshadow}
            receiveShadow={sphereArgs.receiveshadow}
        >
            <meshStandardMaterial map={texture} />
            <sphereGeometry args={sphereArgs.meshargs} attach="geometry" />
        </mesh>
    );
}

function SolarFlare({ rotation, radius, speed, position }: { rotation: THREE.Vector3Tuple, radius: number, speed: number, position: THREE.Vector3Tuple }): JSX.Element {

    const meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    console.log(radius);
    console.log(speed);
    console.log(position[2]);


    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed;
        if (meshRef.current?.position) {
            meshRef.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 0);
            // console.log("meshref x =", meshRef.current.position.x)
            // console.log("meshref y =", meshRef.current.position.y)
            // console.log("meshref z =", meshRef.current.position.z)

        }
    });
    return (
        <group  >
            <EffectComposer>
                <Trail local width={5} length={6} color={new THREE.Color(2, 1, 10)} attenuation={(t: number) => t * t}>
                    <mesh rotation={rotation} position={position} ref={meshRef}>
                        <sphereGeometry args={[1]} />
                        <meshBasicMaterial color={[4, 34, 4]} toneMapped={false} />
                    </mesh>
                </Trail>
            </EffectComposer>
        </group>
    );
}

function Sun({
    sphereArgs,
    urlTexture,
}: {
    sphereArgs: SpinningSphere
    urlTexture: string
}): JSX.Element {
    const meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    const [texture] = useLoader(THREE.TextureLoader, [urlTexture]);

    useRotation(sphereArgs.rotationSpeed, meshRef);

    return (
        <group>
            <pointLight intensity={1} position={sphereArgs.position} decay={0} castShadow={true} />
            <mesh
                position={sphereArgs.position}
                ref={meshRef}
                castShadow={sphereArgs.castshadow}
                receiveShadow={sphereArgs.receiveshadow}
            >
                <meshBasicMaterial map={texture} toneMapped={false} />
                <sphereGeometry args={sphereArgs.meshargs} />
            </mesh >

            <SolarFlare rotation={[0, 0, 0]} radius={50} speed={0.1} position={sphereArgs.position} />
            {/* <SolarFlare rotation={[0, 0, Math.PI / 3]} radius={50} speed={2} position={sphereArgs.position} />
            <SolarFlare rotation={[0, 0, -Math.PI / 3]} radius={50} speed={1} position={sphereArgs.position} /> */}
        </group>

    );
}


export default function SolarSystemComposer({
    styles,
}: {
    styles: {
        readonly [key: string]: string
    }
}): JSX.Element {

    const earthOrbitRadius: number = 150;
    const earthOrbitSpeed: number = 50;

    return (
        <div className={styles.background3D}>
            <Canvas shadows={true} camera={{ position: [0, 0, -10], fov: 60 }}>
                <color attach="background" args={['black']} />

                <Suspense fallback={<Loader styles={styles} />}>

                    <OrbitControls enableZoom={true} enablePan={true} maxZoom={-100} />

                    {/*  <ResponsiveCamera /> */}
                    <Space starCount={5000} />
                    <SpaceText
                        fontPath={'/fonts/gt.json'}
                        MatcapTextureName={'CB4E88_F99AD6_F384C3_ED75B9'}
                    />
                    <EffectComposer>
                        <Bloom mipmapBlur luminanceThreshold={0} luminanceSmoothing={0.9} />
                        <Sun
                            sphereArgs={{
                                rotationSpeed: 0.000035,
                                receiveshadow: false,
                                castshadow: false,
                                meshargs: [60, 100, 100],
                                position: [0.0, 0.0, 0.0],
                            }}
                            urlTexture={'Model_Textures/2k_sun.jpg'}
                        />
                        <Bloom />
                    </EffectComposer>
                    <Moon
                        sphereArgs={{
                            rotationSpeed: 0.015,
                            receiveshadow: false,
                            castshadow: false,
                            meshargs: [0.6, 30, 30],
                            position: [0.0, 0.0, 0.0],
                        }}
                        urlTexture={'Model_Textures/nasa_moon_4k.jpg'}
                        orbitDistance={6}
                        orbitSpeed={3}
                        earthOrbitDistance={earthOrbitRadius}
                        earthOrbitSpeed={earthOrbitSpeed}
                    />
                    <EarthClouds
                        sphereArgs={{
                            rotationSpeed: 0.005,
                            receiveshadow: true,
                            castshadow: false,
                            meshargs: [4.03, 30, 30],
                            position: [0.0, 0.0, 0.0],
                        }}
                        urlTexture={'Model_Textures/fair_clouds_4k.png'}
                        orbitDistance={earthOrbitRadius}
                        orbitSpeed={earthOrbitSpeed}
                    />
                    <Earth
                        sphereArgs={{
                            rotationSpeed: 0.003,
                            receiveshadow: true,
                            castshadow: false,
                            meshargs: [4, 60, 60],
                            position: [0.0, 0.0, 0.0],
                        }}
                        urlTexture={'Model_Textures/basicTexture.jpg'}
                        urlBumpmap={'Model_Textures/bumpmap.jpg'}
                        bumpScale={15}
                        urlSpecularmap={'Model_Textures/water_4k.png'}
                        reflectivity={1}
                        orbitDistance={earthOrbitRadius}
                        orbitSpeed={earthOrbitSpeed}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
