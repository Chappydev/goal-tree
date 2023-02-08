import React from 'react';
import { useState } from 'react';
import { useLogin, useRegister } from '../hooks/authHooks';
import Button from './Button';
import TextInput from './TextInput';

const SignUpForm = ({ handleClose, setUseSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const register = useRegister();
  const login = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register.mutateAsync({ username, password });
      await login.mutateAsync({ username, password });
      setUsername('');
      setPassword('');
      handleClose();
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
