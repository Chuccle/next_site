
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Space } from './background';
import Moon from './moon';
import { Planet, PlanetClouds, OrbitLine } from './planet';
import { Star } from './star';
import { Loader } from './util';
import useScrollBlock from '../utils';

//TODO: make spaceText underlined by orbit rings?

function SpaceScene(): JSX.Element {

    const planetRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);
    const starRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);
    const { camera } = useThree();

    const orbitRadiusEarth: number = 40;
    const orbitSpeedEarth: number = 22.5;

    const orbitRadiusMercury: number = 20;
    const orbitSpeedMercury: number = 7.5;

    const orbitRadiusVenus: number = 30;
    const orbitSpeedVenus: number = 15;


    const [zoomOut, setZoomOut] = useState(0);

    const [blockScroll, allowScroll] = useScrollBlock();

    const [orbitRings, setOrbitRings] = useState(false);

    useEffect(() => {

        window.addEventListener('wheel', function (evt) {
            ScrollEventHandler(evt, setZoomOut);
        });
        window.addEventListener('keydown', function (evt) {
            ScrollEventHandler(evt, setZoomOut);
        });
        window.addEventListener('touchmove', function (evt) {
            ScrollEventHandler(evt, setZoomOut);
        });
        blockScroll();

    }, [blockScroll]);


    useFrame(state => {

        // Ensure planetRef is defined
        if (planetRef.current && starRef.current) {

            // Calculate the current angle of the planet's orbit
            const currentTime: number = state.clock.getElapsedTime() / orbitSpeedEarth;

            const planetPosition = new THREE.Vector3();
            planetRef.current.getWorldPosition(planetPosition); // Get world position of the planet

            const starPosition = new THREE.Vector3();
            starRef.current.getWorldPosition(starPosition); // Get world position of the star

            const distance = -12.5 - zoomOut * 100; // Distance from the planet to the camera
            const angle = currentTime % (2 * Math.PI); // Ensure angle is within [0, 2*pi]

            // if (zoomOut !== 0)
            //     setZoomOut(prevzoomOut => prevzoomOut + 0.000001);

            // Define target positions and look-at points for the two views
            let targetCameraPosition, targetLookAt;
            if (zoomOut < 0.15) {
                targetCameraPosition = new THREE.Vector3(
                    planetPosition.x + distance * Math.cos(angle),
                    planetPosition.y,
                    planetPosition.z + distance * Math.sin(angle)
                );
                targetLookAt = planetPosition;
            } else {
                targetCameraPosition = new THREE.Vector3(0, 80, 0);
                targetLookAt = starPosition;
                setOrbitRings(true);
                allowScroll();


            }

            // Interpolate camera position and look-at point
            const t = 0.03; // Adjust the speed of transition
            camera.position.lerp(targetCameraPosition, t);
            camera.lookAt(targetLookAt);
        }

    });
    return (
        <>

            <Space starCount={500} >
                {/* <OrbitControls/> */}
                {/* <SpaceText
                    font={'/fonts/Helvetiker.json'}
                    matcapTextureName={'CB4E88_F99AD6_F384C3_ED75B9'}
                    textToDisplay={" Software\n    out of\n this world"}
                    size={9}
                    height={1}
                    scale={[1, 1, 1]}
                    position={[-31, 50, 0]}
                    rotation={[-1.5, 0, 0]}
                    curveSegments={24}
                    bevelsEnabled
                    bevelSegments={1}
                    bevelSize={0.008}
                    bevelThickness={0.03}
                    lineHeight={1}
                    letterSpacing={0.2}
                /> */}
                <EffectComposer>
                    <Bloom mipmapBlur luminanceThreshold={0} luminanceSmoothing={0.9} />
                    <Star
                        spinningSphereArgs={{
                            rotationSpeed: 0.00035,
                            receiveshadow: false,
                            castshadow: false,
                            meshArgs: [10, 30, 30],
                            position: [0.0, 0.0, 0.0],
                        }}
                        urlTexture="Model_Textures/2k_sun.jpg"
                        passedMeshRef={starRef}
                    />
                    <Bloom />
                </EffectComposer>
                <OrbitLine radius={orbitRadiusMercury} enabled={orbitRings} />
                <Planet
                    spinningOrbitingSphereParams={{
                        rotationSpeed: 0.0045,
                        receiveshadow: true,
                        castshadow: false,
                        meshArgs: [1.5, 30, 30],
                        position: [0.0, 0.0, 0.0],
                        orbitDistance: orbitRadiusMercury,
                        orbitSpeed: orbitSpeedMercury
                    }}
                    urlTexture='Model_Textures/2k_mercury.jpg'
                />
                <OrbitLine radius={orbitRadiusVenus} enabled={orbitRings} />
                <Planet
                    spinningOrbitingSphereParams={{
                        rotationSpeed: 0.0030,
                        receiveshadow: true,
                        castshadow: false,
                        meshArgs: [2.5, 30, 30],
                        position: [0.0, 0.0, 0.0],
                        orbitDistance: orbitRadiusVenus,
                        orbitSpeed: orbitSpeedVenus
                    }}
                    urlTexture='Model_Textures/2k_venus_surface.jpg'
                />
                <PlanetClouds
                    spinningOrbitingSphereParams={{
                        rotationSpeed: 0.0030,
                        receiveshadow: true,
                        castshadow: false,
                        meshArgs: [2.03, 30, 30],
                        position: [0.0, 0.0, 0.0],
                        orbitDistance: orbitRadiusVenus,
                        orbitSpeed: orbitSpeedVenus
                    }}
                    urlTexture='Model_Textures/2k_venus_atmosphere.jpg'
                />
                <Moon
                    spinningOrbitingSphereParams={{
                        rotationSpeed: 0.015,
                        receiveshadow: false,
                        castshadow: false,
                        meshArgs: [0.5, 15, 15],
                        position: [0.0, 0.0, 0.0],
                        orbitDistance: 5,
                        orbitSpeed: 3
                    }}
                    urlTexture="Model_Textures/nasa_moon_4k.jpg"
                    planetOrbitDistance={orbitRadiusEarth}
                    planetOrbitSpeed={orbitSpeedEarth}
                />
                <PlanetClouds
                    spinningOrbitingSphereParams={{
                        rotationSpeed: 0.0025,
                        receiveshadow: true,
                        castshadow: false,
                        meshArgs: [3.55, 30, 30],
                        position: [0.0, 0.0, 0.0],
                        orbitDistance: orbitRadiusEarth,
                        orbitSpeed: orbitSpeedEarth,
                    }}
                    urlTexture="Model_Textures/fair_clouds_4k.png"
                />
                <OrbitLine radius={orbitRadiusEarth} enabled={orbitRings} />
                <Planet
                    spinningOrbitingSphereParams={{
                        rotationSpeed: 0.0015,
                        receiveshadow: true,
                        castshadow: false,
                        meshArgs: [3.5, 30, 30],
                        position: [0.0, 0.0, 0.0],
                        orbitDistance: orbitRadiusEarth,
                        orbitSpeed: orbitSpeedEarth
                    }}
                    urlTexture='Model_Textures/basicTexture.jpg'
                    urlBumpmap='Model_Textures/bumpmap.jpg'
                    bumpScale={15}
                    urlSpecularmap="Model_Textures/water_4k.png"
                    reflectivity={1}
                    passedMeshRef={planetRef}
                />
            </Space>
            {/* <ambientLight></ambientLight> */}
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

function ScrollEventHandler(evt: Event, callback: CallableFunction) {
    switch (evt.type) {
        case "wheel": {
            const wheelEvt = evt as WheelEvent;
            if (wheelEvt.deltaY > 0) {
                // Scrolling down
                callback((prevzoomOut: number) => prevzoomOut + 0.0025);
            }
            break;
        }
        case "keydown": {
            const keyEvt = evt as KeyboardEvent;
            if (keyEvt.key === "ArrowDown") {
                // Pressing the down arrow key
                callback((prevzoomOut: number) => prevzoomOut + 0.0025);
            }
            break;
        }
        case "touchmove": {
            // TODO: Look at making this only occur on drag up on touchscreen devices
            callback((prevzoomOut: number) => prevzoomOut + 0.00025);
            break;
        }
    }
}

