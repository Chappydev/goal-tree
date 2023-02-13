import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { ArrowDown, ArrowUp, Trash, Trash2 } from 'react-feather';
import { NavLink } from 'react-router-dom';
import useTreeLayer from '../hooks/useTreeLayer';
import queryFunctions from '../utility/queryFunctions';
import treeHelper from '../utility/treeHelper';
import Button from './Button';
import './GoalOverview.scss';

const GoalOverview = ({ goalData }) => {
  const { layer, layerInd, setToNextLayer, setToPrevLayer } = useTreeLayer(
    goalData.insertionNode
  );
  const queryClient = useQueryClient();

  const removeGoal = useMutation({
    mutationKey: ['treeData', goalData.id],
    mutationFn: () => queryFunctions.deleteGoal(goalData.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treeData', goalData.id] });
      queryClient.invalidateQueries({ queryKey: ['goalsOverview'] });
    }
  });

  return (
    <div className="overview-container">
      <div className="overview-top-container">
        <NavLink to={`/goal/${goalData.id}`}>
          <h2>{goalData.insertionNode.name}</h2>
        </NavLink>
        <Button
          fillType="fill"
          color="delete"
          onClick={() => removeGoal.mutate()}
        >
          Delete
        </Button>
      </div>
      <div className="current-container">
        <div>
          {'Current: '}
          {layer &&
            layer.map((node) => (
              <NavLink to={`/goal/${goalData.id}/task/${node.id}`}>
                {node.name}
              </NavLink>
            ))}
        </div>
        <div className="layer-index">{layerInd + 1}</div>
        <div className="arrows-container">
          <ArrowUp role="button" onClick={setToPrevLayer} />
          <ArrowDown role="button" onClick={setToNextLayer} />
        </div>
      </div>
    </div>
  );
};

export default GoalOverview;
