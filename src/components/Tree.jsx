import React from 'react';
import useDimensions from '../hooks/useDimensions';
import './Tree.scss';
import TreeNodeAbsolute from './TreeNodeAbsolute';
import treeHelper from '../utility/treeHelper';

const Tree = ({ data }) => {
  const dimensions = useDimensions();
  const treeDepth = treeHelper.findDeepestLayer(data);
  console.log('Depth: ' + treeDepth);
  const treeBreadth = treeHelper.findBroadestLayer(data);
  console.log('Breadth: ' + treeBreadth);
  // compare treeBreadth and treeDepth with dimensions to determine
  // which direction is the bottleneck and then determine the dimensions
  // for each node

  return (
    <div className="tree-wrapper">
      {/* <TreeNode node={data} dimensions={dimensions} /> */}
      <TreeNodeAbsolute key={data.id} node={data} dimensions={dimensions} />
    </div>
  );
};

export default Tree;
