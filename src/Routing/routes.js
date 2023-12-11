import { HashRouter as Router, Route, Routes } from "react-router-dom";
import RoleMaster from "../Pages/RoleMaster/RoleMaster";
import Layout from "../Layout/Layout"
import LoginPage from "../Pages/Login/LoginPage";
import UserMaster from '../Pages/UserMaster/UserMaster';
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/Lc-Admin/login" element={<LoginPage />} />
        <Route path="/Lc-admin/rolemaster" element={<Layout Component={RoleMaster} />} />
        <Route path="/Lc-admin/usermaster" element={<Layout Component={UserMaster} />} />
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
