import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useRect from '../hooks/useRect';
import Line from './Line';
import './Node.scss';

const Node = ({
  node,
  isFirst,
  parentRect = null,
  setRect = null,
  children
}) => {
  const [rect, currNodeRef] = useRect();
  useEffect(() => {
    if (setRect) {
      setRect(rect);
    }
  }, [rect]);
  console.log(rect, currNodeRef);

  if (isFirst) {
    return (
      <NavLink
        to={`/task/${node.id}`}
        className="first-node node"
        ref={currNodeRef}
      >
        {node.name}
      </NavLink>
    );
  }
  return (
    <NavLink
      to={`/task/${node.id}`}
      className="child-node node"
      ref={currNodeRef}
    >
      {node.name}
      {currNodeRef &&
      currNodeRef.current &&
      parentRect &&
      Object.keys(parentRect).length !== 0 ? (
        <Line
          x1={parentRect.xCenter}
          y1={parentRect.yCenter}
          x2={rect.xCenter}
          y2={rect.yCenter}
        />
      ) : null}
    </NavLink>
  );
};
export default Node;
