import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { BloomPass, EffectComposer, RenderPass } from "three-stdlib";

export const usePostProcess = () => {
    const { scene, camera, gl, size } = useThree();
    const composer = useMemo(() => {
      const composer = new EffectComposer(gl);
      composer.setSize(size.width, size.height);
  
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

  
      const bloom = new BloomPass();
      composer.addPass(bloom);
  
      return composer;
    }, [scene, camera, gl, size]);
  
    useFrame((_, delta) => {
      composer.render(delta);
    });
  
    return null;
  };