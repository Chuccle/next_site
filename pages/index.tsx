
import * as THREE from 'three'
import styles from '/styles/Home.module.css'
import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import useWindowDimensions from "../hooks/useWindowDimensions"
import { Suspense } from "react";
import { TextureLoader } from 'three'



import { Loader } from '@react-three/drei'



function Sky({url} : {url:string}): JSX.Element {

  const texture = useLoader(TextureLoader,url);
  



  return (
   
   <mesh position={[0.0, 0.0, 0.0]}  >
      <boxBufferGeometry args={[100, 100, 100]} attach="geometry" />
      <meshBasicMaterial side={2} map={texture} attach="material" />
    </mesh>
  )

  
}



function Earth({urlTexture, urlBumpmap} : {urlTexture:string, urlBumpmap:string}): JSX.Element {

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

  const [texture, bumpmap] = useLoader(TextureLoader,[urlTexture, urlBumpmap]);



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


function EarthClouds({url} : {url:string}): JSX.Element {

  const texture = useLoader(TextureLoader,url);
  

  const mesh = useRef<THREE.Mesh>()

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


function Moon({urlTexture, urlNormalmap} : {urlTexture:string, urlNormalmap:string}): JSX.Element {


  const mesh = useRef<THREE.Mesh>(null)

  const [texture, normalmap] = useLoader(TextureLoader,[urlTexture, urlNormalmap], undefined, function () {
    console.log('loading');
} );


 
    var orbitRadius = 2; //distance from the origin 
  
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


export default function App() : JSX.Element {
 






  return (
    <div className={styles.bruh} >
      
      <Loader/>
      

      
      
      <h1 className={styles.bruh2}>Software solutions that are</h1>
    <h1 className={styles.bruh3}>simply out of this world.</h1>
  
  

  <Canvas shadows={true} camera={{ position: [0, 0, -0.1] }}>
  

  <Sky url={'Model_Textures/galaxy_starfield.png'} />

  
  <directionalLight position={[1, 1, -1]} intensity={1} />
  

  <Moon urlTexture={'Model_Textures/moon_4k_color_brim16.jpg'} urlNormalmap={'Model_Textures/moon_4k_normal.jpg'} />

  

  <EarthClouds url={'Model_Textures/fair_clouds_4k.png'} />

  

  <Earth urlTexture={'Model_Textures/basicTexture.jpg'} urlBumpmap={'Model_Textures/bumpmap.jpg'}/>


</Canvas>


      <div />
      <div className={styles.swag} >
        <h1>About me</h1>
        <p>I am a </p>
      </div>
    </div>
  )




}


