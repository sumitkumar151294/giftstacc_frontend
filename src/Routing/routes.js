import { HashRouter as Router, Route, Routes } from "react-router-dom";
import RoleMaster from "../Pages/RoleMaster/RoleMaster";
import Layout from "../Layout/Layout"
import LoginPage from "../Pages/Login/LoginPage";
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/Lc-Admin/login" element={<LoginPage />} />
        <Route path="/Lc-admin/rolemaster" element={<Layout Component={RoleMaster} />} />
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
