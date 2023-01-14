import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
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
        <NavLink>
          <button>New Goal</button>
        </NavLink>
        <NavLink>
          <button>Login</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
