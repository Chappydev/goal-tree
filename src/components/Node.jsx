import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useAnimation from '../hooks/useAnimation';
import useRect from '../hooks/useRect';
import Line from './Line';
import './Node.scss';

const Node = ({
  node,
  isFirst,
  parentRect = null,
  setRect = null,
  delayMult = 0,
  children
}) => {
  const [sizeObj, setSizeObj] = useState({});
  const colorAnimation = useAnimation('linear', 1000, delayMult * 1000);

  const [rect, currNodeRef] = useRect();
  useEffect(() => {
    if (setRect) {
      setRect(rect);
    }
  }, [rect]);

  useEffect(() => {
    if (node.isComplete) {
      setSizeObj({
        width: `${colorAnimation * 102}%`,
        height: `${colorAnimation * 102}%`
      });
    } else {
      setSizeObj({ width: '0%', height: '0%' });
    }
  }, [node.isComplete, colorAnimation]);

  if (isFirst) {
    return (
      <NavLink
        to={`/task/${node.id}`}
        className="first-node node"
        ref={currNodeRef}
      >
        <div className="hidden-relative-box">
          <div className="complete-color" style={sizeObj}></div>
          {node.name}
        </div>
      </NavLink>
    );
  }
  return (
    <NavLink
      to={`/task/${node.id}`}
      className="child-node node"
      ref={currNodeRef}
    >
      <div className="hidden-relative-box">
        <div className="complete-color" style={sizeObj}></div>
        {node.name}
      </div>
      {currNodeRef &&
      currNodeRef.current &&
      parentRect &&
      Object.keys(parentRect).length !== 0 ? (
        <Line
          x1={parentRect.xCenter}
          y1={parentRect.yCenter}
          x2={rect.xCenter}
          y2={rect.yCenter}
          delayMult={delayMult + 1}
          isComplete={node.isComplete}
        />
      ) : null}
    </NavLink>
  );
};
export default Node;
