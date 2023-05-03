import { useSetAtom } from 'jotai';
import React from 'react';
import Button from './Button';
import { loginSignupFormIsShownAtom, signUpLoginAtom } from './Navbar';
import './Unauthenticated.scss';
import { ArrowRight } from 'react-feather';

const Unauthenticated = () => {
  const setUseSignUp = useSetAtom(signUpLoginAtom);
  const setSignUpFormIsShown = useSetAtom(loginSignupFormIsShownAtom);

  const openLoginModal = () => setSignUpFormIsShown(true);

  return (
    <div className="unauthenticated-container">
      <h1>Welcome to GoalTree!</h1>
      <h2>A more intuitive way to manage goals, tasks, and much more.</h2>
      <p className='unauthenticated-description'>One major reason for procrastination is simply that our tasks are often too overwhelming to even get started on them. That's why GoalTree! uses a tree structure to organize your tasks more intuitively. Break down your tasks into smaller and smaller pieces, and finally gain the confidence to get started.</p>
      <h2>Get Started!</h2>
      <div className='unauthenticated-getstarted'>
        <div className='getstarted-option'>
          <h4>Demo</h4>
          <p>Try out the app without an account.</p>
          <ArrowRight />
        </div>
        <div className="getstarted-option unauthenticated-content">
          <h4>Create an Account</h4>
          <p>Create an account to start saving your work for next time.</p>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Unauthenticated;
