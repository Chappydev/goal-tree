import React from 'react';
import './Button.scss';

const Button = ({
  onClick,
  fillType = 'none',
  color = 'primary-light',
  type = 'button',
  children
}) => {
  let className = ['button', fillType, color].join(' ');

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
