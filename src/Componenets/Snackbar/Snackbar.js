import React, { useEffect } from "react";

const Snackbar = ({ showSnackbar, setShowSnackbar }) => {
  useEffect(() => {
    if (showSnackbar) {
      const timeoutId = setTimeout(() => {
        setShowSnackbar(false);
      }, 200000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showSnackbar, setShowSnackbar]);
  return (
    <>
      {showSnackbar && (
        <div className="alert alert-success solid alert-end-icon alert-dismissible fade show">
          <span>
            <i className="mdi mdi-check"></i>
          </span>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            onClick={() => setShowSnackbar(false)}
            aria-label="btn-close"
          ></button>
          Success! Message has been sent.
        </div>
      )}
    </>
  );
};

export default Snackbar;
