import React from 'react';
import './TextInput.scss';

const TextInput = ({ setValue, value, name, label, className }) => {
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <label>
      {label}
      <input
        type="text"
        name={name}
        className={className}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default TextInput;
