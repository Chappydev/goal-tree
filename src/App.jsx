import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import TaskView from './components/TaskView';
import Tree from './components/Tree';
import useDimensions from './hooks/useDimensions';

const queryClient = new QueryClient();

const testTreeData = {
  id: 1,
  name: 'Eat more',
  children: [
    {
      id: 2,
      name: 'Eat Chicken',
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
      children: [
        {
          id: 4,
          name: 'Eat while doing chores',
          children: [
            {
              id: 5,
              name: 'Eat while walking the dog',
              children: [
                {
                  id: 6,
                  name: 'test',
                  children: []
                }
              ]
            },
            {
              id: 7,
              name: 'Eat while making dinner',
              children: []
            }
          ]
        },
        {
          id: 8,
          name: 'Eat while doing backflips',
          children: [
            {
              id: 11,
              name: "Don't choke",
              children: []
            }
          ]
        },
        {
          id: 9,
          name: 'Eat while singing',
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
        {/* <Tree data={testTreeData} /> */}
        {/* <TaskView /> */}

        <Routes>
          <Route path="/tree" element={<Tree data={testTreeData} />} />
          <Route path="/task/:id" element={<TaskView tree={testTreeData} />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
