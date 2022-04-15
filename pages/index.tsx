
import * as THREE from 'three'
import styles from '/styles/Home.module.css'
import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense } from "react";
import { TextureLoader, CameraHelper, Camera, Vector3 } from 'three'
import { Text, Loader, OrthographicCamera, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useSpring, animated } from '@react-spring/three'
import { useGesture } from '@use-gesture/react'
import { useCamera } from '@react-three/drei'


React.useLayoutEffect = React.useEffect





function ResponsiveCamera() {

  const context = useThree()

  const fov = useRef<number>(75)


  //for some reason the commented implementation below is bugged and doesn't recognise the fov property

  switch (true) {

    case context.viewport.aspect < 0.5:

      //   context.camera.fov = 110

      fov.current = 110

      break;

    case context.viewport.aspect < 0.6:

      //  context.camera.fov = 100

      fov.current = 100

      break;

    case context.viewport.aspect < 0.8:

      // context.camera.fov = 90

      fov.current = 90

      break;

    default:

      // context.camera.fov = 75

      fov.current = 75
  }


  return (<mesh>

    <PerspectiveCamera rotation={[0, 3.15, 0]} makeDefault={true} name="camera" position={[0, 0, -1.4]} fov={fov.current} />

  </mesh>)


}


function Sky({ url }: { url: string }): JSX.Element {



  const texture = useLoader(TextureLoader, url);

  return (

    <mesh position={[0.0, 0.0, 0.0]}  >
      <Text outlineColor="white" outlineWidth={0.005} color="black" position={[0, 0, -1.4]} rotation={[0, -9.4, 0]} anchorX="center" anchorY="middle" font="/fonts/Roboto-Black-webfont.woff">Software Development that is</Text><Text color="white" position={[0, -0.075, -2.1]} rotation={[0, -9.4, 0]} anchorX="center" anchorY="middle" font="/fonts/Roboto-Black-webfont.woff">simply out</Text><Text color="white" position={[0, -0.175, -2.1]} rotation={[0, -9.4, 0]} anchorX="center" anchorY="middle" font="/fonts/Roboto-Black-webfont.woff">of this world.</Text>
      <boxBufferGeometry args={[100, 100, 100]} attach="geometry" />
      <meshBasicMaterial side={2} map={texture} attach="material" />
    </mesh>
  )


}









function Earth({ urlTexture, urlBumpmap }: { urlTexture: string, urlBumpmap: string }): JSX.Element {

  const mesh = useRef<THREE.Mesh>(null)





  const cameraStartPosZ = -1.8

  var cameraEndPosZ: number = cameraStartPosZ - 0.8

  var currentPosZ: number = cameraStartPosZ


  const [texture, bumpmap] = useLoader(TextureLoader, [urlTexture, urlBumpmap]);




  useFrame(state => {


    if (mesh?.current) {
      mesh.current.rotation.y += 0.0003
    }

    //every second we decrease the value by 0.001
    if (currentPosZ >= cameraEndPosZ) {

      currentPosZ -= 0.0015

    }



    //we set the position of the camera to the currentPosZ    

    state.camera.position.set(0, 0, currentPosZ)


  })


  return (
    <mesh position={[0.0, 0.0, 0.0]} ref={mesh} castShadow={true} receiveShadow={true} >

      <meshStandardMaterial map={texture} bumpMap={bumpmap} bumpScale={0.05} />

      <sphereBufferGeometry args={[1, 60, 60]} attach="geometry" />

    </mesh>
  )
}


function EarthClouds({ url }: { url: string }): JSX.Element {

  const texture = useLoader(TextureLoader, url);


  const mesh = useRef<THREE.Mesh>(null)

  useFrame(state => {
    if (mesh.current?.rotation) {
      mesh.current.rotation.y += 0.00035
    }

  })

  return (
    <mesh position={[0.0, 0.0, 0.0]} ref={mesh} castShadow={true} receiveShadow={true}  >
      <meshPhongMaterial map={texture} transparent={true} />
      <sphereBufferGeometry args={[1.01, 30.01, 30.01]} attach="geometry" />
    </mesh>
  )
}


function Moon({ urlTexture, urlNormalmap }: { urlTexture: string, urlNormalmap: string }): JSX.Element {



  const mesh = useRef<THREE.Mesh>(null)

  const [texture, normalmap] = useLoader(TextureLoader, [urlTexture, urlNormalmap], undefined, function () {
    console.log('loading');
  });



  var orbitRadius = 1.8; //distance from the origin 

  var incrementer


  useFrame(state => {

    // this will always have a set value of 0 meaning initial start position will be math.cos(0) * 2  and math.sin(0) * 2 == x:2, y:0, z:0 initial orbit position
    incrementer = state.clock.getElapsedTime() / 5

    if (mesh.current?.rotation && mesh.current?.position) {

      mesh.current.rotation.y += 0.001

      mesh.current.position.set(
        Math.cos(incrementer) * orbitRadius,
        0,
        Math.sin(incrementer) * orbitRadius
      )


    }


  })


  return (

    <mesh position={[0.0, 0.0, 0.0]} ref={mesh} castShadow={true} receiveShadow={true} >

      <meshStandardMaterial map={texture} normalMap={normalmap} />
      <sphereBufferGeometry args={[0.25, 120, 120]} attach="geometry" />
    </mesh>
  )


}


export default function App(): JSX.Element {






  return (
    <div className={styles.bruh} >



      <Canvas shadows={true}   >



        <Suspense fallback={null}>


          <ResponsiveCamera />

          <Sky url={'Model_Textures/galaxy_starfield.png'} />


          <directionalLight position={[1, 1, -1]} intensity={1} />



          <Moon urlTexture={'Model_Textures/moon_4k_color_brim16.jpg'} urlNormalmap={'Model_Textures/moon_4k_normal.jpg'} />



          <EarthClouds url={'Model_Textures/fair_clouds_4k.png'} />



          <Earth urlTexture={'Model_Textures/basicTexture.jpg'} urlBumpmap={'Model_Textures/bumpmap.jpg'} />

        </Suspense>
      </Canvas>
      <Loader />

      <div />
      <div className={styles.swag} >
        <h1>About me</h1>
        <p>I am a </p>
      </div>
    </div>
  )


}
