import React from 'react';
import { useQuery } from '@tanstack/react-query';
import queryFunctions from '../utility/queryFunctions';
import GoalOverview from './GoalOverview';
import './CurrentView.scss';
import Button from './Button';
import useModal from '../hooks/useModal';
import { goalFormIsShownAtom } from './Navbar';
import { useSetAtom } from 'jotai';

const CurrentView = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['goalsOverview'],
    queryFn: queryFunctions.findOverview
  });

  const setGoalFormIsShown = useSetAtom(goalFormIsShownAtom);

  const handleOpenGoalForm = () => setGoalFormIsShown(true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  if (data.length < 1) {
    return (
      <div className="current-view-empty">
        <p>You currently have no trees.</p>
        <p>
          To start,{' '}
          <Button onClick={handleOpenGoalForm} fillType="fill" color="accent">
            Set a Goal
          </Button>
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
