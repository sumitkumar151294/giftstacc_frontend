import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Loginform/loginForm";
import RoleMaster from "../Pages/Loginform/RoleMaster/RoleMaster";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/rolemaster" element={<RoleMaster />} />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
