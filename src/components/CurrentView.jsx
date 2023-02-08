import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import queryFunctions from '../utility/queryFunctions';
import GoalOverview from './GoalOverview';

const testGoalData = [
  {
    id: 0,
    tree: {
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
              isComplete: false,
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
              isComplete: true,
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
              isComplete: true,
              children: []
            }
          ]
        }
      ]
    }
  },
  {
    id: 1,
    tree: {
      id: 20,
      name: 'Get better at singing',
      isComplete: false,
      children: [
        {
          id: 21,
          name: 'Do drills',
          isComplete: false,
          children: []
        },
        {
          id: 22,
          name: 'Sing songs',
          isComplete: true,
          children: [
            {
              id: 23,
              name: 'Sing English songs',
              isComplete: true,
              children: []
            },
            {
              id: 24,
              name: 'Sing Japanese songs',
              isComplete: true,
              children: []
            }
          ]
        }
      ]
    }
  }
];

const testEmptyData = [];

const CurrentView = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['goalsOverview'],
    queryFn: queryFunctions.findOverview
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  if (data.length < 1) {
    return (
      <div>
        <p>You currently have no trees.</p>
        <p>
          To start, <button>Set a Goal</button>
        </p>
      </div>
    );
  }

  return (
    <div>
      {data.map((goalData) => (
        <GoalOverview key={goalData.id} goalData={goalData} />
      ))}
    </div>
  );
};

export default CurrentView;
