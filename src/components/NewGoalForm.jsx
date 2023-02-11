import React, { useState } from 'react';
import './EditForm.scss';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryFunctions from '../utility/queryFunctions';
import Button from './Button';
import TextInput from './TextInput';

const NewGoalForm = ({ handleClose }) => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

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
