import React from 'react';
import { useQuery } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import queryFunctions from '../utility/queryFunctions';
import TaskView from './TaskView';
import Tree from './Tree';

const QueryComp = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['treeData'],
    queryFn: queryFunctions.findGoal
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  console.log(data);
  return (
    <Routes>
      <Route path="/tree" element={<Tree data={data} />} />
      <Route path="/task/:id" element={<TaskView tree={data} />} />
    </Routes>
  );
};

export default QueryComp;
