import * as THREE from "three";
import styles from "/styles/Home.module.css";
import React, { useRef, Suspense } from "react";
import { Canvas, RootState, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Text, PerspectiveCamera } from "@react-three/drei";
import Link from "next/link";
import Image from "next/image";
import { Html, useProgress } from '@react-three/drei'


let cameraPos = -1.8; // Needs to be global so it persists between renders

function Loader() {

    const { progress } = useProgress();

    return (
        <Html center className={styles.loader}>
            <div className={styles.spinner}></div>
            <div className={styles.text}>{Math.floor(progress)} % loaded</div>
        </Html>
    );
}

function ResponsiveCamera(): JSX.Element {

    const context: RootState = useThree();

    const fov: React.MutableRefObject<number> = useRef<number>(75);


    const mesh: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

  
    const camerainitialPosZ: number = -1.8; //start position of the camera

    const cameraEndPosZ: number = camerainitialPosZ - 0.8;


    // will increase fov based on aspect ratio to prevent model clipping
    if (context.viewport.aspect < 0.8) {

        fov.current = 10 * (context.viewport.aspect + 10)

    } else {

        fov.current = 80;

    }

    useFrame((state) => {

        //every second we decrease the value by 0.001
        if (cameraPos >= cameraEndPosZ) {
            cameraPos -= 0.0015;
        }

        //we set the position of the camera to the currentPosZ
        state.camera.position.set(0, 0, cameraPos);
    });


    return (
        <mesh>
            <PerspectiveCamera
                rotation={[0, 3.15, 0]}
                makeDefault={true}
                name="camera"
                ref={mesh}
                position={[0, 0, -1.4]}
                fov={fov.current}
            />
        </mesh>
    );
}

function Space({ url }: { url: string }): JSX.Element {

    const texture: THREE.Texture = useLoader(THREE.TextureLoader, url);

    return (
        <mesh position={[0.0, 0.0, 0.0]}>
            <Text
                outlineColor="white"
                outlineWidth={0.005}
                color="black"
                position={[0, 0, -1.4]}
                rotation={[0, -9.4, 0]}
                anchorX="center"
                anchorY="middle"
                font="/fonts/Roboto-Black-webfont.woff"
            >
                Software Development that is
            </Text>
            <Text
                color="white"
                position={[0, -0.075, -2.1]}
                rotation={[0, -9.4, 0]}
                anchorX="center"
                anchorY="middle"
                font="/fonts/Roboto-Black-webfont.woff"
            >
                simply out
            </Text>
            <Text
                color="white"
                position={[0, -0.175, -2.1]}
                rotation={[0, -9.4, 0]}
                anchorX="center"
                anchorY="middle"
                font="/fonts/Roboto-Black-webfont.woff"
            >
                of this world.
            </Text>
            <boxBufferGeometry args={[100, 100, 100]} attach="geometry" />
            <meshBasicMaterial side={2} map={texture} attach="material" />
        </mesh>
    );
}

function Earth({
    urlTexture,
    urlBumpmap,
}: {
    urlTexture: string;
    urlBumpmap: string;
}): JSX.Element {

    const mesh: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);


    const [texture, bumpmap]: THREE.Texture[] = useLoader(THREE.TextureLoader, [urlTexture, urlBumpmap]);

    useFrame((state) => {

        if (mesh?.current) {
            mesh.current.rotation.y += 0.0003;
        }

    });

    return (
        <mesh
            position={[0.0, 0.0, 0.0]}
            ref={mesh}
            castShadow={true}
            receiveShadow={true}
        >
            <meshStandardMaterial map={texture} bumpMap={bumpmap} bumpScale={0.15} />

            <sphereBufferGeometry args={[1, 60, 60]} attach="geometry" />
        </mesh>
    );
}

function EarthClouds({ url }: { url: string }): JSX.Element {

    const texture: THREE.Texture = useLoader(THREE.TextureLoader, url);

    const mesh: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (mesh.current?.rotation) {
            mesh.current.rotation.y += 0.00035;
        }
    });

    return (
        <mesh
            position={[0.0, 0.0, 0.0]}
            ref={mesh}
            castShadow={true}
            receiveShadow={true}
        >
            <meshPhongMaterial map={texture} transparent={true} />
            <sphereBufferGeometry args={[1.01, 30.01, 30.01]} attach="geometry" />
        </mesh>
    );
}

function Moon({
    urlTexture,
    urlNormalmap,
}: {
    urlTexture: string;
    urlNormalmap: string;
}): JSX.Element {

    const mesh: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    const [texture, normalmap]: THREE.Texture[] = useLoader(
        THREE.TextureLoader,
        [urlTexture, urlNormalmap],
        undefined,
        function () {
            console.log("loading");
        }
    );

    var orbitRadius: number = 1.8; //distance from the origin

    var incrementer: number; //incrementer for the orbit

    useFrame((state) => {
        // this will always have a set value of 0 meaning initial start position will be math.cos(0) * 2  and math.sin(0) * 2 == x:2, y:0, z:0 initial orbit position
        incrementer = state.clock.getElapsedTime() / 5;

        if (mesh.current?.rotation && mesh.current?.position) {

            mesh.current.rotation.y += 0.0015;

            mesh.current.position.set(
                Math.cos(incrementer) * orbitRadius,
                0,
                Math.sin(incrementer) * orbitRadius
            );
        }
    });

    return (
        <mesh
            position={[0.0, 0.0, 0.0]}
            ref={mesh}
            castShadow={true}
            receiveShadow={true}
        >
            <meshStandardMaterial map={texture} normalMap={normalmap} />
            <sphereBufferGeometry args={[0.25, 120, 120]} attach="geometry" />
        </mesh>
    );
}


export default function App(): JSX.Element {
    return (
        <div>

            <div className={styles.background3D}>

                <Canvas shadows={true}>

                    <Suspense fallback={<Loader />}>
                        <ResponsiveCamera />

                        <Suspense fallback={<Space url="BufferTextures/galaxy_starfield_1024x512.png" />}>
                            <Space url={"Model_Textures/galaxy_starfield.png"} />
                        </Suspense>

                        <directionalLight position={[1, 1, -1]} intensity={1} />

                        <Suspense fallback={
                            <Moon
                                urlTexture={"BufferTextures/moon1024x512.jpg"}
                                urlNormalmap={"BufferTextures/moonNormal1024x512.jpg"}
                            />}>

                            <Moon
                                urlTexture={"Model_Textures/moon_4k_color_brim16.jpg"}
                                urlNormalmap={"Model_Textures/moon_4k_normal.jpg"}
                            />
                        </Suspense>

                        <Suspense fallback={<EarthClouds url={"BufferTextures/fair_clouds_1024x512.png"} />}>
                            <EarthClouds url={"Model_Textures/fair_clouds_4k.png"} />
                        </Suspense>

                        <Suspense fallback={
                            <Earth
                                urlTexture={"BufferTextures/basicTexture_1024x512.jpg"}
                                urlBumpmap={"BufferTextures/bumpmap_1024x512.jpg"}
                            />}>
                            <Earth
                                urlTexture={"Model_Textures/basicTexture.jpg"}
                                urlBumpmap={"Model_Textures/bumpmap.jpg"}
                            />

                        </Suspense>
                    </Suspense>
                </Canvas>

            </div>
            <section className={styles.accent}>

                <Image src="/Site_Assets/Spaceman.png" alt="Picture of the author" width={'250'} height={'250'} />

                <div className={styles.Introbox}>

                    <h1 className={styles.IntroTitleText}>Hi, my name is Charlie</h1>

                    <p className={styles.IntroText}>
                        I am a software developer that is always pushing the boundaries on
                        what is possible.
                        <br />
                        I love to learn new things and I am always looking for new ways to improve my skills.
                    </p>

                </div>

            </section>

            <section className={styles.background}>

                <div className={styles.box}>

                    <div className={styles.section1}>

                        <img
                            className={styles.section1Icon}
                            src={"/Site_Assets/Icon.svg"}
                        />

                        <h1 className={styles.boxTitleText}>Front-end Development</h1>

                        <p className={styles.boxText}>
                            I am a developer with a passion for building beautiful and functional websites and software.
                        </p>

                        <h2 className={styles.subheading}>Languages</h2>

                        <p className={styles.boxText}>
                            Javascript, Typescript, HTML, CSS, Sass
                        </p>

                        <h2 className={styles.subheading}>Frameworks and technologies </h2>

                        <ul className={styles.boxText} style={{ listStyle: 'none', marginLeft: '0' }}>
                            <li style={{ marginTop: '1rem' }}>React.js</li>
                            <li style={{ marginTop: '1rem' }}>Next.js</li>
                            <li style={{ marginTop: '1rem' }}>Tailwind</li>
                            <li style={{ marginTop: '1rem' }}>Bootstrap</li>
                            <li style={{ marginTop: '1rem' }}>Three.js/WebGL</li>
                        </ul>

                    </div>

                    <div className={styles.section2}>
                        <img
                            className={styles.section1Icon}
                            src={"/Site_Assets/html2.svg"}
                        />

                        <h1 className={styles.boxTitleText}>Application Architecture </h1>

                        <p className={styles.boxText}>
                            Designing software stacks and designing and researching into
                            solutions.
                        </p>

                        <h2 className={styles.subheading}>Platforms I create for</h2>

                        <p className={styles.boxText}>
                            Web, Mobile, Desktop, IoT and more.
                        </p>

                        <h2 className={styles.subheading}>Machine to Machine connections </h2>

                        <p className={styles.boxText}>
                            Understanding how to connect machines and how to communicate between them wirelessly or wired.
                        </p>

                        <h2 className={styles.subheading}>Security </h2>

                        <ul className={styles.boxText} style={{ listStyle: 'none', marginLeft: '0' }}>
                            <li style={{ marginTop: '1rem' }}>Understanding of vulnerabilities and secure solutions</li>
                            <li style={{ marginTop: '1rem' }}>OWASP best practices, security testing, and security reviews</li>
                            <li style={{ marginTop: '1rem' }}>Encryption and hashing of sensitive data</li>
                        </ul>

                    </div>

                    <div className={styles.section3}>

                        <img
                            className={styles.section1Icon}
                            src={"/Site_Assets/html3.svg"}
                        />

                        <h1 className={styles.boxTitleText}>Back-end Development</h1>

                        <p className={styles.boxText}>
                            Efficient and Normalised databases, performant and scalable APIs and microservices.
                        </p>

                        <h2 className={styles.subheading}>Languages </h2>

                        <p className={styles.boxText}>
                            Rust, Node.js, SQL, JSON, PHP
                        </p>

                        <h2 className={styles.subheading}>Frameworks and technologies</h2>
                        <ul className={styles.boxText} style={{ listStyle: 'none', marginLeft: '0' }}>
                            <li style={{ marginTop: '1rem' }}>Express.js</li>
                            <li style={{ marginTop: '1rem' }}>PostgreSQL</li>
                            <li style={{ marginTop: '1rem' }}>MySQL</li>
                            <li style={{ marginTop: '1rem' }}>Actix</li>
                            <li style={{ marginTop: '1rem' }}>Diesel</li>
                            <li style={{ marginTop: '1rem' }}>Node.js</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <div className={styles.container}>
                    <h1 className={styles.ProjectSectionTitleText}>My projects</h1>
                    <p className={styles.IntroText}>
                        Here are some projects I have created
                    </p>

                    <div className={styles.projectgrid}>
                        <div className={styles.card1}>
                            <div className={styles.gridthumb}>
                                <Image layout="fill" src={"/Site_Assets/qal1.png"} alt={"link to Quizapp deep dive"} style={{ borderRadius: '1rem' }} />
                            </div>
                            <div className={styles.overlay} style={{ backgroundColor: '#a47ce4' }}>
                                <p className={styles.caption}>A fully-featured web application for creating and playing quizzes.</p>
                                <Link href="/quizapp" passHref>
                                    <p className={styles.button}>See more</p>
                                </Link>
                            </div>

                        </div>

                        <div className={styles.card2}>
                            <div className={styles.gridthumb}>
                                <Image layout="fill" src={"/Site_Assets/asl4.png"} alt={"link to Alarm system deep dive"} style={{ borderRadius: '1rem' }} />
                            </div>
                            <div className={styles.overlay} style={{ backgroundColor: '#104f6c' }}>
                                <p className={styles.caption}>A program to make smart alarms which send emails as alerts.</p>
                                <Link href="/alarmsystem" passHref>
                                    <p className={styles.button}>See more</p>
                                </Link>
                            </div>
                        </div>

                        <div className={styles.card3}>
                            <div className={styles.gridthumb}>
                                <Image layout="fill" src={"/Site_Assets/tal2.png"} alt={"link to Taxiapp deep dive"} style={{ borderRadius: '1rem' }} />
                            </div>
                            <div className={styles.overlay} style={{ backgroundColor: '#fbdb34' }}>
                                <p className={styles.caption} style={{ color: 'black' }}  >An Android app which works organises taxi appointments.</p>
                                <Link href="/taxiapp" passHref>
                                    <p className={styles.button} style={{ color: 'black', borderColor: 'black' }}>See more</p>
                                </Link>
                            </div>

                        </div>

                        <div className={styles.card1}>
                            <div className={styles.gridthumb}>
                                <Image layout="fill" src={"/Site_Assets/cral2.png"} alt={"link to Rental app deep dive"} style={{ borderRadius: '1rem' }} />
                            </div>
                            <div className={styles.overlay} style={{ backgroundColor: 'gray' }}>
                                <p className={styles.caption}>A desktop app which calculates the cost of a car and exports it</p>
                                <Link href="/carrentalapp" passHref>
                                    <p className={styles.button}>See more</p>
                                </Link>
                            </div>
                        </div>

                        <div className={styles.card2}>
                            <div className={styles.gridthumb}>
                                <Image layout="fill" src={"/Site_Assets/phpl.png"} alt={"link to PHP website deep dive"} style={{ borderRadius: '1rem' }} />
                            </div>
                            <div className={styles.overlay} style={{ backgroundColor: '#06abba' }}>
                                <p className={styles.caption}>A website which allows users to upload their CVs to a database</p>
                                <Link href="/phpsite" passHref>
                                    <p className={styles.button}>See more</p>
                                </Link>
                            </div>
                        </div>

                        <div className={styles.card3}>
                            <div className={styles.gridthumb}>
                                <Image layout="fill" src={"/Site_Assets/next_site.png"} alt={"link to portfolio website deep dive"} style={{ borderRadius: '1rem' }} />
                            </div>
                            <div className={styles.overlay} style={{ backgroundColor: '#000' }}>
                                <p className={styles.caption}>A website which shows WebGL graphics and animation </p>
                                <Link href="/nextsite" passHref>
                                    <p className={styles.button}>See more</p>
                                </Link> </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
