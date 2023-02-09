import React from 'react';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Route, Routes, useParams } from 'react-router-dom';
import queryFunctions from '../utility/queryFunctions';
import D3Tree from './D3Tree';
import TaskView from './TaskView';

const QueryComp = () => {
  const { goalId } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['treeData', goalId],
    queryFn: () => queryFunctions.findGoal(goalId)
  });

  const toggleComplete = useMutation({
    mutationFn: (currNode) => {
      const newNode = {
        ...currNode,
        isComplete: !currNode.isComplete,
        children: currNode.children.map((child) => child.id)
      };
      return queryFunctions.updateNode(newNode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treeData', goalId] });
    }
  });

  const deleteNode = useMutation({
    mutationFn: (currNode) => {
      return queryFunctions.deleteNode(currNode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treeData', goalId] });
    }
  });

  const mutations = {
    toggleComplete,
    deleteNode
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<D3Tree />} />
      <Route
        path="/task/:id"
        element={<TaskView tree={data.insertionNode} mutations={mutations} />}
      />
    </Routes>
  );
};

export default QueryComp;
