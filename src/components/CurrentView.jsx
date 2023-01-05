import React from 'react';
import { NavLink } from 'react-router-dom';

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
  if (testGoalData.length < 1) {
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
      {testGoalData.map((goal) => {
        return (
          <div key={goal.id}>
            <h2>{goal.tree.name}</h2>
            <p>
              Current:{' '}
              <NavLink to={`/task/${goal.tree.id}`}>{goal.tree.name}</NavLink>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CurrentView;
