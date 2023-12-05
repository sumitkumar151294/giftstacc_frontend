import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/Lc-Admin/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
