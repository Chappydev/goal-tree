import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin, useRegister } from '../hooks/authHooks';
import useDebounceValue from '../hooks/useDebounceValue';
import queryFunctions from '../utility/queryFunctions';
import Button from './Button';
import Notification from './Notification';
import TextInput from './TextInput';

const SignUpForm = ({ handleClose, setUseSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const debouncedUsername = useDebounceValue(username);
  const [availableNotif, setAvailableNotif] = useState('');
  const [showAvailableNotif, setShowAvailableNotif] = useState(false);
  const register = useRegister();
  const login = useLogin();
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: available
  } = useQuery({
    queryKey: ['usernameTaken', debouncedUsername],
    queryFn: ({ signal }) => {
      return queryFunctions.checkUsername(debouncedUsername, signal);
    },
    enabled: !!debouncedUsername
  });
  const isTransitioning = username !== debouncedUsername;

  useEffect(() => {
    if (username) {
      setShowAvailableNotif(true);
    } else {
      setShowAvailableNotif(false);
    }
    if (isTransitioning || isLoading) {
      setAvailableNotif('Loading...');
    } else {
      setAvailableNotif(available?.exists ? 'Unavailable' : 'Available');
    }
  }, [available, isTransitioning, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register.mutateAsync({ username, password });
      await login.mutateAsync({ username, password });
      setUsername('');
      setPassword('');
      handleClose();
      navigate('/goals');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="form login" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <TextInput
        setValue={setUsername}
        name="username"
        value={username}
        label="Username"
      />
      {showAvailableNotif && <Notification notification={availableNotif} />}
      <TextInput
        setValue={setPassword}
        name="password"
        value={password}
        label="Password"
        password={true}
        autocomplete="new-password"
      />
      <div>
        {/* 
          TODO: change styles here to have better contrast
        */}
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            setUseSignUp(false);
          }}
        >
          Already have an account? Login instead
        </a>
      </div>
      <div className="form-buttons">
        <Button onClick={handleClose}>Close</Button>
        <Button color="accent" fillType="fill" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
