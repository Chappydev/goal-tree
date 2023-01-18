import React from 'react';
import Tree from 'react-d3-tree';
import { useQuery } from 'react-query';
import useCenteredTree from '../hooks/useCenteredTree';
import queryFunctions from '../utility/queryFunctions';

const D3Tree = () => {
  const {
    isLoading,
    error,
    data: tree
  } = useQuery({
    queryKey: ['treeData'],
    queryFn: queryFunctions.findGoal
  });

  const [translate, containerRef] = useCenteredTree();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      id="treeWrapper"
      style={{ width: '100%', height: '100%' }}
      ref={containerRef}
    >
      <Tree
        data={tree}
        translate={translate}
        pathFunc="straight"
        orientation="vertical"
      />
    </div>
  );
};

export default D3Tree;
