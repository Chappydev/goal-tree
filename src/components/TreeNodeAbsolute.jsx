import React from 'react';
import './TreeNode.scss';
import Node from './Node';
import { useState } from 'react';

const TreeNodeAbsolute = ({
  node,
  isGoal = true,
  dimensions,
  parentRect = null
}) => {
  // IDEA: Use the dimensions to calculate the dimensions for the node
  // and the children nodes. Also use the data to determine how many
  // more children there are, and determine how to split up the space.

  // Alternatively, make one 'image' and then resize the WHOLE IMAGE to
  // to appropriately fit the space given for the tree.

  const [rect, setRect] = useState();

  return (
    <div className="tree-node-wrapper">
      <div className="tree-node">
        {/* {isGoal ? (
          <NavLink to={`/task/${node.id}`} className="node-inner-box goal-node">
            {node.name}
          </NavLink>
        ) : (
          <NavLink to={`/task/${node.id}`} className="node-inner-box task-node">
            {node.name}
          </NavLink>
        )} */}
        <Node
          node={node}
          isFirst={isGoal}
          parentRect={parentRect}
          setRect={setRect}
          key={node.id}
        />
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
                parentRect={rect}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TreeNodeAbsolute;
