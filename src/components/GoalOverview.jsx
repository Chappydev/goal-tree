import React from 'react';
import { useState } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import { NavLink } from 'react-router-dom';
import treeHelper from '../utility/treeHelper';
import './GoalOverview.scss';

const GoalOverview = ({ goalData }) => {
  const goalDepth = treeHelper.findDeepestLayer(goalData.insertionNode);
  const [layer, setLayer] = useState(goalDepth);

  return (
    <div className="overview-container">
      <NavLink to={`/goal/${goalData.id}`}>
        <h2>{goalData.insertionNode.name}</h2>
      </NavLink>
      <div className="current-container">
        {/* 
        // TODO: redo this to better suit the new data
        // TODO: maybe add helper function to navigate the tree
        <p>
          {'Current: '}
          <NavLink
            to={`/goal/${goalData.id}/task/${goalData.incompleteNodes[ind].id}`}
          >
            {goalData.incompleteNodes[ind].name}
          </NavLink>
        </p>
        <div className="arrows-container">
          <ArrowUp
            onClick={() =>
              ind > 0
                ? setInd(ind - 1)
                : setInd(goalData.incompleteNodes.length - 1)
            }
          />
          <ArrowDown
            onClick={() =>
              ind < goalData.incompleteNodes.length - 1
                ? setInd(ind + 1)
                : setInd(0)
            }
          />
        </div> */}
      </div>
    </div>
  );
};

export default GoalOverview;
