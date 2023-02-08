import React from 'react';
import './TextInput.scss';

const TextInput = ({
  setValue,
  value,
  name,
  label,
  className,
  password = false,
  autocomplete
}) => {
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <label>
      {label}
      <input
        type={password ? 'password' : 'text'}
        name={name}
        className={className}
        value={value}
        onChange={onChange}
        autoComplete={autocomplete}
      />
    </label>
  );
};

export default TextInput;
