import React from 'react';

const Dropdown = ({ value, onChange, error, ariaLabel, className, options }) => {
  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        className={` ${error ? "border-danger" : className}`}
      >
        <option selected>Select an option</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
