import { HashRouter as Router, Route, Routes } from "react-router-dom";
import RoleMaster from "../Pages/RoleMaster/RoleMaster";
import LoginPage from "../Pages/Loginform/loginForm";
import Layout from "../Layout/Layout";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/LC-admin/rolemaster" element={<Layout Component={RoleMaster} />}
        />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
