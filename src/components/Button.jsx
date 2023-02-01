import React from 'react';
import './Button.scss';

const Button = ({
  onClick,
  fillType = 'none',
  color = 'primary',
  children
}) => {
  let className = ['button', fillType, color].join(' ');

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
