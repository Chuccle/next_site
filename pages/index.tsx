
import * as THREE from 'three'
import styles from '/styles/Home.module.css'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'





//TODO
//Moon needs to orbit around the earth
//We need to make a pan out effect and transition to next div



// Soft shadows are expensive, uncomment and refresh when it's too slow
//softShadows()

function Sky() {

  const texture = new THREE.TextureLoader().load('/galaxy_starfield.png');



  return (
    <mesh position={[0.0, 0.0, 0.0]}  >

      <boxBufferGeometry args={[100, 100, 100]} attach="geometry" />
      <meshBasicMaterial side={2} map={texture} attach="material" />
    </mesh>
  )
}

function Earth() {

  const mesh = useRef<THREE.Mesh>(null)
  //const shaderMat = useRef()
  const nav = useRef()

  const texture: THREE.Texture = new THREE.TextureLoader().load('/basicTexture.jpg');

  const bumpmap = new THREE.TextureLoader().load('/bumpmap.jpg');



  const specularmap = new THREE.TextureLoader().load('/water_4k.png');
  const specular = new THREE.Color('grey');



  useFrame(state => {


    if (mesh.current?.rotation) {
      mesh.current.rotation.y += 0.0001
    }







  })


  return (
    <mesh position={[0.0, 0.0, 0.0]} ref={mesh} castShadow={true} receiveShadow={true} >


      <meshPhongMaterial specularMap={specularmap} specular={specular} transparent />
      <meshStandardMaterial map={texture} bumpMap={bumpmap} bumpScale={0.03} shadowSide={THREE.BackSide} />
      <sphereBufferGeometry args={[1, 60, 60]} attach="geometry" />

    </mesh>
  )
}



function Text() {
  return (
    <h1 className={styles.bruh3}>out of this world</h1>
  )
}

function EarthClouds() {

  const mesh = useRef<THREE.Mesh>()
  //const shaderMat = useRef()


  const texture = new THREE.TextureLoader().load('/fair_clouds_4k.png');


  useFrame(state => {
    if (mesh.current?.rotation) {
      mesh.current.rotation.y += 0.00015
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
  const lightpos = useRef<THREE.Mesh>(null)
  const texture = new THREE.TextureLoader().load('/moon_4k_color_brim16.jpg');

  //const bumpmap = new THREE.TextureLoader().load( '/bumpmap.jpg' );

  const specularmap = new THREE.TextureLoader().load('/moon_4k_normal.jpg');

  var orbitRadius = 2; // for example
  var date;



  useFrame(state => {
    date = Date.now() * 0.0001;


    if (mesh.current?.rotation && mesh.current?.position) {

      mesh.current.rotation.y += 0.0025

      mesh.current.position.set(
        Math.cos(date) * orbitRadius,
        0,
        Math.sin(date) * orbitRadius
      )

    }

    if (lightpos.current?.position) {
      lightpos.current.position.set(
        Math.sin(date) * orbitRadius,
        0,
        Math.cos(date) * orbitRadius

      )


      console.log("1", lightpos.current?.position)
      console.log("2", mesh.current?.position)

    }





  })

  return (

    <mesh position={[0.0, 0.0, 0.0]} ref={mesh} castShadow={true} receiveShadow={true} >

      <meshStandardMaterial map={texture} normalMap={specularmap} />
      <sphereBufferGeometry args={[0.25, 120, 120]} attach="geometry" />

    </mesh>

  )
}


export default function App() {

  return (

    <div className={styles.bruh}>
      <Text />
      <h1 className={styles.bruh2}>Software solutions that are</h1>
      <Canvas shadows={true} camera={{ position: [0, 0, -3], fov: 40 }}>
        <Sky />
        <directionalLight position={[1, 1, -1]} intensity={1} />
        <Moon />
        <EarthClouds />
        <Earth />
      </Canvas>
      <div />
      <div className={styles.swag} >
        <h1 font-color={'white'}  > EPIC</h1>
        <p>br</p>
      </div>
    </div>
  )
}

