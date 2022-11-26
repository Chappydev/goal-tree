import React from 'react';
import './TreeNode.scss';
import useRect from '../hooks/useRect';

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

  const [rect, ref] = useRect();
  console.log(rect);

  return (
    <div className="tree-node-wrapper">
      {parentRect ? (
        <svg className="tree-line-svg">
          {/* 
            TODO: change styles to taste
            TODO: figure out animations for the styles as well 
          */}
          <line
            x1={parentRect.xCenter}
            y1={parentRect.yCenter}
            x2={rect.xCenter}
            y2={rect.yCenter}
            className="tree-line"
          />
        </svg>
      ) : null}
      <div className="tree-node" ref={ref}>
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
