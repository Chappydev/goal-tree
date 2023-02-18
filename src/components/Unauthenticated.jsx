import { useSetAtom } from 'jotai';
import React from 'react';
import Button from './Button';
import { loginSignupFormIsShownAtom, signUpLoginAtom } from './Navbar';
import './Unauthenticated.scss';

const Unauthenticated = () => {
  const setUseSignUp = useSetAtom(signUpLoginAtom);
  const setSignUpFormIsShown = useSetAtom(loginSignupFormIsShownAtom);

  const openLoginModal = () => setSignUpFormIsShown(true);

  return (
    <div className="unauthenticated-container">
      <p className="unauthenticated-content">
        Unauthenticated:{' '}
        <Button
          onClick={() => {
            setUseSignUp(false);
            openLoginModal();
          }}
          fillType="fill"
          color="primary"
        >
          Login
        </Button>{' '}
        or{' '}
        <Button
          onClick={() => {
            setUseSignUp(true);
            openLoginModal();
          }}
          fillType="fill"
          color="accent"
        >
          Sign Up
        </Button>
      </p>
    </div>
  );
};

export default Unauthenticated;
