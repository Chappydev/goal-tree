import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Check, Edit3, X } from 'react-feather';
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
  delayMult = 0
}) => {
  const [sizeObj, setSizeObj] = useState({});
  const [isShown, setIsShown] = useState(false);
  const delay = delayMult * 1000 - 300 < 0 ? 0 : delayMult * 1000 - 300;
  const colorAnimation = useAnimation('easeInOutExpo', 1000, delay);

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

  // TODO: Add options shade to first-node
  if (isFirst) {
    return (
      <div className="first-node node-container">
        <NavLink to={`/task/${node.id}`} className="node" ref={currNodeRef}>
          <div className="hidden-relative-box">
            <div className="complete-color" style={sizeObj}></div>
            {node.name}
          </div>
        </NavLink>
      </div>
    );
  }
  return (
    <div className="child-node node-container">
      {/* 
        TODO: Keep options shade from closing when hovering
              over it.
      */}
      <div className="node-options">
        <Check className="check option" />
        <Edit3 className="edit option" />
        <X className="x option" />
      </div>
      <NavLink to={`/task/${node.id}`} className="node" ref={currNodeRef}>
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
    </div>
  );
};
export default Node;
