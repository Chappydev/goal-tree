import React from 'react';
import { NavLink } from 'react-router-dom';
import './Node.scss';

const Node = ({ node, isGoal }) => {
  console.log(node, isGoal);
  if (isGoal) {
    return (
      <NavLink to={`/task/${node.id}`} className="goal-node node">
        {node.name}
      </NavLink>
    );
  }
  return (
    <NavLink to={`/task/${node.id}`} className="task-node node">
      {node.name}
    </NavLink>
  );
};

export default Node;
