import React from 'react';

const Button = ({ text, onClick, icon}) => {
  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary p-btn"
        // className="btn-block"
        onClick={onClick}
      >
        {text}{" "}
        {<i className={icon}></i>}
      </button>
    </div>
  );
};

export default Button;
