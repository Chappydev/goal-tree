import React from 'react';
import { NavLink } from 'react-router-dom';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import './Navbar.scss';
import NewGoalForm from './NewGoalForm';
import Button from './Button';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useLogout, useUser } from '../hooks/authHooks';

const Navbar = () => {
  const [goalFormIsShown, openGoalModal, closeGoalModal] = useModal(false);
  const [loginFormIsShown, openLoginModal, closeLoginModal] = useModal(false);
  const [useSignUp, setUseSignUp] = useState(true);
  // NOTE: this state is temporary and should later be based
  //       on the user object.
  const { isSuccess, data: user } = useUser();
  const logout = useLogout();

  return (
    <div className="navbar">
      Task App!
      <div className="navigation">
        <NavLink to="/goals">
          <button>Goal Overview</button>
        </NavLink>
      </div>
      <div className="actions">
        {isSuccess && user ? (
          <>
            <Button onClick={() => logout.mutate()}>Logout</Button>
            <Button onClick={openGoalModal} fillType="fill" color="accent">
              New Goal
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                setUseSignUp(false);
                openLoginModal();
              }}
              fillType="fill"
              color="primary"
            >
              Login
            </Button>
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
          </>
        )}
      </div>
      <Modal handleClose={closeGoalModal} isShown={goalFormIsShown}>
        <NewGoalForm handleClose={closeGoalModal} />
      </Modal>
      <Modal handleClose={closeLoginModal} isShown={loginFormIsShown}>
        {useSignUp ? (
          <SignUpForm
            handleClose={closeLoginModal}
            setUseSignUp={setUseSignUp}
          />
        ) : (
          <LoginForm
            handleClose={closeLoginModal}
            setUseSignUp={setUseSignUp}
          />
        )}
      </Modal>
    </div>
  );
};

export default Navbar;
