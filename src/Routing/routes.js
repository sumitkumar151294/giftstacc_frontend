import { HashRouter as Router, Route, Routes } from "react-router-dom";
import RoleMaster from "../Pages/RoleMaster/RoleMaster";
import LoginPage from "../Pages/LoginForm/loginForm"
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
