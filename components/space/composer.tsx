
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Space } from './background';
import Moon from './moon';
import { Planet, PlanetClouds } from './planet';
import { Star } from './star';
import SpaceText from './text';
import { Loader } from './util';


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
                        spinningSphereArgs={{
                            rotationSpeed: 0.000035,
                            receiveshadow: false,
                            castshadow: false,
                            meshArgs: [60, 100, 100],
                            position: [0.0, 0.0, 0.0],
                        }}
                        urlTexture="Model_Textures/2k_sun.jpg"
                    />
                    <Bloom />
                </EffectComposer>
                <Moon
                    spinningOrbitingSphereParams={{
                        rotationSpeed: 0.015,
                        receiveshadow: false,
                        castshadow: false,
                        meshArgs: [0.6, 30, 30],
                        position: [0.0, 0.0, 0.0],
                        orbitDistance: 6,
                        orbitSpeed: 3
                    }}
                    urlTexture="Model_Textures/nasa_moon_4k.jpg"
                    planetOrbitDistance={earthOrbitRadius}
                    planetOrbitSpeed={earthOrbitSpeed}
                />
                <PlanetClouds
                    spinningOrbitingSphereParams={{
                        rotationSpeed: 0.005,
                        receiveshadow: true,
                        castshadow: false,
                        meshArgs: [4.03, 30, 30],
                        position: [0.0, 0.0, 0.0],
                        orbitDistance: earthOrbitRadius,
                        orbitSpeed: earthOrbitSpeed,
                    }}
                    urlTexture="Model_Textures/fair_clouds_4k.png"
                />
                <Planet
                    spinningOrbitingSphereParams={{
                        rotationSpeed: 0.003,
                        receiveshadow: true,
                        castshadow: false,
                        meshArgs: [4, 60, 60],
                        position: [0.0, 0.0, 0.0],
                        orbitDistance: earthOrbitRadius,
                        orbitSpeed: earthOrbitSpeed
                    }}
                    urlTexture='Model_Textures/basicTexture.jpg'
                    urlBumpmap='Model_Textures/bumpmap.jpg'
                    bumpScale={15}
                    urlSpecularmap="Model_Textures/water_4k.png"
                    reflectivity={1}
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
