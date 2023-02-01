import React from 'react';
import { NavLink } from 'react-router-dom';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import './Navbar.scss';
import NewGoalForm from './NewGoalForm';
import Button from './Button';

const Navbar = () => {
  const [isShown, openModal, closeModal] = useModal(false);

  return (
    <div className="navbar">
      Task App!
      <div className="navigation">
        <NavLink to="/goals">
          <button>Goal Overview</button>
        </NavLink>
      </div>
      <div className="actions">
        <Button>Logout</Button>
        <Button onClick={openModal} fillType="fill" color="accent">
          New Goal
        </Button>
      </div>
      <Modal handleClose={closeModal} isShown={isShown}>
        <NewGoalForm handleClose={closeModal} />
      </Modal>
    </div>
  );
};

export default Navbar;
