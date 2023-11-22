import React from 'react';

const SignIn = ({ text, onClick }) => {
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

export default SignIn;
