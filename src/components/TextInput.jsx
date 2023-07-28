import React from 'react';
import { forwardRef } from 'react';
import './TextInput.scss';

const TextInput = forwardRef(
  (
    { setValue, value, name, label, className, password = false, autocomplete },
    ref
  ) => {
    const onChange = (e) => {
      setValue(e.target.value);
    };

    return (
      <label>
        {label}
        <input
          ref={ref}
          type={password ? 'password' : 'text'}
          name={name}
          className={className}
          value={value}
          onChange={onChange}
          autoComplete={autocomplete}
        />
      </label>
    );
  }
);

export default TextInput;
