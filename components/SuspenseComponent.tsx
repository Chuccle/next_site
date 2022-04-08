import * as THREE from 'three'
import styles from '/styles/Home.module.css'
import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import useWindowDimensions from "../hooks/useWindowDimensions"
import { OrbitControls } from '@react-three/drei'





function Sky(): JSX.Element {

  const texture = new THREE.TextureLoader().load('Model_Textures/galaxy_starfield.png');

  return (
    <mesh position={[0.0, 0.0, 0.0]}  >
      <boxBufferGeometry args={[100, 100, 100]} attach="geometry" />
      <meshBasicMaterial side={2} map={texture} attach="material" />
    </mesh>
  )
}

function Earth() {

  const mesh = useRef<THREE.Mesh>(null)

  var cameraStartPosZ = ViewportAdjustment()

  var cameraEndPosZ: number = cameraStartPosZ - 0.75

  var currentPosZ: number = cameraStartPosZ





  function ViewportAdjustment() {

    // var windowWidth = useWindowDimensions().width || 0 //
    // var windowHeight = useWindowDimensions().height || 0



    //if (windowHeight > windowWidth) {

    //console.log("height is greater or equal to width")


    return -1.75

  }


  const texture: THREE.Texture = new THREE.TextureLoader().load('Model_Textures/basicTexture.jpg');

  const bumpmap = new THREE.TextureLoader().load('Model_Textures/bumpmap.jpg');

  useFrame(state => {



    if (mesh.current?.rotation) {
      mesh.current.rotation.y += 0.0003
    }




    //every second we decrease the value by 0.001
    if (currentPosZ >= cameraEndPosZ) {

      currentPosZ -= 0.0015

    }



    //we set the position of the camera to the currentPosZ    
    state.camera.position.z = currentPosZ


  })


  return (
    <mesh position={[0.0, 0.0, 0.0]} ref={mesh} castShadow={true} receiveShadow={true} >



      <meshStandardMaterial map={texture} bumpMap={bumpmap} bumpScale={0.05} />
      <sphereBufferGeometry args={[1, 60, 60]} attach="geometry" />

    </mesh>
  )
}


function EarthClouds() {

  const mesh = useRef<THREE.Mesh>()
  //const shaderMat = useRef()
  const texture = new THREE.TextureLoader().load('Model_Textures/fair_clouds_4k.png');


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


function Moon() {


  const mesh = useRef<THREE.Mesh>(null)

  const texture = new THREE.TextureLoader().load('/Model_Textures/moon_4k_color_brim16.jpg',);

  const normalmap = new THREE.TextureLoader().load('/Model_Textures/moon_4k_normal.jpg',);

  var orbitRadius = 2; // for example

  var date;




  useFrame(state => {
    date = Date.now() * 0.0001;


    if (mesh.current?.rotation && mesh.current?.position) {

      mesh.current.rotation.y += 0.001

      mesh.current.position.set(
        Math.cos(date) * orbitRadius,
        0,
        Math.sin(date) * orbitRadius
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
export default function App() {
  


  return(
 <> <h1 className={styles.bruh2}>Software solutions that are</h1>
    <h1 className={styles.bruh3}>simply out of this world.</h1>
  <Canvas shadows={true} camera={{ position: [0, 0, -0.1] }}>
  <Sky />
  <directionalLight position={[1, 1, -1]} intensity={1} />
  <Moon />
  <EarthClouds />
  <Earth />
</Canvas></>  
  )




}



