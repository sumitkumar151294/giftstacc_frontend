import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Loginform/LoginPage";
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
