import React from 'react';

const Dropdown = ({ value, onChange, error, ariaLabel, className, options }) => {
  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        className={` ${error ? "border-danger border-danger-select" : className}`}
      >
     
        <option >Select</option>
        {options?.map((option, index) => (
          console.log(option?.data),
          <option key={index} value={option.value} name={option?.data}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
