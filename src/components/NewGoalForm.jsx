import React, { useState } from 'react';
import './EditForm.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryFunctions from '../utility/queryFunctions';
import Button from './Button';
import TextInput from './TextInput';
import { atom } from 'jotai';
import { useNavigate } from 'react-router-dom';

export const goalFormIsShown = atom(false);

const NewGoalForm = ({ handleClose, textInputRef = null }) => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addGoal = useMutation({
    mutationFn: (name) => {
      return queryFunctions.createGoal(name);
    }, // No optimistic updates because we can't have links to nonexistent pages
    onSuccess: () => {
      queryClient.invalidateQueries(['goalsOverview']);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal.mutate(name);
    setName('');
    handleClose();
    navigate('/goals');
  };

  return (
    <form className="form add-goal" onSubmit={handleSubmit}>
      {/* <input
        className="input"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> */}
      <TextInput
        setValue={setName}
        name="name"
        value={name}
        label="Goal Name"
        ref={textInputRef}
      />
      <div className="form-buttons">
        <Button onClick={handleClose}>Close</Button>
        <Button color="accent" fillType="fill" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default NewGoalForm;
