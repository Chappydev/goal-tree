import React from 'react';
import './NumberInput.scss';

const NumberInput = ({ className, min = 1, max, value, label, setValue }) => {
  const handleChange = (e) => {
    if (!max || !min) {
      return;
    }

    if (e.target.value < min) {
      setValue(min);
    } else if (e.target.value > max) {
      setValue(max);
    } else {
      setValue(e.target.value);
    }
  };

  return (
    <label>
      {label}
      <input
        type="number"
        className={className}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

export default NumberInput;
