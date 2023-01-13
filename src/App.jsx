import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import queryFunctions from './utility/queryFunctions';
import { Route, Routes } from 'react-router-dom';
import TaskView from './components/TaskView';
import Tree from './components/Tree';
import QueryComp from './components/QueryComp';
import Navbar from './components/Navbar';

const queryClient = new QueryClient();

const testTreeData = {
  id: 1,
  name: 'Eat more',
  isComplete: false,
  children: [
    {
      id: 2,
      name: 'Eat Chicken',
      isComplete: false,
      children: [
        {
          id: 10,
          name: 'Buy chicken',
          children: []
        }
      ]
    },
    {
      id: 3,
      name: 'Eat While Doing other things',
      isComplete: false,
      children: [
        {
          id: 4,
          name: 'Eat while doing chores',
          isComplete: true,
          children: [
            {
              id: 5,
              name: 'Eat while walking the dog',
              isComplete: true,
              children: [
                {
                  id: 6,
                  name: 'test',
                  isComplete: true,
                  children: []
                }
              ]
            },
            {
              id: 7,
              name: 'Eat while making dinner',
              isComplete: true,
              children: []
            }
          ]
        },
        {
          id: 8,
          name: 'Eat while doing backflips',
          isComplete: false,
          children: [
            {
              id: 11,
              name: "Don't choke",
              isComplete: false,
              children: []
            }
          ]
        },
        {
          id: 9,
          name: 'Eat while singing',
          isComplete: false,
          children: []
        }
      ]
    }
  ]
};

const centerTree = {
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const fillWindow = {
  height: '100%',
  width: '100%'
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App" style={fillWindow}>
        <Navbar />
        <QueryComp />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
