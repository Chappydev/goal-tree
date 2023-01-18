import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import queryFunctions from '../utility/queryFunctions';
import CurrentView from './CurrentView';
import D3Tree from './D3Tree';
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

  const deleteNode = useMutation({
    mutationFn: (currNode) => {
      return queryFunctions.deleteNode(currNode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treeData'] });
    }
  });

  const addNode = useMutation({
    mutationFn: (name, parentId, insertInd) => {
      return queryFunctions.insertNode(name, parentId, insertInd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treeData'] });
    }
  });

  const mutations = {
    toggleComplete,
    deleteNode,
    addNode
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  return (
    <Routes>
      <Route path="/tree" element={<D3Tree data={data} />} />
      <Route
        path="/task/:id"
        element={<TaskView tree={data} mutations={mutations} />}
      />
      <Route path="/goals" element={<CurrentView />} />
    </Routes>
  );
};

export default QueryComp;
