import React from 'react';
import Tree from 'react-d3-tree';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useCenteredTree from '../hooks/useCenteredTree';
import queryFunctions from '../utility/queryFunctions';
import './D3Tree.scss';

const renderNodeWithCustomEvents = ({ nodeDatum, toggleNode, handleClick }) => {
  return (
    <g>
      <circle
        className={`${nodeDatum.isComplete ? 'complete ' : ''}node-circle`}
        r="15"
        onClick={() => handleClick(nodeDatum)}
      />
      <text fill="black" strokeWidth="1" x="20" onClick={toggleNode}>
        {nodeDatum.name}
      </text>
    </g>
  );
};

const D3Tree = () => {
  const {
    isLoading,
    error,
    data: tree
  } = useQuery({
    queryKey: ['treeData'],
    queryFn: queryFunctions.findGoal
  });

  const navigate = useNavigate();

  // TODO: mess with the translation to look good visually
  const [translate, containerRef] = useCenteredTree();

  const handleClick = (nodeDatum) => {
    navigate(`/task/${nodeDatum.id}`);
  };

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
        renderCustomNodeElement={(rd3tProps) =>
          renderNodeWithCustomEvents({ ...rd3tProps, handleClick })
        }
        orientation="vertical"
      />
    </div>
  );
};

export default D3Tree;
