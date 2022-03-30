import { useState, useEffect } from 'react';

export default function useWindowDimensions() {


  function getWindowDimensions() {
    var width =  window.innerWidth;
    var height =  window.innerHeight;
    return {
      width,
      height,
    };
  }


  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    
  });

  return windowDimensions;
}







