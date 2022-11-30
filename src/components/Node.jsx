import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Node.scss';

const Node = forwardRef(({ node, isGoal }, ref) => {
  console.log(node, isGoal);
  if (isGoal) {
    return (
      <NavLink to={`/task/${node.id}`} className="goal-node node" ref={ref}>
        {node.name}
      </NavLink>
    );
  }
  return (
    <NavLink to={`/task/${node.id}`} className="task-node node" ref={ref}>
      {node.name}
    </NavLink>
  );
});

export default Node;
