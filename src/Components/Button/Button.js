import React from 'react';
import './Button.scss';

const Button = ({ text, onClick }) => {
  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
