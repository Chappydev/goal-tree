import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import useAnimation from '../hooks/useAnimation';

const Line = ({ x1, y1, x2, y2, delayMult = 1, isComplete }) => {
  const [offsetObj, setOffsetObj] = useState({});
  const animation1 = useAnimation('easeInOutQuad', 500, delayMult * 1000 - 400);

  const gradientId = `${Math.floor(x1)}${Math.floor(x2)}${Math.floor(
    y1
  )}${Math.floor(y2)}-gradient`;

  const svgHeight = Math.abs(y2 - y1);
  const svgWidth = Math.abs(x2 - x1);
  const svgStyle = {
    height: svgHeight,
    width: svgWidth || 1
  };

  const directionObj =
    x1 > x2
      ? {
          x1: '100%',
          y1: '0%',
          x2: '0%',
          y2: '100%'
        }
      : x1 === x2
      ? {
          x1: '0%',
          y1: '0%',
          x2: '0%',
          y2: '100%'
        }
      : {
          x1: '0%',
          y1: '0%',
          x2: '100%',
          y2: '100%'
        };

  useEffect(() => {
    if (isComplete) {
      setOffsetObj({ offset1: 1 - animation1, offset2: 1 - animation1 });
    } else {
      setOffsetObj({ offset1: '1', offset2: '1' });
    }
  }, [isComplete, animation1]);

  return (
    <svg className="tree-line-svg" style={svgStyle}>
      {/* 
          TODO: change styles to taste
          TODO: figure out animations for the styles as well 
        */}
      <defs>
        <linearGradient
          id={gradientId}
          x1={directionObj.x1}
          y1={directionObj.y1}
          x2={directionObj.x2}
          y2={directionObj.y2}
        >
          <stop offset={offsetObj.offset2} stopColor="#f00" />
          <stop offset={offsetObj.offset1} stopColor="#0d0" />
        </linearGradient>
      </defs>
      {/* <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={`tree-line${isComplete ? ' complete' : ''}`}
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
      /> */}
      {svgWidth === 0 ? (
        <rect
          x={x1}
          y={y1}
          width="2"
          height={svgHeight}
          className={`tree-line${isComplete ? ' complete' : ''}`}
          fill={`url(#${gradientId})`}
        />
      ) : (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          className={`tree-line${isComplete ? ' complete' : ''}`}
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
        />
      )}
    </svg>
  );
};

export default Line;
