import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CurrentView from './CurrentView';
import QueryComp from './QueryComp';

const Paths = () => {
  return (
    <Routes>
      <Route path="/goal/:goalId/*" element={<QueryComp />} />
      <Route path={'/goals'} element={<CurrentView />} />
      <Route path={'/'} element={<CurrentView />} />
    </Routes>
  );
};

export default Paths;
