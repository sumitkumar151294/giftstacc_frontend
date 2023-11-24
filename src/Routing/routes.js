import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Loginform/LoginPage";
import RoleMaster from "../Pages/RoleMaster/RoleMaster";
import Layout from "./../Layout/Layout"
function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/LC-admin/rolemaster" element={<Layout Component={RoleMaster} />} />
      </Routes>
    </Router>
  );
}

export default RouteConfiq;
