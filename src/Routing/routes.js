import UserMaster from "../Pages/UserMaster/userMaster";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import RoleMaster from "../Pages/RoleMaster/RoleMaster";
import LoginPage from "../Pages/Loginform/loginForm";
import Layout from "../Layout/Layout";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/LC-admin/rolemaster" element={<Layout Component={RoleMaster} />} />
        <Route path="/LC-admin/usermaster" element={<Layout Component={UserMaster} />} />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
