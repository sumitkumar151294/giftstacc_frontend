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
        <option >Select</option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
