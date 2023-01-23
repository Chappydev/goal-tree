import { useState, useRef, useLayoutEffect } from 'react';

const useRect = () => {
  const ref = useRef();
  const [rect, setRect] = useState({});

  const set = () => {
    const box = ref && ref.current ? ref.current.getBoundingClientRect() : {};
    const xCenter = (box.left + box.right) / 2;
    const yCenter = (box.top + box.bottom) / 2;

    const newRect = {};

    for (const property in box) {
      newRect[property] = box[property];
    }

    newRect.xCenter = xCenter;
    newRect.yCenter = yCenter;

    setRect(newRect);
  };

  useLayoutEffect(() => {
    if (
      ref?.current?.getBoundingClientRect?.().x !== rect.x ||
      ref?.current?.getBoundingClientRect?.().y !== rect.y
    ) {
      set();
    }
  }, [set, ref?.current?.getBoundingClientRect?.()]);

  const useEffectInEvent = (event, useCapture) => {
    useLayoutEffect(() => {
      set();
      window.addEventListener(event, set, useCapture);
      return () => window.removeEventListener(event, set, useCapture);
    }, []);
  };

  useEffectInEvent('resize');
  useEffectInEvent('scroll', true);

  return [rect, ref];
};

export default useRect;
