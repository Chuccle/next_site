export interface SpinningSphere {
    rotationSpeed: number
    meshArgs: THREE.Vector3Tuple
    position: THREE.Vector3Tuple
    castshadow: boolean
    receiveshadow: boolean
}


export interface OrbitingSphere {
    meshArgs: THREE.Vector3Tuple
    position: THREE.Vector3Tuple
    castshadow: boolean
    receiveshadow: boolean
    orbitSpeed: number
    orbitDistance: number
}


//export interface OrbitingSpinningSphere extends SpinningSphere, OrbitingSphere { }   

// How do I mix both of these interfaces