import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import queryFunctions from '../utility/queryFunctions';
import TaskView from './TaskView';
import Tree from './Tree';

const QueryComp = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['treeData'],
    queryFn: queryFunctions.findGoal
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
      queryClient.invalidateQueries({ queryKey: ['treeData'] });
    }
  });

  const mutations = {
    toggleComplete
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  return (
    <Routes>
      <Route
        path="/tree"
        element={<Tree data={data} mutations={mutations} />}
      />
      <Route
        path="/task/:id"
        element={<TaskView tree={data} mutations={mutations} />}
      />
    </Routes>
  );
};

export default QueryComp;
