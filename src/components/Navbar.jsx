import React from 'react';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      Task App!
      <div className="navigation">
        <button>Tree View</button>
        <button>Goal Overview</button>
      </div>
      <div className="actions">
        <button>New Goal</button>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Navbar;
