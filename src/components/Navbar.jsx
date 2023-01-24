import React from 'react';
import { NavLink } from 'react-router-dom';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import './Navbar.scss';
import NewGoalForm from './NewGoalForm';

const Navbar = () => {
  const [isShown, openModal, closeModal] = useModal(false);

  return (
    <div className="navbar">
      Task App!
      <div className="navigation">
        {/* 
          TODO: Make tree route based on goal id (/tree/:id)
        */}
        <NavLink to={`/tree`}>
          <button>Tree View</button>
        </NavLink>
        <NavLink to="/goals">
          <button>Goal Overview</button>
        </NavLink>
      </div>
      <div className="actions">
        <button onClick={openModal}>New Goal</button>
        <NavLink>
          <button>Login</button>
        </NavLink>
      </div>
      <Modal handleClose={closeModal} isShown={isShown}>
        <NewGoalForm handleClose={closeModal} />
      </Modal>
    </div>
  );
};

export default Navbar;
