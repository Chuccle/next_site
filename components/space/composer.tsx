
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { Space } from './background';
import Moon from './moon';
import { Planet, PlanetClouds, OrbitLine } from './planet';
import { Star } from './star';
import { Stats } from '@react-three/drei';
import SpaceText from './text';
import { useLenis } from '@studio-freight/react-lenis';
import { usePostProcess } from '../EffectComposer';

//TODO: make spaceText underlined by orbit rings?
// block scroll should maybe be longer?

export default function SpaceScene(): JSX.Element {

    const planetRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);
    const starRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    const orbitRefGroup = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];

    const zoomOutRef: React.MutableRefObject<number> = useRef<number>(0);

    const { camera } = useThree();

    const orbitRadiusEarth: number = 40;
    const orbitSpeedEarth: number = 22.5;

    const orbitRadiusMercury: number = 20;
    const orbitSpeedMercury: number = 7.5;

    const orbitRadiusVenus: number = 30;
    const orbitSpeedVenus: number = 15;

    useLenis(() => {
        // called every scroll
        zoomOutRef.current += 0.0005;
 
    });

    usePostProcess();
  
    // So we don't constantly allocate per frame
    const planetPosition: THREE.Vector3 = new THREE.Vector3();
    const starPosition: THREE.Vector3 = new THREE.Vector3();

    useFrame(state => {

        // Ensure planetRef is defined
        if (planetRef.current && starRef.current) {

            orbitRefGroup.forEach(value => {
                if (value.current)
                    value.current.visible = false;
            });

            // Calculate the current angle of the planet's orbit
            const currentTime: number = state.clock.getElapsedTime() / orbitSpeedEarth;

            planetRef.current.getWorldPosition(planetPosition); // Get world position of the planet

            starRef.current.getWorldPosition(starPosition); // Get world position of the star

            const distance = -12.5 - zoomOutRef.current * 100; // Distance from the planet to the camera
            const angle = currentTime % (2 * Math.PI); // Ensure angle is within [0, 2*pi]

            // Define target positions and look-at points for the two views
            let targetLookAt: THREE.Vector3;
            let targetCameraPosition: THREE.Vector3Tuple;

            if (zoomOutRef.current < 0.15) {
                targetCameraPosition = [
                    planetPosition.x + distance * Math.cos(angle),
                    planetPosition.y,
                    planetPosition.z + distance * Math.sin(angle)
                ];
                // share the pointer please
                targetLookAt = planetPosition;
            } else {
                orbitRefGroup.forEach(value => {
                    if (value.current)
                        value.current.visible = true;
                });
                targetCameraPosition = [0, 80, 0];
                // share the pointer please
                targetLookAt = starPosition;
            }

            // Interpolate camera position and look-at point
            const t = 0.03; // Adjust the speed of transition
            camera.position.lerp({ x: targetCameraPosition[0], y: targetCameraPosition[1], z: targetCameraPosition[2] }, t);
            camera.lookAt(targetLookAt);
        }

    });
    return (
        <>
                <color attach='background' args={["black"]} />
                <Stats />

                <Space starCount={500} >
                    <pointLight decay={0} castShadow={true} />
                    {/* <OrbitControls/> */}
                    <SpaceText
                        font={'/fonts/helvetiker_bold.json'}
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
                    />
                    <Star
                        rotationSpeed={0.00035}
                        receiveshadow={false}
                        castshadow={false}
                        meshArgs={[10, 30, 30]}
                        position={[0.0, 0.0, 0.0]}
                        urlTexture="Model_Textures/2k_sun.jpg"
                        passedMeshRef={starRef}
                    />
                    <OrbitLine radius={orbitRadiusMercury} passedMeshRef={orbitRefGroup[0]} />
                    <Planet
                        type='standard'
                        rotationSpeed={0.0045}
                        receiveshadow={false}
                        castshadow={false}
                        meshArgs={[1.5, 30, 30]}
                        position={[0.0, 0.0, 0.0]}
                        orbitDistance={orbitRadiusMercury}
                        orbitSpeed={orbitSpeedMercury}
                        urlTexture='Model_Textures/2k_mercury.jpg'
                    />
                    <OrbitLine radius={orbitRadiusVenus} passedMeshRef={orbitRefGroup[1]} />
                    <Planet
                        type='standard'
                        rotationSpeed={0.0030}
                        receiveshadow={false}
                        castshadow={false}
                        meshArgs={[2.5, 30, 30]}
                        position={[0.0, 0.0, 0.0]}
                        orbitDistance={orbitRadiusVenus}
                        orbitSpeed={orbitSpeedVenus}
                        urlTexture='Model_Textures/2k_venus_atmosphere.jpg'
                    />
                    <Moon
                        rotationSpeed={0.015}
                        receiveshadow={false}
                        castshadow={false}
                        meshArgs={[0.5, 15, 15]}
                        position={[0.0, 0.0, 0.0]}
                        orbitDistance={5}
                        orbitSpeed={3}
                        urlTexture="Model_Textures/nasa_moon_4k.jpg"
                        planetOrbitDistance={orbitRadiusEarth}
                        planetOrbitSpeed={orbitSpeedEarth}
                    />
                    <PlanetClouds
                        rotationSpeed={0.0025}
                        receiveshadow={false}
                        castshadow={false}
                        meshArgs={[3.55, 30, 30]}
                        position={[0.0, 0.0, 0.0]}
                        orbitDistance={orbitRadiusEarth}
                        orbitSpeed={orbitSpeedEarth}
                        urlTexture="Model_Textures/fair_clouds_4k.png"
                    />
                    <OrbitLine radius={orbitRadiusEarth} passedMeshRef={orbitRefGroup[2]} />
                    <Planet
                        type='bumpyAndReflective'
                        urlTexture='Model_Textures/basicTexture.jpg'
                        rotationSpeed={0.0015}
                        receiveshadow={false}
                        castshadow={false}
                        meshArgs={[3.5, 30, 30]}
                        position={[0.0, 0.0, 0.0]}
                        orbitDistance={orbitRadiusEarth}
                        orbitSpeed={orbitSpeedEarth}
                        passedMeshRef={planetRef}
                        urlBumpmap='Model_Textures/bumpmap.jpg'
                        bumpScale={15}
                        urlSpecularmap="Model_Textures/water_4k.png"
                        reflectivity={1}
                    />
                </Space>
                {/* <ambientLight></ambientLight> */}
        </>
    );
}

// function ScrollEventHandler(evt: Event, zoomOutRef: React.MutableRefObject<number>) {
//     switch (evt.type) {
//         case "wheel": {
//             const wheelEvt = evt as WheelEvent;
//             if (wheelEvt.deltaY > 0) {
//                 // Scrolling down
//                 zoomOutRef.current += 0.005;
//             }
//             break;
//         }
//         case "keydown": {
//             const keyEvt = evt as KeyboardEvent;
//             if (keyEvt.key === "ArrowDown") {
//                 // Pressing the down arrow key
//                 zoomOutRef.current += 0.005;
//             }
//             break;
//         }
//         case "touchmove": {
//             // TODO: Look at making this only occur on drag up on touchscreen devices
//             zoomOutRef.current += 0.0025;
//             break;
//         }
//     }
// }

