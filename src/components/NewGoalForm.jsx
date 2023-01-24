import React, { useState } from 'react';
import './EditForm.scss';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import queryFunctions from '../utility/queryFunctions';

const NewGoalForm = ({ handleClose }) => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

  const addGoal = useMutation({
    mutationFn: (name) => {
      queryFunctions.createGoal(name);
    },
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
      <input
        className="input"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="form-buttons">
        <button
          className="modal-button close"
          type="button"
          onClick={handleClose}
        >
          Close
        </button>
        <button className="modal-button submit" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewGoalForm;
