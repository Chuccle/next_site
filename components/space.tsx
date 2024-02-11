import {
    Html,
    Stars,
    Text3D,
    Trail,
    useMatcapTexture,
    useProgress,
} from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { ReactNode, Suspense, useRef } from 'react';
import * as THREE from 'three';
import { SpinningSphere } from '../components/geometry_ifaces';


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

        if (orbitSpeed == 0 || orbitDistance == 0) return;
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

interface AttachedToOrbitParams {
    attachedOrbitSpeed: number;
    attachedOrbitDistance: number;
}

function SpaceText(props: {
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

function Space(props: { starCount: number, children?: ReactNode | undefined }): JSX.Element {
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

function Planet(props: {
    sphereArgs: SpinningSphere
    urlTexture: string
    urlBumpmap: string
    bumpScale: number
    urlSpecularmap: string
    reflectivity: number
    orbitSpeed: number
    orbitDistance: number
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined
}): JSX.Element {

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;

    const [texture, bumpmap, specularmap] = useLoader(THREE.TextureLoader, [
        props.urlTexture,
        props.urlBumpmap,
        props.urlSpecularmap,
    ]);

    useRotation(props.sphereArgs.rotationSpeed, meshRef);

    useOrbit(props.orbitSpeed, meshRef, props.orbitDistance);

    return (
        <mesh
            position={props.sphereArgs.position}
            ref={meshRef}
            castShadow={props.sphereArgs.castshadow}
            receiveShadow={props.sphereArgs.receiveshadow}
        >
            <meshPhongMaterial
                map={texture}
                bumpMap={bumpmap}
                bumpScale={props.bumpScale}
                specularMap={specularmap}
                reflectivity={props.reflectivity}
            />
            <sphereGeometry args={props.sphereArgs.meshargs} attach="geometry" />
        </mesh>
    );
}

function PlanetClouds(props: {
    sphereArgs: SpinningSphere
    urlTexture: string
    orbitSpeed: number
    orbitDistance: number
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined

}): JSX.Element {

    const texture: THREE.Texture = useLoader(THREE.TextureLoader, props.urlTexture);

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;

    useRotation(props.sphereArgs.rotationSpeed, meshRef);

    useOrbit(props.orbitSpeed, meshRef, props.orbitDistance);

    return (
        <mesh
            position={props.sphereArgs.position}
            ref={meshRef}
            castShadow={props.sphereArgs.castshadow}
            receiveShadow={props.sphereArgs.receiveshadow}
        >
            <meshPhongMaterial map={texture} transparent={true} />
            <sphereGeometry args={props.sphereArgs.meshargs} attach="geometry" />
        </mesh>
    );
}

function Moon(
    props: {
        sphereArgs: SpinningSphere
        urlTexture: string
        orbitDistance: number
        orbitSpeed: number
        planetOrbitDistance: number
        planetOrbitSpeed: number
        passedMeshRef?: React.RefObject<THREE.Mesh> | undefined
    }): JSX.Element {

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;


    const [texture] = useLoader(THREE.TextureLoader, [props.urlTexture]);


    useFrame((state) => {
        const earthPosT = state.clock.getElapsedTime() / props.planetOrbitSpeed;
        const moonPosT = earthPosT / (props.orbitSpeed / props.planetOrbitSpeed);

        const earthPosition = new THREE.Vector3(
            Math.cos(earthPosT) * props.planetOrbitDistance,
            0,
            Math.sin(earthPosT) * props.planetOrbitDistance
        );

        if (meshRef.current?.position) {
            meshRef.current.position.set(
                (Math.cos(moonPosT) * props.orbitDistance) + earthPosition.x,
                0,
                (Math.sin(moonPosT) * props.orbitDistance) + earthPosition.z
            );
        }


    });


    useRotation(props.sphereArgs.rotationSpeed, meshRef);


    return (
        <mesh
            position={props.sphereArgs.position}
            ref={meshRef}
            castShadow={props.sphereArgs.castshadow}
            receiveShadow={props.sphereArgs.receiveshadow}
        >
            <meshStandardMaterial map={texture} />
            <sphereGeometry args={props.sphereArgs.meshargs} attach="geometry" />
        </mesh>
    );
}

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

function Star({
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


function SpaceScene(): JSX.Element {

    const planetRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);
    const SpaceTextRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);
    const { camera } = useThree();

    const earthOrbitRadius: number = 150;
    const earthOrbitSpeed: number = 35;

    useFrame(state => {

        // Ensure planetRef is defined
        if (planetRef.current) {

            // Calculate the current angle of the planet's orbit
            const currentTime: number = state.clock.getElapsedTime() / earthOrbitSpeed;

            const planetPosition = new THREE.Vector3();
            planetRef.current.getWorldPosition(planetPosition); // Get world position of the planet

            const distance = -15; // Distance from the planet to the camera
            const angle = currentTime % (2 * Math.PI); // Ensure angle is within [0, 2*pi]

            // Calculate camera position based on the planet's position, distance, and angle
            const cameraX = planetPosition.x + distance * Math.cos(angle);
            const cameraZ = planetPosition.z + distance * Math.sin(angle); // Adjust if needed

            // Set camera position
            camera.position.set(cameraX, planetPosition.y, cameraZ);

            // Make the camera look at the planet
            camera.lookAt(planetPosition);


        }


        if (SpaceTextRef.current) {

            const textPosition = new THREE.Vector3();
            SpaceTextRef.current.getWorldPosition(textPosition); // Get world position of the text

            const lookAtVector = new THREE.Vector3();
            lookAtVector.subVectors(camera.position, textPosition); // Vector pointing from text to camera
            SpaceTextRef.current.lookAt(textPosition.x - lookAtVector.x, textPosition.y - lookAtVector.y, textPosition.z - lookAtVector.z);
            // TODO: Find A way to allow SpaceText to orient itself towards the camera in front of Earth

        }

    });


    return (
        <>
            <Space starCount={5000} >
                <SpaceText
                    font={'/fonts/gt.json'}
                    matcapTextureName={'CB4E88_F99AD6_F384C3_ED75B9'}
                    textToDisplay={"Software that's\n        simply\nout of this world"}
                    size={1}
                    height={1}
                    scale={[-1, 1, 1]}
                    position={[9, 2, -5.5]}
                    curveSegments={24}
                    bevelsEnabled
                    bevelSegments={1}
                    bevelSize={0.08}
                    bevelThickness={0.03}
                    lineHeight={2}
                    letterSpacing={0.3}
                    attachedOrbitParams={{ attachedOrbitDistance: earthOrbitRadius, attachedOrbitSpeed: earthOrbitSpeed }}
                    passedMeshRef={SpaceTextRef}
                />
                <EffectComposer>
                    <Bloom mipmapBlur luminanceThreshold={0} luminanceSmoothing={0.9} />
                    <Star
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
                    planetOrbitDistance={earthOrbitRadius}
                    planetOrbitSpeed={earthOrbitSpeed}
                />
                <PlanetClouds
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
                <Planet
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
                    passedMeshRef={planetRef}
                />
            </Space>
        </>
    );
}

export default function SolarSystemComposer({ styles }: {
    styles: {
        readonly [key: string]: string
    }
}
): JSX.Element {

    return (
        <Canvas shadows={true} camera={{ fov: 60 }}>
            <color attach="background" args={['black']} />
            <Suspense fallback={<Loader styles={styles} />}>
                <SpaceScene />
            </Suspense>
        </Canvas>
    );
}
