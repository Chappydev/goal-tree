import React from 'react';
import './TreeNode.scss';

const TreeNode = ({ node, isGoal = true }) => {
  return (
    <div className="tree-node-wrapper">
      <div className="tree-node">
        {isGoal ? (
          <div className="node-inner-box goal-node">{node.name}</div>
        ) : (
          <div className="node-inner-box task-node">{node.name}</div>
        )}
      </div>
      {node.children ? (
        <div className="tree-children-wrapper">
          {node.children.map((child) => {
            // TODO: change key value
            return <TreeNode key={child.name} node={child} isGoal={false} />;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TreeNode;
