import React from 'react';
import { useState } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import { NavLink } from 'react-router-dom';
import './GoalOverview.scss';

const GoalOverview = ({ goalData }) => {
  const [ind, setInd] = useState(goalData.incompleteNodes.length - 1);

  return (
    <div className="overview-container">
      <NavLink to={`/goal/${goalData.goalId}`}>
        <h2>{goalData.goalNode.name}</h2>
      </NavLink>
      <div className="current-container">
        <p>
          {'Current: '}
          <NavLink
            to={`/goal/${goalData.goalId}/task/${goalData.incompleteNodes[ind].id}`}
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
        </div>
      </div>
    </div>
  );
};

export default GoalOverview;
