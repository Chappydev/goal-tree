import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import './Navbar.scss';
import NewGoalForm from './NewGoalForm';
import Button from './Button';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useLogout, useUser } from '../hooks/authHooks';
import { atom, useAtom } from 'jotai';
import { useMediaQuery } from 'react-responsive';
import { CheckCircle, List, LogOut, Plus } from 'react-feather';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

export const goalFormIsShownAtom = atom(false);
export const loginSignupFormIsShownAtom = atom(false);
export const signUpLoginAtom = atom(true);

const Navbar = () => {
  const isTaskView = useMatch('/goal/:id/task/:id');
  const addGoalInput = useRef(null);
  const loginInput = useRef(null);
  const [goalFormIsShown, openGoalModal, closeGoalModal] = useModal(
    goalFormIsShownAtom,
    null,
    () => {
      setTimeout(() => {
        if (addGoalInput?.current) {
          addGoalInput.current.focus();
        }
      }, 100);
    }
  );
  const [loginFormIsShown, openLoginModal, closeLoginModal] = useModal(
    loginSignupFormIsShownAtom,
    null,
    () => {
      setTimeout(() => {
        if (loginInput?.current) {
          loginInput.current.focus();
        }
      }, 100);
    }
  );
  const [useSignUp, setUseSignUp] = useAtom(signUpLoginAtom);
  const { isSuccess, data: user } = useUser();
  // const queryClient = useQueryClient();
  const logout = useLogout();
  // const logout = useLogout({
  //   onSuccess: () => queryClient.invalidateQueries(['authenticated-user'])
  // });

  const isSmallScreen = useMediaQuery({ query: '(max-width: 550px)' });
  const isXSmallScreen = useMediaQuery({ query: '(max-width: 400px)' });

  // TODO: Remove navigation and maybe also login/logout
  //       on smaller screen sizes and move to bottom menu bar
  return (
    <div className="navbar">
      <div className="app-name">GoalTree!</div>
      <div className="navigation">
        <NavLink to="/goals">
          <Button>
            {isXSmallScreen ? <List className="nav-button-svg" /> : 'My Goals'}
          </Button>
        </NavLink>
        {isTaskView && (
          <NavLink to="../.." relative="path">
            <Button>
              {isXSmallScreen ? (
                <CheckCircle className="nav-button-svg" />
              ) : (
                'Tree View'
              )}
            </Button>
          </NavLink>
        )}
      </div>
      <div className="actions">
        {isSuccess && user ? (
          <>
            <Button onClick={() => logout.mutate()}>
              {isSmallScreen ? <LogOut className="nav-button-svg" /> : 'Logout'}
            </Button>
            <Button onClick={openGoalModal} fillType="fill" color="accent">
              {isSmallScreen ? <Plus className="nav-button-svg" /> : 'New Goal'}
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
        <NewGoalForm handleClose={closeGoalModal} textInputRef={addGoalInput} />
      </Modal>
      <Modal handleClose={closeLoginModal} isShown={loginFormIsShown}>
        {useSignUp ? (
          <SignUpForm
            handleClose={closeLoginModal}
            setUseSignUp={setUseSignUp}
            textInputRef={loginInput}
          />
        ) : (
          <LoginForm
            handleClose={closeLoginModal}
            setUseSignUp={setUseSignUp}
            textInputRef={loginInput}
          />
        )}
      </Modal>
    </div>
  );
};

export default Navbar;
