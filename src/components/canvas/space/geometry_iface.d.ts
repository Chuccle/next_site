export interface SpinningSphere {
    meshArgs: THREE.Vector3Tuple
    position: THREE.Vector3Tuple
    castshadow: boolean
    receiveshadow: boolean
    rotationSpeed: number
}

export interface OrbitingSphere {
    meshArgs: THREE.Vector3Tuple
    position: THREE.Vector3Tuple
    castshadow: boolean
    receiveshadow: boolean
    orbitSpeed: number
    orbitDistance: number
}
