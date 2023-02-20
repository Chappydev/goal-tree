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

export const goalFormIsShownAtom = atom(false);
export const loginSignupFormIsShownAtom = atom(false);
export const signUpLoginAtom = atom(true);

const Navbar = () => {
  const isTaskView = useMatch('/goal/:id/task/:id');
  const [goalFormIsShown, openGoalModal, closeGoalModal] =
    useModal(goalFormIsShownAtom);
  const [loginFormIsShown, openLoginModal, closeLoginModal] = useModal(
    loginSignupFormIsShownAtom
  );
  const [useSignUp, setUseSignUp] = useAtom(signUpLoginAtom);
  const { isSuccess, data: user } = useUser();
  console.log(isSuccess, user);
  const queryClient = useQueryClient();
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
      <div className="app-name">Task App!</div>
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
