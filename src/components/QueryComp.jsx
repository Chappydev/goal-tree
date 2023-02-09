import React from 'react';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Route, Routes, useParams } from 'react-router-dom';
import queryFunctions from '../utility/queryFunctions';
import D3Tree from './D3Tree';
import TaskView from './TaskView';
import treeHelper from '../utility/treeHelper';

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
    onMutate: async (currNode) => {
      await queryClient.cancelQueries({ queryKey: ['treeData', goalId] });

      const newNode = {
        ...currNode,
        isComplete: !currNode.isComplete
      };

      const prevGoal = queryClient.getQueryData(['treeData', goalId]);

      const newTree = treeHelper.findNodeByIdDFSAndUpdate(
        prevGoal.insertionNode,
        newNode.id,
        newNode
      );

      const newGoal = { ...prevGoal, insertionNode: newTree };

      queryClient.setQueryData(['treeData', goalId], newGoal);

      return { prevGoal, newGoal };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['treeData', goalId], context.prevGoal);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['treeData', goalId] });
    }
  });

  const deleteNode = useMutation({
    mutationFn: (currNode) => {
      return queryFunctions.deleteNode(currNode);
    },
    onMutate: async (currNode) => {
      await queryClient.cancelQueries({ queryKey: ['treeData', goalId] });

      const prevGoal = queryClient.getQueryData(['treeData', goalId]);

      const newTree = treeHelper.findNodeByIdDFSAndDelete(
        prevGoal.insertionNode,
        currNode.id
      );

      const newGoal = { ...prevGoal, insertionNode: newTree };

      queryClient.setQueryData(['treeData', goalId], newGoal);

      return { prevGoal, newGoal };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['treeData', goalId], context.prevGoal);
    },
    onSettled: () => {
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
        element={<TaskView goal={data} mutations={mutations} />}
      />
    </Routes>
  );
};

export default QueryComp;
