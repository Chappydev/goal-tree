import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/authHooks';
import { setStoredUser } from '../utility/localUserFunctions';
import Button from './Button';
import TextInput from './TextInput';

const LoginForm = ({ handleClose, setUseSignUp, textInputRef = null }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: on failed login, give an appropriate message to the user
    login.mutate(
      { username, password },
      {
        onSuccess: (user) => {
          setStoredUser(user);
          setUsername('');
          handleClose();
          navigate('/goals');
        },
        onSettled: () => {
          setPassword('');
        }
      }
    );
  };

  return (
    <form className="form login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <TextInput
        setValue={setUsername}
        name="username"
        value={username}
        label="Username"
        autocomplete="username"
        ref={textInputRef}
      />
      <TextInput
        setValue={setPassword}
        name="password"
        value={password}
        label="Password"
        password={true}
        autocomplete="current-password"
      />
      <div>
        {/* 
          TODO: change styles here to have better contrast
        */}
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            setUseSignUp(true);
          }}
        >
          Don't have an account yet? Sign up
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
