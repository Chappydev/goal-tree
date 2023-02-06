import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';
import TextInput from './TextInput';

const LoginForm = ({ handleClose, useSignUp, setUseSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
    handleClose();
  };

  return (
    <form className="form login" onSubmit={handleSubmit}>
      <h2>{useSignUp ? 'Sign up' : 'Login'}</h2>
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
      />
      <div>
        {/* 
          TODO: change styles here to have better contrast
        */}
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            setUseSignUp(!useSignUp);
          }}
        >
          {useSignUp
            ? 'Already have an account? Login instead'
            : "Don't have an account? Sign up instead"}
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

export default LoginForm;
