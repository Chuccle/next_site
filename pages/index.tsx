import * as THREE from "three";
import styles from "/styles/Home.module.css";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { TextureLoader } from "three";
import { Text, Loader, PerspectiveCamera } from "@react-three/drei";

React.useLayoutEffect = React.useEffect;

function ResponsiveCamera() {
  const context = useThree();

  const fov = useRef<number>(75);

  //for some reason the commented implementation below is bugged and doesn't recognise the fov property

  switch (true) {
    case context.viewport.aspect < 0.5:

      fov.current = 110;

      break;

    case context.viewport.aspect < 0.6:

      fov.current = 100;

      break;

    case context.viewport.aspect < 0.7:

      fov.current = 90;

      break;

    default:

      fov.current = 80;
  }

  // Less verbose and is too tricky to follow a linear formula

  //if (context.viewport.aspect < 0.7) {
  // fov.current = 10 * (context.viewport.aspect + 10)
  // }

  return (
    <mesh>
      <PerspectiveCamera
        rotation={[0, 3.15, 0]}
        makeDefault={true}
        name="camera"
        position={[0, 0, -1.4]}
        fov={fov.current}
      />
    </mesh>
  );
}

function Sky({ url }: { url: string }): JSX.Element {
  const texture = useLoader(TextureLoader, url);

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
  const mesh = useRef<THREE.Mesh>(null);

  const cameraStartPosZ = -1.8;

  var cameraEndPosZ: number = cameraStartPosZ - 0.8;

  var currentPosZ: number = cameraStartPosZ;

  const [texture, bumpmap] = useLoader(TextureLoader, [urlTexture, urlBumpmap]);

  useFrame((state) => {
    if (mesh?.current) {
      mesh.current.rotation.y += 0.0003;
    }

    //every second we decrease the value by 0.001
    if (currentPosZ >= cameraEndPosZ) {
      currentPosZ -= 0.0015;
    }

    //we set the position of the camera to the currentPosZ

    state.camera.position.set(0, 0, currentPosZ);
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
  const texture = useLoader(TextureLoader, url);

  const mesh = useRef<THREE.Mesh>(null);

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
  const mesh = useRef<THREE.Mesh>(null);

  const [texture, normalmap] = useLoader(
    TextureLoader,
    [urlTexture, urlNormalmap],
    undefined,
    function () {
      console.log("loading");
    }
  );

  var orbitRadius = 1.8; //distance from the origin

  var incrementer;

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

function Sidebar(): JSX.Element {
  const [sidebarActive, SetSidebarActive] = useState(false);

  return (
    <>
      <div
        className={styles.SidebarBtn}
        onClick={
          sidebarActive
            ? () => SetSidebarActive(false)
            : () => SetSidebarActive(true)
        }
      >
        &#9776;
      </div>
      <div className={sidebarActive ? styles.Sidebar : styles.SidebarInvis}>
        <div className={styles.SidebarElementContainer}>
          <a className={styles.SidebarElement} href="#home">
            Home
          </a>
          <a className={styles.SidebarElement} href="#news">
            News
          </a>
          <a className={styles.SidebarElement} href="#contact">
            Contact
          </a>
        </div>
      </div>
    </>
  );
}

export default function App(): JSX.Element {
  return (
    <div className={styles.mainbackground}>
      <Sidebar />

      <Canvas className={styles.canvas} shadows={true}>
        <Suspense fallback={null}>
          <ResponsiveCamera />

          <Sky url={"Model_Textures/galaxy_starfield.png"} />

          <directionalLight position={[1, 1, -1]} intensity={1} />

          <Moon
            urlTexture={"Model_Textures/moon_4k_color_brim16.jpg"}
            urlNormalmap={"Model_Textures/moon_4k_normal.jpg"}
          />

          <EarthClouds url={"Model_Textures/fair_clouds_4k.png"} />

          <Earth
            urlTexture={"Model_Textures/basicTexture.jpg"}
            urlBumpmap={"Model_Textures/bumpmap.jpg"}
          />
        </Suspense>
      </Canvas>
      <Loader />

      <section className={styles.accent}>
        <img
          src="/Site_Assets/Spaceman.png"
          alt="Picture of the author"
          className={styles.IntroImage}
        />

        <div className={styles.Introbox}>
          <h1 className={styles.IntroTitleText}>Hi, my name is Charlie</h1>
          <p className={styles.IntroText}>
            I am a software developer that is always pushing the boundaries on
            what is possible.{" "}
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
              Javascript, Typescript, HTML, CSS and frameworks like React and
              Next.js
            </p>

            <h2 className={styles.subheading}>Lorem ipsum dolor amet </h2>
            <p className={styles.boxText}>
              Javascript, Typescript, HTML, CSS and frameworks like React and
              Next.js
            </p>

            <h2 className={styles.subheading}>Lorem ipsum dolor amet </h2>
            <p className={styles.boxText}>
              Javascript, Typescript, HTML, CSS and frameworks like React and
              Next.js
            </p>

            <h2 className={styles.subheading}>Lorem ipsum dolor amet </h2>
            <p className={styles.boxText}>
              Javascript, Typescript, HTML, CSS and frameworks like React and
              Next.js
            </p>
          </div>

          <div className={styles.section2}>
            <img
              className={styles.section1Icon}
              src={"/Site_Assets/html2.svg"}
            />
            <h1 className={styles.boxTitleText}>Application Architecture </h1>
            <p className={styles.boxText}>
              Designing software stacks and designing and researching into
              solutions
              <br />
              Security, understanding of vulnerabilities and secure solutions
              (JWT)
            </p>
            <h2 className={styles.subheading}>Lorem ipsum dolor amet </h2>
            <p className={styles.boxText}>
              Security, understanding of vulnerabilities and secure solutions
              (JWT){" "}
            </p>
            <h2 className={styles.subheading}>Lorem ipsum dolor amet </h2>
            <p className={styles.boxText}>
              Security, understanding of vulnerabilities and secure solutions
              (JWT){" "}
            </p>
            <h2 className={styles.subheading}>Lorem ipsum dolor amet </h2>
            <p className={styles.boxText}>
              Security, understanding of vulnerabilities and secure solutions
              (JWT){" "}
            </p>
          </div>

          <div className={styles.section3}>
            <img
              className={styles.section1Icon}
              src={"/Site_Assets/html3.svg"}
            />
            <h1 className={styles.boxTitleText}>Back-end Development</h1>
            <p className={styles.boxText}>
              Efficient SQL schema, MySQL, MariaDB, MongoDB and Node.js with
              Express
            </p>
            <h2 className={styles.subheading}>Lorem ipsum dolor amet </h2>
            <p className={styles.boxText}>
              Security, understanding of vulnerabilities and secure solutions
              (JWT){" "}
            </p>
            <h2 className={styles.subheading}>Lorem ipsum dolor amet </h2>
            <p className={styles.boxText}>
              Security, understanding of vulnerabilities and secure solutions
              (JWT){" "}
            </p>
            <h2 className={styles.subheading}>Lorem ipsum dolor amet </h2>
            <p className={styles.boxText}>
              Security, understanding of vulnerabilities and secure solutions
              (JWT){" "}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.background}>
        <div className={styles.container}>
          <h1 className={styles.ProjectSectionTitleText}>My projects</h1>
          <p className={styles.IntroText}>
            Here are some projects I have created{" "}
          </p>

          <div className={styles.projectgrid}>
            <div className={styles.card1}>
              <a href="quizapp">
                <img
                  className={styles.gridthumb}
                  src={"/Site_Assets/Quizapp.png"}
                ></img>
              </a>
              <p className={styles.caption}>Quizapp</p>
            </div>

            <div className={styles.card2}>
              <a href="alarmsystem">
                {" "}
                <img
                  className={styles.gridthumb}
                  src={"/Site_Assets/Quizapp.png"}
                ></img>
              </a>
              <p className={styles.caption}>Alarm System</p>
            </div>

            <div className={styles.card3}>
              <a href="taxiapp">
                {" "}
                <img
                  className={styles.gridthumb}
                  src={"/Site_Assets/Quizapp.png"}
                ></img>{" "}
              </a>
              <p className={styles.caption}>TaxiApp</p>
            </div>

            <div className={styles.card1}>
              <a href="rentalapp">
                {" "}
                <img
                  className={styles.gridthumb}
                  src={"/Site_Assets/Quizapp.png"}
                ></img>
              </a>
              <p className={styles.caption}>Rental app</p>
            </div>

            <div className={styles.card2}>
              <a href="phpwebpage">
                {" "}
                <img
                  className={styles.gridthumb}
                  src={"/Site_Assets/Quizapp.png"}
                ></img>
              </a>
              <p className={styles.caption}>PHP website</p>
            </div>

            <div className={styles.card3}>
              <a href="portfolio">
                {" "}
                <img
                  className={styles.gridthumb}
                  src={"/Site_Assets/Quizapp.png"}
                ></img>
              </a>
              <p className={styles.caption}>Portfolio site</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
