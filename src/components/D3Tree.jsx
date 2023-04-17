import React from 'react';
import Tree from 'react-d3-tree';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useCenteredTree from '../hooks/useCenteredTree';
import queryFunctions from '../utility/queryFunctions';
import './D3Tree.scss';

const renderNodeWithCustomEvents = ({ nodeDatum, toggleNode, handleClick }) => {
  return (
    <g>
      <circle
        className={`${nodeDatum.isComplete ? 'complete ' : ''}node-circle`}
        r="20"
        onClick={() => handleClick(nodeDatum)}
      />
      {/* <text className="node-name" x="25" y="4" onClick={toggleNode}>
        {nodeDatum.name}
      </text> */}
      <foreignObject width="90" height="100" x="25">
        <span className="tree-node-text">{nodeDatum.name}</span>
      </foreignObject>
    </g>
  );
};

const D3Tree = () => {
  const { goalId } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ['treeData', goalId],
    queryFn: () => queryFunctions.findGoal(goalId)
  });

  const tree = data.insertionNode;

  const navigate = useNavigate();

  const [translate, containerRef] = useCenteredTree();

  const getPathClass = ({ source, target }, orientation) => {
    let pathClass = 'tree-link';
    if (target.data.isComplete) {
      pathClass = pathClass.concat(' complete');
    }
    return pathClass;
  };

  const handleClick = (nodeDatum) => {
    navigate(`/goal/${goalId}/task/${nodeDatum.id}`);
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
        pathClassFunc={getPathClass}
        renderCustomNodeElement={(rd3tProps) =>
          renderNodeWithCustomEvents({ ...rd3tProps, handleClick })
        }
        orientation="vertical"
      />
    </div>
  );
};

export default D3Tree;
