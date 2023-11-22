import React from 'react';

const Submit = ({ text, onClick }) => {
  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary float-right pad-aa"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Submit;
