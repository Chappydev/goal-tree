import { useState } from 'react';
import { useEffect } from 'react';

const useDimensions = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, [window.innerWidth, window.innerHeight]);

  return {
    width: screenWidth,
    height: screenHeight
  };
};

export default useDimensions;
