import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SpinningSphere, OrbitingSphere } from "./geometry_iface";
import { useOrbit, useRotation } from "./util";

type BasePlanetParams = {
    urlTexture: string;
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined;
} & (SpinningSphere & OrbitingSphere);

type StandardPlanet = { type: 'standard' } & BasePlanetParams;
type BumpyPlanet = { type: 'bumpy', urlBumpmap: string, bumpScale: number } & BasePlanetParams;
type ReflectivePlanet = { type: 'reflective', urlSpecularmap: string, reflectivity: number } & BasePlanetParams;
type BumpyAndReflectivePlanet = { type: 'bumpyAndReflective', urlBumpmap: string, bumpScale: number, urlSpecularmap: string, reflectivity: number } & BasePlanetParams;

function PlanetBumpyAndReflective(planetparams: BumpyAndReflectivePlanet) {


    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (planetparams.passedMeshRef)
        meshRef = planetparams.passedMeshRef;

    const [texture, bumpmap, specularmap] = useLoader(THREE.TextureLoader, [
        planetparams.urlTexture,
        planetparams.urlBumpmap,
        planetparams.urlSpecularmap,
    ]);

    useRotation(planetparams.rotationSpeed, meshRef);

    useOrbit(planetparams.orbitSpeed, meshRef, planetparams.orbitDistance);

    return (
        <mesh
            position={planetparams.position}
            ref={meshRef}
            castShadow={planetparams.castshadow}
            receiveShadow={planetparams.receiveshadow}
        >
            <meshPhongMaterial
                map={texture}
                bumpMap={bumpmap}
                bumpScale={planetparams.bumpScale}
                specularMap={specularmap}
                reflectivity={planetparams.reflectivity}
            />
            <sphereGeometry args={planetparams.meshArgs} attach="geometry" />
        </mesh>
    );
}


function PlanetBumpy(planetparams: BumpyPlanet) {

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (planetparams.passedMeshRef)
        meshRef = planetparams.passedMeshRef;

    const [texture, bumpmap] = useLoader(THREE.TextureLoader, [
        planetparams.urlTexture,
        planetparams.urlBumpmap,
    ]);

    useRotation(planetparams.rotationSpeed, meshRef);

    useOrbit(planetparams.orbitSpeed, meshRef, planetparams.orbitDistance);

    return (
        <mesh
            position={planetparams.position}
            ref={meshRef}
            castShadow={planetparams.castshadow}
            receiveShadow={planetparams.receiveshadow}
        >
            <meshPhongMaterial
                map={texture}
                bumpMap={bumpmap}
                bumpScale={planetparams.bumpScale}
            />
            <sphereGeometry args={planetparams.meshArgs} attach="geometry" />
        </mesh>
    );
}

function PlanetReflective(planetparams: ReflectivePlanet) {

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (planetparams.passedMeshRef)
        meshRef = planetparams.passedMeshRef;

    const [texture, specularmap] = useLoader(THREE.TextureLoader, [
        planetparams.urlTexture,
        planetparams.urlSpecularmap,
    ]);

    useRotation(planetparams.rotationSpeed, meshRef);

    useOrbit(planetparams.orbitSpeed, meshRef, planetparams.orbitDistance);

    return (
        <mesh
            position={planetparams.position}
            ref={meshRef}
            castShadow={planetparams.castshadow}
            receiveShadow={planetparams.receiveshadow}
        >
            <meshPhongMaterial
                map={texture}
                specularMap={specularmap}
                reflectivity={planetparams.reflectivity}
            />
            <sphereGeometry args={planetparams.meshArgs} attach="geometry" />
        </mesh>
    );
}

function PlanetStandard(planetparams: StandardPlanet) {

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (planetparams.passedMeshRef)
        meshRef = planetparams.passedMeshRef;

    const [texture] = useLoader(THREE.TextureLoader, [
        planetparams.urlTexture,
    ]);

    useRotation(planetparams.rotationSpeed, meshRef);

    useOrbit(planetparams.orbitSpeed, meshRef, planetparams.orbitDistance);

    return (
        <mesh
            position={planetparams.position}
            ref={meshRef}
            castShadow={planetparams.castshadow}
            receiveShadow={planetparams.receiveshadow}
        >
            <meshStandardMaterial
                map={texture}
            />
            <sphereGeometry args={planetparams.meshArgs} attach="geometry" />
        </mesh>
    );
}

type PlanetParams = StandardPlanet | BumpyPlanet | ReflectivePlanet | BumpyAndReflectivePlanet;

export function Planet(planetparams: PlanetParams): JSX.Element {
    switch (planetparams.type) {
        case 'standard':
            return <PlanetStandard {...planetparams} />;
        case 'bumpy':
            return <PlanetBumpy {...planetparams} />;
        case 'reflective':
            return <PlanetReflective {...planetparams} />;
        case 'bumpyAndReflective':
            return <PlanetBumpyAndReflective {...planetparams} />;
        default:
            throw new Error('Invalid planet type');
    }
}

export function PlanetClouds(props: {
    urlTexture: string
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined

} & (SpinningSphere & OrbitingSphere) ): JSX.Element {

    const texture: THREE.Texture = useLoader(THREE.TextureLoader, props.urlTexture);

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;

    useRotation(props.rotationSpeed, meshRef);

    useOrbit(props.orbitSpeed, meshRef, props.orbitDistance);

    return (
        <mesh
            position={props.position}
            ref={meshRef}
            castShadow={props.castshadow}
            receiveShadow={props.receiveshadow}
        >
            <meshPhongMaterial map={texture} transparent={true} opacity={0.8} />
            <sphereGeometry args={props.meshArgs} attach="geometry" />
        </mesh>
    );
}


// OrbitLine component to create orbit lines
export function OrbitLine({ radius, enabled = true }: { radius: number, enabled?: boolean }): JSX.Element {

    if (!enabled) {

        return <></>;
    }

    // Create a circle geometry with a radius and number of segments
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(300); // Adjust the number of points for smoother rings
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Create a material for the line
    const material = new THREE.LineDashedMaterial({
        color: 0xffffff, // Color of the line
        dashSize: 3, // Length of each dash
        gapSize: 2.5, // Length of each gap

    });

    // Create the line
    const orbitLine = new THREE.Line(geometry, material);

    // Rotate the line to align with the plane
    orbitLine.rotation.x = -Math.PI / 2;

    // Enable the dashed line
    orbitLine.computeLineDistances();

    return <primitive object={orbitLine} />;
}