import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SpinningSphere, OrbitingSphere } from "./geometry_iface";
import { useOrbit, useRotation } from "./util";

interface PlanetBase {

    spinningOrbitingSphereParams: SpinningSphere & OrbitingSphere
    urlTexture: string
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined

}

interface PlanetWithSpecularMap {
    baseParams: PlanetBase
    urlSpecularmap: string
    reflectivity: number

}


interface PlanetWithBumpMap {
    baseParams: PlanetBase
    urlBumpmap: string
    bumpScale: number

}


function PlanetBumpyAndReflective(planetparams: PlanetWithSpecularMap & PlanetWithBumpMap) {

    const { baseParams, urlSpecularmap, urlBumpmap, bumpScale, reflectivity } = planetparams as PlanetWithSpecularMap & PlanetWithBumpMap;

        let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

        if (baseParams.passedMeshRef)
            meshRef = baseParams.passedMeshRef;

        const [texture, bumpmap, specularmap] = useLoader(THREE.TextureLoader, [
            baseParams.urlTexture,
            urlBumpmap,
            urlSpecularmap,
        ]);

        useRotation(baseParams.spinningOrbitingSphereParams.rotationSpeed, meshRef);

        useOrbit(baseParams.spinningOrbitingSphereParams.orbitSpeed, meshRef, baseParams.spinningOrbitingSphereParams.orbitDistance);

        return (
            <mesh
                position={baseParams.spinningOrbitingSphereParams.position}
                ref={meshRef}
                castShadow={baseParams.spinningOrbitingSphereParams.castshadow}
                receiveShadow={baseParams.spinningOrbitingSphereParams.receiveshadow}
            >
                <meshPhongMaterial
                    map={texture}
                    bumpMap={bumpmap}
                    bumpScale={bumpScale}
                    specularMap={specularmap}
                    reflectivity={reflectivity}
                />
                <sphereGeometry args={baseParams.spinningOrbitingSphereParams.meshArgs} attach="geometry" />
            </mesh>
        );
}


function PlanetBumpy(planetparams: PlanetWithBumpMap) {

    const { baseParams, urlBumpmap, bumpScale } = planetparams as PlanetWithBumpMap;

        let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

        if (baseParams.passedMeshRef)
            meshRef = baseParams.passedMeshRef;

        const [texture, bumpmap] = useLoader(THREE.TextureLoader, [
            baseParams.urlTexture,
            urlBumpmap,
        ]);

        useRotation(baseParams.spinningOrbitingSphereParams.rotationSpeed, meshRef);

        useOrbit(baseParams.spinningOrbitingSphereParams.orbitSpeed, meshRef, baseParams.spinningOrbitingSphereParams.orbitDistance);

        return (
            <mesh
                position={baseParams.spinningOrbitingSphereParams.position}
                ref={meshRef}
                castShadow={baseParams.spinningOrbitingSphereParams.castshadow}
                receiveShadow={baseParams.spinningOrbitingSphereParams.receiveshadow}
            >
                <meshPhongMaterial
                    map={texture}
                    bumpMap={bumpmap}
                    bumpScale={bumpScale}
                />
                <sphereGeometry args={baseParams.spinningOrbitingSphereParams.meshArgs} attach="geometry" />
            </mesh>
        );
}

function PlanetReflective(planetparams: PlanetWithSpecularMap) {

    const { baseParams, urlSpecularmap, reflectivity } = planetparams as PlanetWithSpecularMap;

        let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

        if (baseParams.passedMeshRef)
            meshRef = baseParams.passedMeshRef;

        const [texture, specularmap] = useLoader(THREE.TextureLoader, [
            baseParams.urlTexture,
            urlSpecularmap,
        ]);

        useRotation(baseParams.spinningOrbitingSphereParams.rotationSpeed, meshRef);

        useOrbit(baseParams.spinningOrbitingSphereParams.orbitSpeed, meshRef, baseParams.spinningOrbitingSphereParams.orbitDistance);

        return (
            <mesh
                position={baseParams.spinningOrbitingSphereParams.position}
                ref={meshRef}
                castShadow={baseParams.spinningOrbitingSphereParams.castshadow}
                receiveShadow={baseParams.spinningOrbitingSphereParams.receiveshadow}
            >
                <meshPhongMaterial
                    map={texture}
                    specularMap={specularmap}
                    reflectivity={reflectivity}
                />
                <sphereGeometry args={baseParams.spinningOrbitingSphereParams.meshArgs} attach="geometry" />
            </mesh>
        );
}

function PlanetStandard(planetparams: PlanetBase) {

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (planetparams.passedMeshRef)
        meshRef = planetparams.passedMeshRef;

    const [texture] = useLoader(THREE.TextureLoader, [
        planetparams.urlTexture,
    ]);

    useRotation(planetparams.spinningOrbitingSphereParams.rotationSpeed, meshRef);

    useOrbit(planetparams.spinningOrbitingSphereParams.orbitSpeed, meshRef, planetparams.spinningOrbitingSphereParams.orbitDistance);

    return (
        <mesh
            position={planetparams.spinningOrbitingSphereParams.position}
            ref={meshRef}
            castShadow={planetparams.spinningOrbitingSphereParams.castshadow}
            receiveShadow={planetparams.spinningOrbitingSphereParams.receiveshadow}
        >
            <meshStandardMaterial
                map={texture}
            />
            <sphereGeometry args={planetparams.spinningOrbitingSphereParams.meshArgs} attach="geometry" />
        </mesh>
    );
}



export function Planet(planetparams: PlanetBase | (PlanetWithSpecularMap & PlanetWithBumpMap) | PlanetWithSpecularMap | PlanetWithBumpMap): JSX.Element {

    if ('baseParams' in planetparams && 'urlSpecularmap' in planetparams && 'urlBumpmap' in planetparams) {

        return <PlanetBumpyAndReflective {...planetparams}/>;

    } else if ('baseParams' in planetparams && 'urlSpecularmap' in planetparams) {
       
        return <PlanetReflective {...planetparams}/>;

    } else if ('baseParams' in planetparams && 'urlBumpmap' in planetparams) {
        
        return <PlanetBumpy {...planetparams}/>;

    } else {

        return <PlanetStandard {...planetparams}/>;

    }
}

export function PlanetClouds(props: {
    spinningOrbitingSphereParams: SpinningSphere & OrbitingSphere
    urlTexture: string
    passedMeshRef?: React.RefObject<THREE.Mesh> | undefined

}): JSX.Element {

    const texture: THREE.Texture = useLoader(THREE.TextureLoader, props.urlTexture);

    let meshRef: React.RefObject<THREE.Mesh> = useRef<THREE.Mesh>(null);

    if (props.passedMeshRef)
        meshRef = props.passedMeshRef;

    useRotation(props.spinningOrbitingSphereParams.rotationSpeed, meshRef);

    useOrbit(props.spinningOrbitingSphereParams.orbitSpeed, meshRef, props.spinningOrbitingSphereParams.orbitDistance);

    return (
        <mesh
            position={props.spinningOrbitingSphereParams.position}
            ref={meshRef}
            castShadow={props.spinningOrbitingSphereParams.castshadow}
            receiveShadow={props.spinningOrbitingSphereParams.receiveshadow}
        >
            <meshPhongMaterial map={texture} transparent={true} />
            <sphereGeometry args={props.spinningOrbitingSphereParams.meshArgs} attach="geometry" />
        </mesh>
    );
}


// OrbitLine component to create orbit lines
export function OrbitLine({ radius, enabled = true }: { radius: number, enabled?: boolean }): JSX.Element {
    
    if(!enabled) {

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