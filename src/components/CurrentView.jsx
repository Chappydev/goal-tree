import React from 'react';
import { useQuery } from '@tanstack/react-query';
import queryFunctions from '../utility/queryFunctions';
import GoalOverview from './GoalOverview';
import './CurrentView.scss';

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
    <div className="current-view">
      {data.map((goalData) => (
        <GoalOverview key={goalData.id} goalData={goalData} />
      ))}
    </div>
  );
};

export default CurrentView;
