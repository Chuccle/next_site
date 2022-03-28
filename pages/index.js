
import * as THREE from 'three'

import { CameraHelper, MeshPhongMaterial } from 'three'
import styles from '../styles/Home.module.css'
import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { softShadows, OrbitControls, useHelper } from '@react-three/drei'
import  Helvetica from '../public/Helvetica_ Neue.json'

 
 // Soft shadows are expensive, uncomment and refresh when it's too slow
softShadows()

function Sky() {
  const texture = new THREE.TextureLoader().load( '/galaxy_starfield.png' );
  return (
    <mesh position={[0.0, 0.0, 0.0]} >
      <boxBufferGeometry args={[100, 100, 100]} attach="geometry" />
      <meshBasicMaterial side={2} map={texture} attach="material" />
    </mesh>
  )
}

function Earth() {

  const mesh = useRef()
  //const shaderMat = useRef()
 const nav = useRef()

 const texture =  new THREE.TextureLoader().load( '/basicTexture.jpg' );
  
const bumpmap = new THREE.TextureLoader().load( '/bumpmap.jpg' );

const specularmap = new THREE.TextureLoader().load( '/water_4k.png' );
const specular = new THREE.Color('grey'); 


useFrame(state => {

    mesh.current.rotation.y += 0.0001
 nav.current
  })


  return (
    <mesh position={[1.0, 0.0, 0.0]} ref={mesh} >
     <meshStandardMaterial map={texture} bumpMap={bumpmap} bumpScale={0.03}/>
       <sphereBufferGeometry args={[1, 30, 30]} attach="geometry" />

    </mesh>
  )
}

function Moon() {

  const mesh = useRef()
  //const shaderMat = useRef()
 const nav = useRef()

 const texture =  new THREE.TextureLoader().load( '/moon_4k_color_brim16.jpg' );
  
//const bumpmap = new THREE.TextureLoader().load( '/bumpmap.jpg' );

const specularmap = new THREE.TextureLoader().load( '/moon_4k_normal.jpg' );



useFrame(state => {

    mesh.current.rotation.y += 0.0001
 
  })

  return (
    <mesh position={[3.0, 0.0, 0.0]} ref={mesh} >
    
     <meshStandardMaterial map={texture} normalMap={specularmap}/>
       <sphereBufferGeometry args={[0.25, 30, 30]} attach="geometry" />

    </mesh>
  )

}


function Text() {
  return(
    <h1 className={styles.bruh3}>out of this world</h1>
  )
}

function EarthClouds() {

  const mesh = useRef()
  //const shaderMat = useRef()


 const texture =  new THREE.TextureLoader().load( '/fair_clouds_4k.png' );
  

  useFrame(state => {

    mesh.current.rotation.y += 0.00015

  })

 // useHelper(camera, CameraHelper, 'cyan')
  return (
    <mesh position={[1.0, 0.0, 0.0]} ref={mesh} >
     
     <meshPhongMaterial map={texture} transparent={true}    />
       <sphereBufferGeometry args={[1.01, 30.01, 30.01]} attach="geometry" />
    </mesh>
  )
}








export default function App() {
  return (

    
   <div className={styles.bruh}>
    <Text/>
     
     <h1 className={styles.bruh2}>Software solutions that are</h1>
     
     <Canvas  shadowMap camera={{ position: [0, 0, -3], fov: 20 }}>      
  <Sky />
  <directionalLight  position={[-7, 10, 0]} intensity={0.75} useHelper={true}/>
  <Moon/>
  <EarthClouds/>
      <Earth />
      
    </Canvas>
    <div />
    <div className={styles.swag} >
    <h1 font-color={'white'}  > EPIC</h1>
    </div>
    </div>
  )
}

