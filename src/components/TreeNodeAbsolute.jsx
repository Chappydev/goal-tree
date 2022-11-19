import React from 'react';
import './TreeNode.scss';

const TreeNodeAbsolute = ({ node, isGoal = true, dimensions }) => {
  // IDEA: Use the dimensions to calculate the dimensions for the node
  // and the children nodes. Also use the data to determine how many
  // more children there are, and determine how to split up the space.

  // Alternatively, make one 'image' and then resize the WHOLE IMAGE to
  // to appropriately fit the space given for the tree.

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
            return (
              <TreeNodeAbsolute
                key={child.name}
                node={child}
                isGoal={false}
                // TODO: change the value passed based on calculations
                dimensions={dimensions}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TreeNodeAbsolute;
