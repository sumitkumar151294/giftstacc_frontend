// import React, { useEffect, useState } from "react";

// const Snackbar = () => {
//   const [showSnackbar, setShowSnackbar] = useState(true);

//   const handleClose = () => {
//     setShowSnackbar(false);
//   };

//   useEffect(() => {
//     sessionStorage.setItem("snackbar", showSnackbar);

// setShowSnac  kbar(false);
//   }, []);
//   // Add showSnackbar as a dependency to useEffect

//   return (
//     <>
//       {showSnackbar && (
//         <div className="alert alert-success solid alert-end-icon alert-dismissible fade show">
//           <span>
//             <i className="mdi mdi-check"></i>
//           </span>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="alert"
//             onClick={handleClose} // Use handleClose directly without an arrow function
//             aria-label="btn-close"
//           ></button>
//           Success! Message has been sent.
//         </div>
//       )}
//     </>
//   );
// };

// export default Snackbar;
